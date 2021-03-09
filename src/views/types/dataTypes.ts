/**
 * 用户接口数据
 */
export interface IUserData {
  // 地址
  comaddress: string,
  // 部门编码
  comcode: string,
  // 部门名称
  comname: string,
  /**
   * 部门人数
   */
  departsum: string,
  // 是否是市公司 1：市公司 0:不是市公司
  departtype: EDepartType
  // 申请人人员种类
  hrType: EHrType
  // 手机号码
  mobile: string,
  name: "采购员"
  // 供应商id
  supplierId: string,
  // 供应商名称
  supplierName: string,
  // 供应商电话号码
  supplierPhone: string,
  // 用户id
  userId: string,
  // 用户名称
  username: string,
}
/**
 * 部门类型
 */
export enum EDepartType {
  isCityCompany = '1',
  notIsCityCompany = '0'
}
/**
 * 
 * 申请人人员种类
 * 1本部员工
 *  2本部部门负责人 
 * 3渠道员工 
 * 4销售团队经理 
 * 5区县级机构员工 
 * 6区县级机构部门经理 
 * 7区县级机构经理室 
 * 8区县级机构负责人
 */
export enum EHrType {
  localStaff = '1',
  localLeader = '2',
  channelStaff = '3',
  salesLeader = '4',
  countyStaff = '5',
  countyDepartLeader = '6',
  countyDepartHouse = '7',
  countyLeader = '8'
}