import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { getUserData, setToken, setUserData } from '@/utils/cookies';
import { IUserData } from '@/views/types/dataTypes';
import { APIGetMenu } from '@/api/login';
import { RouteConfig } from 'vue-router';

export interface IUserState {
  // 用户数据
  useData: {},
  // 令牌
  token: string,
  /**
   * 路由列表
   */
  routeList: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  // 路由列表
  public routeList!: RouteConfig[];
  // 用户数据
  public useData!: IUserData;
  // token
  public token = ''

  /**
   * 存入用户数据
   * @param userData 
   */
  @Mutation
  private SET_USER_DATA(userData: any) {
    // 存入数据
    this.useData = userData;
    // 存入数据进入cookie
    setUserData(userData)
  }
  /**
   * 存入token
   * @param token 
   */
  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
    setToken(token);
  }

  @Mutation
  private SET_MENU(routeList: RouteConfig[]) {
    this.routeList = routeList
  }
  /**
   * 对外暴露设置用户数据
   * @param userData 
   */
  @Action
  public setUserData(userData: IUserData) {
    this.SET_USER_DATA(userData)
  }
  /**
   * 对外暴露存入token
   * @param token 
   */
  @Action
  public setToken(token: string) {
    this.SET_TOKEN(token);
  }
  /**
   * 获取用户的token
   * @returns 
   */
  @Action
  public getToken() {
    return this.token;
  }

  /**
   * 获取用户菜单
   * @returns 
   */
  @Action
  public async getMenu() {
    let userData: IUserData = JSON.parse(getUserData() as string)
    return await APIGetMenu({ phone: userData.mobile, comcode: userData.comcode })
  }
  /**
   * 存入路由数据
   * @param routeList 
   */
  @Action setMenu(routeList: RouteConfig[]) {
    this.SET_MENU(routeList);
  }
}

export const UserModule = getModule(User)