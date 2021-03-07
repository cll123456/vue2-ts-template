<template>
  <div>
    <sidebar-logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :unique-opened="true"
        :collapse-transition="false"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SidebarItem from "./SidebarItem.vue";
import SidebarLogo from "./SidebarLogo.vue";
import variables from "@/styles/variables.scss";
import { routes } from "@/router";
import { AppModule } from "@/store/modules/app";
import { getCurrentTab } from "@/utils/cookies";

@Component({
  name: "SideBar",
  components: {
    SidebarItem,
    SidebarLogo,
  },
})
export default class extends Vue {
  /**
   * 获取权限路由
   */
  get routes() {
    console.log(routes);

    // console.log(PermissionModule.routes)
    // return PermissionModule.routes
    return routes;
  }
  /**
   * 获取菜单栏状态
   */
  get sidebar() {
    return AppModule.sidebar;
  }

  /**
   * 获取scss变量
   */
  get variables() {
    return variables;
  }
  /**
   * 获取当前激活菜单
   */
  get activeMenu() {
    const route =  this.$route;
    const { meta, path, name } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    // 切换菜单的时候存入tab
    AppModule.SaveTab({ name: name as string, path: path, title: meta.title });
    return path;
  }
  /**
   * 获取当前菜单是否关闭
   */
  get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
.el-menu--popup > div:has(.is-active) {
  background-color: $subColor !important;
  border-left: 2px solid #ed1c24 !important;
}

.el-menu--popup > div:has(.el-menu-item) :hover {
  background-color: $subColor !important;
  border-left: 2px solid #ed1c24 !important;
  color: $menuActiveText !important;
}

.el-menu--popup > div {
  border-bottom: 1px dashed rgba(201, 211, 213, 0.7) !important;
}
// 修改element菜单的样式
.el-menu {
  border: none;
  height: 100%;
  width: 100%;
  background-color: $menuBg !important;
  /**配色 */

  .el-menu-item {
    background-color: $menuBg !important;
    height: 46px;
    line-height: 46px;
    color: $menuText !important;
    &:hover {
      background-color: $subColor !important;
      border-left: 2px solid #ed1c24 !important;
      color: $menuActiveText !important;
    }
    &.is-active {
      background-color: $subColor !important;
      border-left: 2px solid #ed1c24 !important;
      color: $menuActiveText !important;
    }
  }

  .el-submenu__title {
    background-color: $menuBg !important;
    height: 46px;
    line-height: 46px;
    &:hover {
      background-color: $subColor !important;
      border-left: 2px solid #ed1c24;
      color: $menuActiveText !important;
    }
  }

  .el-submenu.is-active > .el-submenu__title {
    color: $menuText !important;
    &:hover,
    &:hover > i {
      color: $menuActiveText !important;
    }
  }

  // 一级菜单加上横向实线，二级菜单虚线
  .submenu-title-noDropdown,
  .el-submenu__title {
    border-bottom: 1px solid rgba(201, 211, 213, 0.3) !important;
  }
  // 二级菜单添加虚线
  .el-menu--inline > div {
    border-bottom: 1px dashed rgba(201, 211, 213, 0.7) !important;
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px dashed rgba(201, 211, 213, 0.7) !important;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}
</style>
