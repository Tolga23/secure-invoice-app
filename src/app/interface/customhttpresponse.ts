export interface CustomHttpResponse<T> {
  responseDate: Date
  status: string
  message: string
  developerMessage: string
  data?: T
}
