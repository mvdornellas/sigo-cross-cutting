import { Service } from 'typedi/decorators/Service'
import { Inject } from 'typedi'
import { UserConnectionUseCase as UserConnectionUseCase } from '#application/useCases/user/userConnectionUseCase'
import { UserDisconnectInput as UserDisconnectInput } from '#adapter/serializers/user/disconnectInput'
import { UserConnectInput as UserLoggedInput } from '#adapter/serializers/user/connectInput'

@Service()
export class UserController {
  @Inject()
  private readonly userConnectionUseCase!: UserConnectionUseCase

  async connect (input: UserLoggedInput): Promise<boolean> {
    return this.userConnectionUseCase.connect(input.connectionId).then(_a => true).catch(_a => false)
  }

  async disconnect (input: UserDisconnectInput): Promise<boolean> {
    return this.userConnectionUseCase.disconnect(input.connectionId)
  }

  async notification (message: string): Promise<void> {
    await this.userConnectionUseCase.notification(message)
  }

}
