import {Invoice} from "./invoice";

export interface Customer {
  id: number
  name: string
  email: string
  address: string
  type: string
  phone: string
  status: string
  imageUrl: string
  createdDate: Date
  invoices?: Invoice[]
}
