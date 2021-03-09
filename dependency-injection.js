'use strict'
const { EOL } = require('os')
const pify = require('pify')
const { getOptions } = require('loader-utils')

function fn (src, map, meta) {
  // @ts-ignore
  const Loader = this
  const callback = Loader.async()
  const options = getOptions(Loader)
  // tslint:disable-next-line: no-floating-promises
  loader
    .call(Loader, options, src, map, meta)
    .then(result => {
      callback(null, result.src, result.map, result.meta)
    })
    .catch(err => {
      console.error(err)
      Loader.emitError(err)
    })
}

exports.default = fn
module.exports = fn

async function loader (options, src, map, meta) {
  // @ts-ignore
  const Loader = this
  const resolve = pify(Loader.resolve)

  for (let dep of options.dependencies) {
    const matchs = [...src.matchAll(dep.whenImport)]
    for (let match of matchs) {
      const impPath = match[0]
      const depPath = impPath.replace(dep.whenImport, dep.dependency)
      const depPathAbsolute = await resolve(Loader.rootContext, depPath)
      if (depPathAbsolute !== Loader.resourcePath) {
        src = src.replace(impPath, `${impPath}'${EOL}import '${depPath}`)
      }
    }
  }

  return { src, map, meta }
}
