export class OutputBase<T> {
  success?: true | false = true
  data!: T | any
  errors?: any

  constructor (output?: Partial<OutputBase<T>>) {
    Object.assign(this, output)
  }
}
