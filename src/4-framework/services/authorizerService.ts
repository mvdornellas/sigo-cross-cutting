import { IAuthorizerService, IAuthorizerServiceToken } from '#application/services/iAuthorizerService'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'

@Service({ id: IAuthorizerServiceToken })
export class AuthorizerService implements IAuthorizerService {
  encrypt (data: any, { secret }: {
    secret: string
  }): string {
    return jwt.sign(data, secret, {
      expiresIn: '1d'
    })
  }

  async decrypt (token: string, { secret }: {secret: string}): Promise<any> {
    return new Promise((resolve, reject) => {
      return jwt.verify(token, secret, (error, data) => {
        if (error) {
          return reject(error)
        }
        return resolve(data)
      })
    })
  }

}
