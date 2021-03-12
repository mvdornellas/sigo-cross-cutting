import 'reflect-metadata'
import { UserController } from '#adapter/controllers/userController'
import { Handler, SNSEvent } from 'aws-lambda'
import Container from 'typedi'

export const handler: Handler = async (event: SNSEvent) => {
  const notification = event.Records[0]
  console.info('[I] NOTIFICATION SNS DATA', notification)
  const { Message: message } = notification.Sns
  console.info('[I] NOTIFICATION SNS BODY', message)
  const userController = Container.get(UserController)
  await userController.notification(message)
}
