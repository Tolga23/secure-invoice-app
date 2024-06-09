import {DataState} from "../enum/datastate.enum";

export interface ResetPassword {
  dataState: DataState
  resetPasswordSuccess?: boolean
  error?: string
  message?: string
}
