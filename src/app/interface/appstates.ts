import {DataState} from "../enum/datastate.enum";

export interface LoginState {
  dataState: DataState
  loginSuccess?: boolean
  error?: string
  message?: string
  isUsingAuth?: boolean
  phone?: string
}


