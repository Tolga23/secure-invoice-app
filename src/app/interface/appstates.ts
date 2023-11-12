import {DataState} from "../enum/datastate.enum";

export interface LoginState {
  dataState: DataState
  loginSuccess?: boolean
  error?: string
  message?: string
  usingAuth?: boolean
  phone?: string
}


