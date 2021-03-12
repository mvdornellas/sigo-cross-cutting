import { IUserConnectionRepository, IUserConnectionRepositoryToken } from '#application/repositories/iUserConnectionRepository'
import { UserConnection } from '#enterprise/entities/userConnection'
import { Service } from 'typedi'
import { UserConnectionModel } from '#framework/models/userConnectionModel'

const USER_CONNECTION_PK = 'USER'
const USER_CONNECTION_SK = 'CONNECTION'

@Service({ id: IUserConnectionRepositoryToken })
export class UserConnectionRepository implements IUserConnectionRepository {
  async getAll (): Promise<UserConnection[]> {
    return UserConnectionModel.query('pk').eq(USER_CONNECTION_PK).where('sk').beginsWith(USER_CONNECTION_SK).exec()
  }
  async create (cnn: UserConnection): Promise<UserConnection> {
    return UserConnectionModel.create({
      pk: USER_CONNECTION_PK,
      sk: `${USER_CONNECTION_SK}#${cnn.connectionId}`,
      connectionId: cnn.connectionId,
      createdAt: new Date()
    })
  }
  async delete (connectionId: string): Promise<boolean> {
    return UserConnectionModel.delete({
      pk: USER_CONNECTION_PK,
      sk: `${USER_CONNECTION_SK}#${connectionId}`
    }).then(_u => true)
    .catch(_u => false)
  }

  async get (connectionId: string): Promise<UserConnection> {
    return UserConnectionModel.queryOne('pk').eq(USER_CONNECTION_PK).where('sk').eq(`${USER_CONNECTION_SK}#${connectionId}`).exec()
  }
}
