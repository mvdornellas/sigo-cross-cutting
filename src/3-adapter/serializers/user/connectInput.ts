export class UserConnectInput {
  connectionId!: string
  constructor (obj: Partial<UserConnectInput>) {
    Object.assign(this, obj)
  }
}
