import { IUserData } from "@/views/types/dataTypes";
import { AxiosResponse } from "axios";

/**
 * 登录数据的接口
 */
export interface loginForm {
  username: string,
  password: string
}

/**
 * 登录返回的结果
 */
export interface ILoginRes extends AxiosResponse {
  token: string,
  data: IUserData
}

