export class TokenAuthorizerInput {
  token!: string
  methodArn!: string
  type!: string

  constructor (obj: Partial<TokenAuthorizerInput>) {
    Object.assign(this, obj)
  }

}
