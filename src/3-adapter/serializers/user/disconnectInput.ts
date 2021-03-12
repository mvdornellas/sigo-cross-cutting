export class UserDisconnectInput {
  connectionId!: string
  constructor (obj: Partial<UserDisconnectInput>) {
    Object.assign(this, obj)
  }
}
