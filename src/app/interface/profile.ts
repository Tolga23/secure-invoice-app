import {User} from "./user";

export interface Profile {
  user?: User
  accessToken: string
  refreshToken: string
}
