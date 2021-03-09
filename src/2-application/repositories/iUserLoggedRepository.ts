import { UserLogged } from '#enterprise/entities/userLogged'
import { Token } from 'typedi/Token'

export interface IUserLoggedRepository {
  create (cnn: UserLogged): Promise<UserLogged>
  delete (connectionId: string): Promise<boolean>
  get (connectionId: string): Promise<UserLogged>
  getAll (): Promise<UserLogged[]>
}

export const IUserLoggedRepositoryToken = new Token<IUserLoggedRepository>()
