import 'reflect-metadata'
import { UserController } from '#adapter/controllers/userController'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import { UserConnectInput } from '#adapter/serializers/user/connectInput'
import builder from '#framework/common/builder'

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const userLoggedController = Container.get(UserController)
    const input = new UserConnectInput({
      connectionId: event.requestContext.connectionId
    })
    const userLogged = await userLoggedController.connect(input)
    return builder.response({
      success: userLogged,
      message: `User connected`
    })
  } catch (error) {
    return builder.response({
      success: false,
      message: `User not connected`
    })
  }
}
