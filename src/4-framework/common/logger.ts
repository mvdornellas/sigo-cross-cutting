import { Service } from 'typedi'

@Service()
export class Logger {
  error ({ file, method, message, stackTrace }: { file: string; method: string; message: string; stackTrace: any; }) {
    console.error(`File: ${file} | Method: ${method} | Message: ${message} | Stack Trace: ${stackTrace.stack}`)
  }

  info ({ file, method, message }: { file: string; method: string; message: string; }) {
    console.log(`File: ${file} | Method: ${method} | Message: ${message}`)
  }
}
