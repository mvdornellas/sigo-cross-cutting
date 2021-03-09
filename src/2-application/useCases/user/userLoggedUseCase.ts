'use strict'
import { IUserLoggedRepository, IUserLoggedRepositoryToken } from '#application/repositories/iUserLoggedRepository'
import AWS from 'aws-sdk'
require('aws-sdk/clients/apigatewaymanagementapi')
import { Service, Inject } from 'typedi'

@Service()
export class UserLoggedUseCase {
  @Inject(IUserLoggedRepositoryToken)
  private readonly printerConnectionRepository!: IUserLoggedRepository

  async connect (connectionId: string) {
    return this.printerConnectionRepository.create({
      connectionId,
      createdAt: new Date()
    })
  }

  async disconnect (connectionId: string) {
    return this.printerConnectionRepository.delete(connectionId)
  }

  async sendMessage ({ operation,message, identifier }: {
    operation: 'disconnected' | 'print'
    message: string,
    identifier?: string
  }) {

    const endpoint = process.env.PRINTER_WS_URL
    if (!endpoint) {
      throw new Error('[!] INVALID ENDPOINT WEBSOCKET!')
    }
    const printerConnections = await this.printerConnectionRepository.getAll()
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint
    })

    const data = JSON.stringify({
      operation,
      identifier,
      message
    })

    /**
     * Broadcast
     */
    for (const printerConnection of printerConnections) {
      await apigwManagementApi
        .postToConnection({ ConnectionId: printerConnection.connectionId, Data: data }).promise()
        .then(_ => true)
        .catch(err => {
          console.error(`error post to connection`, err)
          return false
        })
    }

    return true
  }
}
