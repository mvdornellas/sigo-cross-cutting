import { UserConnection } from '#enterprise/entities/userConnection'
import { Token } from 'typedi/Token'

export interface IUserConnectionRepository {
  create (cnn: UserConnection): Promise<UserConnection>
  delete (connectionId: string): Promise<boolean>
  get (connectionId: string): Promise<UserConnection>
  getAll (): Promise<UserConnection[]>
}

export const IUserConnectionRepositoryToken = new Token<IUserConnectionRepository>()
