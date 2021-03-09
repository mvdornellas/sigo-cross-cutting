export class PrinterConnectInput {
  connectionId!: string
  constructor (obj: Partial<PrinterConnectInput>) {
    Object.assign(this, obj)
  }
}
