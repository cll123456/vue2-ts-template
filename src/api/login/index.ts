import request from "@/utils/request";
import { RequestDataHelper } from "../helper";
import { IRMenuParam, IRUserData } from "./types";


/**
 * 登录接口
 * @param userData 
 * @returns 
 */
export function ApiLogin(userData: IRUserData) {
  return request({
    method: 'POST',
    url: '/sys/login/verifylogin',
    data: RequestDataHelper.formatDataToFormData(userData)
  })
}

/**
 * 获取菜单
 * @param params 
 * @returns 
 */
export function APIGetMenu(params: IRMenuParam) {
  params = { ...params, page: '1', limit: '999' }
  return request({
    method: 'GET',
    url: '/wxPurchase/ProcessionList',
    params
  })
}

