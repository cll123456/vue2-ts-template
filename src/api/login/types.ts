/**
 * 用户登录数据接口
 */
export interface IRUserData {
  // 账号
  username: string,
  // 密码
  password: string
}
/**
 * 获取菜单的参数
 */
export interface IRMenuParam {
  // page limit 历史遗留原因，分页参数，
  page?: string,
  limit?: string,
  // 用户电话号码
  phone:string,
  // 用户所属部门
  comcode: string
}