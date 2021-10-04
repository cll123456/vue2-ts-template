<template>
  <div class="drag" ref="dragDiv">
    <div class="drag_bg"></div>
    <div class="drag_text">{{ confirmWords }}</div>
    <div
      ref="moveDiv"
      @mousedown="mouseDownFn($event)"
      :class="{ handler_ok_bg: confirmSuccess }"
      class="handler handler_bg"
      style="position: absolute; top: 0px; left: 0px"
    ></div>
  </div>
</template>

<script lang='ts'>
import { Component, Ref, Vue } from "vue-property-decorator";
@Component({
  name: "LoginValidator",
})
export default class extends Vue {
  /**
   * 距离屏幕左端距离
   */
  public beginClientX = 0;
  /*触发拖动状态  判断*/
  public mouseMoveState = false;
  /*拖动最大宽度，依据滑块宽度算出来的*/
  public maxWidth = 0;
  /*滑块文字*/
  public confirmWords = "向右拖动滑块验证";
  /*验证成功判断*/
  public confirmSuccess = false;
  /**
   * 外壳div
   */
  @Ref() readonly dragDiv!: HTMLDivElement;
  /**
   * 移动的div
   */
  @Ref() readonly moveDiv!: HTMLDivElement;

  /**
   * 对外暴露的一个是否完成的方法
   */
  public get isFinish() {
    return this.confirmSuccess;
  }
  /**
   * 鼠标点击事件
   */
  public mouseDownFn(e: MouseEvent) {
    if (!this.confirmSuccess) {
      e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
      this.mouseMoveState = true;
      this.beginClientX = e.clientX;
    }
  }

  /**
   * 鼠标移动事件
   */
  public mouseMoveFn(e: MouseEvent) {
    if (this.mouseMoveState) {
      let width = e.clientX - this.beginClientX;
      if (width > 0 && width <= this.maxWidth) {
        const handerDom: NodeListOf<HTMLDivElement> = document.querySelectorAll(
          ".handler"
        );
        handerDom[0].style.left = width + "px";
        const dragDom: NodeListOf<HTMLDivElement> = document.querySelectorAll(
          ".drag_bg"
        );
        dragDom[0].style.width = width + "px";
      } else if (width > this.maxWidth) {
        this.successFunction();
      }
    }
  }
  /**
   * 鼠标抬起的事件
   */
  public moseUpFn(e: MouseEvent) {
    this.mouseMoveState = false;
    let width = e.clientX - this.beginClientX;
    if (width < this.maxWidth) {
      const handlerDom: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        ".handler"
      );
      handlerDom[0].style.left = 0 + "px";
      const dragDom: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        ".drag_bg"
      );
      dragDom[0].style.width = 0 + "px";
    }
  }

  //验证成功函数
  public successFunction() {
    this.confirmSuccess = true;
    this.confirmWords = "验证通过";
    // 清除绑定的事件
    // if ((window as Window)?.addEventListener) {
      document
        .getElementsByTagName("html")[0]
        .removeEventListener("mousemove", this.mouseMoveFn);
      document
        .getElementsByTagName("html")[0]
        .removeEventListener("mouseup", this.moseUpFn);
    // } else {
      document
        .getElementsByTagName("html")[0]
        .removeEventListener("mouseup", () => {});
    // }
    // 给图标赋值
    (document.querySelectorAll(
      ".drag_text"
    ) as NodeListOf<HTMLDivElement>)[0].style.color = "#fff";
    (document.querySelectorAll(
      ".handler"
    ) as NodeListOf<HTMLDivElement>)[0].style.left = this.maxWidth + "px";
    (document.querySelectorAll(
      ".drag_bg"
    ) as NodeListOf<HTMLDivElement>)[0].style.width = this.maxWidth + "px";
  }
  /**
   * 组件挂载的时候添加事件计算滑动的宽度
   */
  mounted() {
    this.maxWidth = this.dragDiv.clientWidth - this.moveDiv.clientWidth;
    document
      .getElementsByTagName("html")[0]
      .addEventListener("mousemove", this.mouseMoveFn);
    document
      .getElementsByTagName("html")[0]
      .addEventListener("mouseup", this.moseUpFn);
  }
}
</script>

<style lang="scss" scoped>
.drag {
  position: relative;
  background-color: mix($subColor, #fff, 75);
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-radius: 4px;
}

.handler {
  width: 46px;
  height: 46px;
  border-radius: 4px;
  cursor: move;
}

.handler_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==")
    no-repeat center;
}

.handler_ok_bg {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: #fff url("./img/success.png") no-repeat center;
  background-size: 20px 20px;
}

.drag_bg {
  background-color: $mainColor;
  height: 46px;
  width: 0;
  border-radius: 4px 0 0 4px;
}

.drag_text {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
</style>