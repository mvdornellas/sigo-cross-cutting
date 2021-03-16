import 'reflect-metadata'
import { APIGatewayEvent } from 'aws-lambda'
import { AuthorizerController } from '#adapter/controllers/authorizerController'
import { TokenAuthorizerInput } from '#adapter/serializers/authorizer/tokenInput'
import { Container } from 'typedi/Container'

export const handler = async (event: APIGatewayEvent, _context: any, callback: any) => {
  let token = event.queryStringParameters && event.queryStringParameters.token ? event.queryStringParameters.token : undefined
  const input: TokenAuthorizerInput = new TokenAuthorizerInput({
    ...event,
    token: token
  })
  console.log('[I] TOKEN AUTHORIZER INPUT', input)
  const operator = Container.get(AuthorizerController)
  const output = await operator.token(input)
  console.log('[I] TOKEN AUTHORIZER OUTPUT', output)
  return callback(null, output.authorizer)
}
