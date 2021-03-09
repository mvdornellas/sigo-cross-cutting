import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import { UserLoggedController } from '#adapter/controllers/userLoggedController'
import { PrinterDisconnectInput } from '#adapter/serializers/printer/disconnectInput'
import responseBuilder from '#framework/common/responseBuilder'

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const printerController = Container.get(UserLoggedController)
    const input = new PrinterDisconnectInput({
      connectionId: event.requestContext.connectionId
    })
    const printerDisconnected = await printerController.disconnect(input)
    return responseBuilder.build({
      success: printerDisconnected,
      message: `Printer disconnected`
    })
  } catch (error) {
    return responseBuilder.build({
      success: false,
      message: `Printer not disconnected`
    })
  }
}
