import { Service } from 'typedi/decorators/Service'
import { Inject } from 'typedi'
import { UserLoggedUseCase as UserLoggedUseCase } from '#application/useCases/user/userLoggedUseCase'
import { PrinterDisconnectInput as UserLoggedDisconnectInput } from '#adapter/serializers/printer/disconnectInput'
import { PrinterConnectInput as UserLoggedInput } from '#adapter/serializers/printer/connectInput'

@Service()
export class UserLoggedController {
  @Inject()
  private readonly userLoggedUseCase!: UserLoggedUseCase

  async connect (input: UserLoggedInput): Promise<boolean> {
    return this.userLoggedUseCase.connect(input.connectionId).then(_a => true).catch(_a => false)
  }

  async disconnect (input: UserLoggedDisconnectInput): Promise<boolean> {
    return this.userLoggedUseCase.disconnect(input.connectionId)
  }

}
