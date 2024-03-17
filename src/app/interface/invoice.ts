export interface Invoice {
  id: number
  invoiceNumber: string
  services: string
  status: string
  total: number
  createdDate: Date
}
