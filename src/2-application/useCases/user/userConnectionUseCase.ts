'use strict'
import { IUserConnectionRepository, IUserConnectionRepositoryToken } from '#application/repositories/iUserConnectionRepository'
import AWS from 'aws-sdk'
require('aws-sdk/clients/apigatewaymanagementapi')
import { Service, Inject } from 'typedi'

@Service()
export class UserConnectionUseCase {
  @Inject(IUserConnectionRepositoryToken)
  private readonly userConnectionRepository!: IUserConnectionRepository

  async connect (connectionId: string) {
    return this.userConnectionRepository.create({
      connectionId,
      createdAt: new Date()
    })
  }

  async disconnect (connectionId: string) {
    return this.userConnectionRepository.delete(connectionId)
  }

  async notification (message: string) {
    const endpoint = process.env.WS_CONNECTION_URL
    if (!endpoint) {
      throw new Error('[!] INVALID ENDPOINT WEBSOCKET!')
    }
    const userConnections = await this.userConnectionRepository.getAll()
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint
    })

    /**
     * Broadcast
     */
    for (const { connectionId } of userConnections) {
      await apigwManagementApi
        .postToConnection({ ConnectionId: connectionId, Data: message }).promise()
        .then(_ => {
          console.info('[I] MESSAGE SENDED')
          return true
        })
        .catch(err => {
          console.error(`[E] ERROR SEND MESSAGE TO CONNECTION ${connectionId}`, err)
          return false
        })
    }

  }
}
