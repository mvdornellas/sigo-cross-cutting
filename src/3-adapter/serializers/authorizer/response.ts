export class AuthorizerResponse {
  principalId!: string
  policyDocument!: PolicyDocument

  constructor (obj: Partial<AuthorizerResponse>) {
    Object.assign(this, obj)
  }
}

export class PolicyDocument {
  Version!: string
  Statement!: Statement[]

  constructor (obj: Partial<PolicyDocument>) {
    Object.assign(this, obj)
  }
}

export class Statement {
  Action!: string
  Effect!: string
  Resource!: string

  constructor (obj: Partial<Statement>) {
    Object.assign(this, obj)
  }
}
