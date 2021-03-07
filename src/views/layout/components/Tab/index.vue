<template>
  <div class="tab-container">
    <ul class="tabs-ul" id="tabs">
      <scroller :parentId="`tabs`" :type="`horizontal`">
        <li
          v-for="item in TabList"
          :key="item.path"
          :class="['tab-li', item.path === currentTab ? 'is-active' : '']"
          @click.prevent="goToPage(item)"
        >
          {{ item.title }}
          <i
            class="el-icon-close"
            v-if="item.path !== '/index'"
            @click.stop="closeCurentTab(item.path)"
          ></i>
        </li>
      </scroller>
    </ul>
    <!-- 更多炒作 -->
    <el-dropdown @command="handleCommand">
      <el-button type="primary" size="small">
        更多操作
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="ECloseTab.closeCurrent"
          >关闭当前</el-dropdown-item
        >
        <el-dropdown-item :command="ECloseTab.closeOther"
          >关闭其他</el-dropdown-item
        >
        <el-dropdown-item :command="ECloseTab.closeAll"
          >关闭全部</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { AppModule } from "@/store/modules/app";
import { IRouteObj } from "@/views/types/routeTypes";
import { Component, Vue } from "vue-property-decorator";
import Scroller from "@/components/Scroller/index.vue";
import { ECloseTab } from "./types";
@Component({
  name: "Tab",
  components: {
    Scroller,
  },
})
export default class extends Vue {
  /**
   * 关闭按钮的枚举
   */
  private ECloseTab = ECloseTab;
  // 获取TabList
  get TabList() {
    return AppModule.TabList;
  }
  /**
   * 获取当前选中的值，需要使用计算属性
   */
  get currentTab() {
    return AppModule.currentTab;
  }
  /**
   * 关闭当前tab
   */
  closeCurentTab(path: string) {
    if (path === "/index") return;
    let index = -1;
    this.TabList.forEach((it, i) => {
      if (it.path === path) {
        console.log(i);
        index = i - 1;
      }
    });
    // 关闭的tab 和当前显示的不一样，不需要进行push
    if (this.TabList[index].path !== this.currentTab) {
      this.$router.push(this.TabList[index].path);
    }
    AppModule.closeTab(path);
  }

  /**
   * 千万选中的tab
   */
  goToPage(route: IRouteObj) {
    const { path } = route;
    // 如果当前的路由和点击的路由一样，不进行push
    if (this.currentTab === path) {
      return;
    }
    this.$router.push(path);
  }
  /**
   * 点击按钮的关闭操作
   */
  private handleCommand(tip: ECloseTab) {
    if (tip === ECloseTab.closeCurrent) {
      this.closeCurentTab(this.currentTab);
    } else if (tip === ECloseTab.closeOther) {
      if(this.currentTab === '/index'){
        AppModule.closeAll();
        return;
      }
      AppModule.closeOther();
    } else if (tip === ECloseTab.closeAll) {
      if (this.currentTab !== "/index") {
        this.$router.push("/index");
      }
      AppModule.closeAll();
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  height: 46px;
  background: $subColor;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;

  .tabs-ul {
    width: calc(100% - 114px);
    padding-right: 5px;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    height: 100%;
    line-height: 46px;

    &:hover {
      overflow: auto;
    }

    .tab-li {
      display: inline-block;
      height: 32px;
      padding: 0 10px;
      line-height: 30px;
      font-size: 12px;
      color: $mainColor;
      background-color: mix(#fff, rgb(49, 46, 46), 90);
      color: mix($subColor, rgb(49, 46, 46), 90);
      border: 1px solid mix(#fff, rgb(49, 46, 46), 90);
      border-radius: 4px;
      box-sizing: border-box;
      white-space: nowrap;
      margin-right: 5px;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s linear;

      &.is-active,
      &:hover {
        transition: all 0.3s linear;
        background-color: $mainColor;
        border-color: mix($mainColor, #fff, 90);
        color: #fff;
      }
      &:first-child {
        margin-left: 15px;
      }
      i {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        line-height: 14px;
        padding: 0 1px;
        transition: all 0.3s linear;
        &:hover {
          transition: all 0.3s linear;
          background: #fff;
          color: #000;
        }
      }
    }
  }
}
</style>