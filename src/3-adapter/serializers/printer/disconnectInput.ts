export class PrinterDisconnectInput {
  connectionId!: string
  constructor (obj: Partial<PrinterDisconnectInput>) {
    Object.assign(this, obj)
  }
}
