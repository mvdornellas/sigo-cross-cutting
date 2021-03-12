import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import { UserController } from '#adapter/controllers/userController'
import { UserDisconnectInput } from '#adapter/serializers/user/disconnectInput'
import builder from '#framework/common/builder'

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const userController = Container.get(UserController)
    const input = new UserDisconnectInput({
      connectionId: event.requestContext.connectionId
    })
    const printerDisconnected = await userController.disconnect(input)
    return builder.response({
      success: printerDisconnected,
      message: `Printer disconnected`
    })
  } catch (error) {
    return builder.response({
      success: false,
      message: `Printer not disconnected`
    })
  }
}
