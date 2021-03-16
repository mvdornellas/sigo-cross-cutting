import { IAuthorizerService, IAuthorizerServiceToken } from '#application/services/iAuthorizerService'
import { Service } from 'typedi/decorators/Service'
import { TokenAuthorizerOutput } from '#adapter/serializers/authorizer/tokenOutput'
import { AuthorizerResponse, PolicyDocument, Statement } from '#adapter/serializers/authorizer/response'
import { TokenAuthorizerInput } from '#adapter/serializers/authorizer/tokenInput'
import { Inject } from 'typedi'

@Service()
export class AuthorizerController {

  @Inject(IAuthorizerServiceToken) private readonly authorizerService!: IAuthorizerService

  async token ({ token, methodArn }: TokenAuthorizerInput): Promise<TokenAuthorizerOutput> {
    try {
      await this.authorizerService.decrypt(token, {
        secret: process.env.TOKEN_SECRET_KEY!
      })
      return {
        authorizer: this.policy(token, methodArn, 'Allow')
      }
    } catch (error) {
      return {
        authorizer: this.policy(token, methodArn, 'Deny')
      }
    }
  }

  private policy (principalId: string, methodArn: string , effect: any) {
    let policyDocument: PolicyDocument
    let statement: Statement
    const response: AuthorizerResponse = new AuthorizerResponse({
      principalId: principalId
    })

    if (effect) {
      statement = new Statement({
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn
      })

      policyDocument = new PolicyDocument({
        Version: '2012-10-17',
        Statement: [statement]
      })
      response.policyDocument = policyDocument
    }

    return response
  }

}
