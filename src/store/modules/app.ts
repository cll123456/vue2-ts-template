import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import {
  getCurrentTab,
  getSidebarStatus,
  setCurrentTab,
  setSidebarStatus,
} from '@/utils/cookies'
import store from '@/store'
import { IRouteObj } from '@/views/types/routeTypes';


export interface IAppState {
  // 侧边栏的状态
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  // 当前选中的tab
  currentTab: string,
  /**
   * 路由列表
   */
  TabList: IRouteObj[]
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  // 左边侧边栏的状态
  public sidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  }
  // 当前选中的tab
  public currentTab = '/';
  // tab列表
  public TabList: IRouteObj[] = [
    {
      name: "Index",
      path: "/index",
      title: "首页",
    }
  ]


  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
    if (this.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  }

  /**
   * 点击菜单，存入tab的数据
   * @param obj 
   */
  @Mutation
  private SET_TAB(obj: IRouteObj) {
    const { path } = obj;
    // store 和 cookie 都需要存入数据
    this.currentTab = path;
    setCurrentTab(obj)
    // 路由列表中不存在，加入tab列表
    if (!this.TabList.some(it => it.name === obj.name || it.path === obj.path || it.title === obj.title)) {
      this.TabList.push(obj);
    }
  }

  /**
   * 关闭指定的路由
   * @param path 1
   */
  @Mutation
  private CLOSE_TAB(path: string) {
    // 路由列表筛选不匹配的
    this.TabList = this.TabList.filter((it: IRouteObj) => it.path !== path);
  }
/**
 * 关闭其他
 */
  @Mutation
  private CLOSE_OTHER() {
    const currentObj: IRouteObj = JSON.parse(getCurrentTab() as string);
    this.TabList = [{
      name: "Index",
      path: "/index",
      title: "首页",
    }, currentObj]
  }
/**
 * 关闭全部
 */
  @Mutation
  private CLOSE_ALL(){
    const obj = {
      name: "Index",
      path: "/index",
      title: "首页",
    }
    this.TabList = [obj];
    this.currentTab = '/index';
    setCurrentTab(obj);
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation)
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation)
  }
  /**
   * 对外暴露的action, 存入tab
   * @param obj 
   */
  @Action
  public SaveTab(obj: IRouteObj) {
    this.SET_TAB(obj)
  }
  /**
   * 关闭指定的tab
   * @param path 
   */
  @Action
  public closeTab(path: string) {
    this.CLOSE_TAB(path)
  }
  /**
   * 关闭其他
   */
  @Action
  public closeOther() {
    this.CLOSE_OTHER();
  }
/**
 * 关闭全部
 */
  @Action
  public closeAll(){
    this.CLOSE_ALL();
  }
}

export const AppModule = getModule(App)
