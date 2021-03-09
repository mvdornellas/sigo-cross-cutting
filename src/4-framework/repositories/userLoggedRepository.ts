import { IUserLoggedRepository, IUserLoggedRepositoryToken } from '#application/repositories/iUserLoggedRepository'
import { UserLogged } from '#enterprise/entities/userLogged'
import { Service } from 'typedi'
import { UserLoggedModel } from '#framework/models/userLoggedModel'

@Service({ id: IUserLoggedRepositoryToken })
export class PrinterConnectionRepository implements IUserLoggedRepository {
  async getAll (): Promise<UserLogged[]> {
    return UserLoggedModel.scan().all().exec()
  }
  async create (cnn: UserLogged): Promise<UserLogged> {
    return UserLoggedModel.create(cnn)
  }
  async delete (connectionId: string): Promise<boolean> {
    return UserLoggedModel.delete({
      connectionId
    }).then(_u => true)
    .catch(_u => false)
  }
  async get (connectionId: string): Promise<UserLogged> {
    return UserLoggedModel.queryOne('connectionId').eq(connectionId).exec()
  }
}
