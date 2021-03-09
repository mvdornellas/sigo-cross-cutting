import 'reflect-metadata'
import { UserLoggedController } from '#adapter/controllers/userLoggedController'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import Container from 'typedi'
import { PrinterConnectInput } from '#adapter/serializers/printer/connectInput'
import responseBuilder from '#framework/common/responseBuilder'

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const printerController = Container.get(UserLoggedController)
    const input = new PrinterConnectInput({
      connectionId: event.requestContext.connectionId
    })
    const printerConnected = await printerController.connect(input)
    return responseBuilder.build({
      success: printerConnected,
      message: `Printer connected`
    })
  } catch (error) {
    return responseBuilder.build({
      success: false,
      message: `Printer not connected`
    })
  }
}
