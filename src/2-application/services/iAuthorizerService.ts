import { Token } from 'typedi/Token'

export interface IAuthorizerService {
  encrypt (data: {}, config: { secret: string }): string
  decrypt (token: string, config: { secret: string }): Promise<any>
}

export const IAuthorizerServiceToken = new Token<IAuthorizerService>()
