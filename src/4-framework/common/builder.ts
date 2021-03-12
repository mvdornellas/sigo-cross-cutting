import { OutputBase } from '#adapter/outputBase'
type BaseResponse = {
  statusCode: number;
  body: string;
}

class Builder {
  response (output: OutputBase<any> | any): BaseResponse {
    const { success } = output
    console.info('[I] BODY RESPONSE', output)
    return {
      statusCode: success ? 200 : 500,
      headers: {
        'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials' : true, // Required for cookies, authorization headers with HTTPS
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(output)
    } as BaseResponse

  }
}

export default new Builder()
