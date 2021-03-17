import 'reflect-metadata'
import { AuthorizerController } from '#adapter/controllers/authorizerController'
import { TokenAuthorizerInput } from '#adapter/serializers/authorizer/tokenInput'
import { Container } from 'typedi/Container'

export const handler = async (event: any, _context: any, callback: any) => {
  const token = event.authorizationToken
  console.log(`[I] TOKEN`, token)
  const input: TokenAuthorizerInput = new TokenAuthorizerInput({
    ...event,
    token
  })
  console.log('[I] TOKEN AUTHORIZER INPUT', input)
  const operator = Container.get(AuthorizerController)
  const output = await operator.token(input)
  console.log('[I] TOKEN AUTHORIZER OUTPUT', JSON.stringify(output))
  if (output.authorizer.policyDocument.Statement[0].Effect === 'Deny') {
    return callback('Unauthorized')
  }
  return callback(null, output.authorizer)
}
