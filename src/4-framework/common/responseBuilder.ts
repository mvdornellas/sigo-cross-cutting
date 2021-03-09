type BaseResponse = {
  statusCode: number;
  body: string;
}

class ResponseBuilder {
  build (response: any, statusCode?: number): BaseResponse {
    console.info('RESPONSE: ', response)
    return {
      statusCode: statusCode || 200,
      body: JSON.stringify(response)
    } as BaseResponse
  }
}

export default new ResponseBuilder()
