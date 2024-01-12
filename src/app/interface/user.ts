export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  address?: string
  phone?: string
  title?: string
  bio?: string
  imageUrl?: string
  enable: boolean
  notLocked: boolean
  usingAuth: boolean
  roleName: string
  permissions: string

}
