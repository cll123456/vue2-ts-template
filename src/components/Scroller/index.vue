<template>
  <div class="scroller-wraper" @mousewheel.prevent="handleScroll">
    <div class="scroller-container">
      <slot></slot>
    </div>
    <div
      v-if="type === EType.horizontal"
      :style="getStyle"
      class="is-horizontal-container"
    />
    <div
      :style="getStyle"
      v-if="type === EType.vertical"
      class="is-vertical-container"
    />
  </div>
</template>

<script lang='ts'>
import Vue, { VNode } from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { EType } from "./types";

@Component({
  name: "Scoller",
})
export default class extends Vue {
  /**
   * 水平还是垂直
   */
  @Prop({ default: EType.horizontal }) private type!: EType;
  /**
   * 父级的id
   */
  @Prop({ required: true }) private parentId!: string;
  /**
   * 滚动条的背景颜色
   */
  @Prop({ default: "rgb(66, 59, 54)" }) private bgColor!: string;

  /**
   * 注册一个观察者
   */
  private observer!: MutationObserver;

  /**
   * 元素总宽度/高度
   */
  private childsTotalLength: number = 0;

  /**
   * 父元素的总高度/宽度
   */
  private parentLength: number = 0;
  /**
   * 枚举类型
   */
  private EType = EType;
  /**
   * 父元素
   */

  private PDom!: Element;
  /**
   * 滚动条dom
   */
  private scrollDom!: Element;
  /**
   * 滚动条容器
   */
  private scrollContainerDom!: Element;
  /**
   * 获取子元素的宽/高
   */
  private caculateChildLength(childs: VNode[] | undefined) {
    if (childs === undefined) {
      this.childsTotalLength = 0;
      return;
    }
    // 求和之前需要先制空
    this.childsTotalLength = 0;
    // 计算当前元素的子元素的总和高度/宽度
    for (const child of childs as VNode[]) {
      this.childsTotalLength +=
        this.type === EType.horizontal
          ? (child.elm as Element).clientWidth
          : (child.elm as Element).clientHeight;
    }
  }
  /**
   * 获取样式
   */
  get getStyle() {
    let width = 0;
    if (this.childsTotalLength > this.parentLength) {
      width = (this.parentLength * this.parentLength) / this.childsTotalLength;
    }

    return {
      width: width + "px",
      background: this.bgColor,
    };
  }
  /**
   * 计算父级的宽/高
   */
  private caculateParentLength() {
    this.parentLength =
      this.type === EType.horizontal
        ? this.PDom.clientWidth
        : this.PDom.clientHeight;
        console.log(this.parentLength);
        
  }
  /***
   * 鼠标滚动事件
   */
  private handleScroll(e: WheelEvent) {
    // 获取鼠标滚动的距离，正数向上，负数向下
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
    this.scrollContainerDom.style.left =
      parseFloat(window.getComputedStyle(this.scrollContainerDom).left) +
      eventDelta / 4 +
      "px";
    this.scrollDom.style.left =
      parseFloat(window.getComputedStyle(this.scrollDom).left) +
      (-eventDelta / 4) +
      "px";
    console.log(this.scrollDom);
  }

  /**
   * 元素挂载的时候就需要先计算宽度/高度
   */
  mounted() {
    // 父级dom
    this.PDom = document.querySelector("#" + this.parentId) as Element;
    // 滚动条dom
    this.scrollDom =
      this.type === EType.horizontal
        ? this.$el.querySelectorAll(".is-horizontal-container")[0]
        : this.$el.querySelectorAll(".is-vertical-container")[0];
    // 滚动条容器的dom
    this.scrollContainerDom = this.$el.querySelectorAll(
      ".scroller-container"
    )[0];
    // 计算子元素的长度/宽度
    this.caculateChildLength(this.$slots.default);
    // 获取父级元素的宽/高
    this.caculateParentLength();
    // 添加一个dom 监听器
    this.$nextTick(() => {
      // 创建一个观察者
      this.observer = new MutationObserver(
        (mutations: MutationRecord[], observer: MutationObserver) => {
          // 计算子元素的长度/宽度
          this.caculateChildLength(this.$slots.default);
          // 获取父级元素的宽/高
          this.caculateParentLength();
        }
      );

      // Setup the observer
      this.observer.observe(document.getElementById(this.parentId) as Node, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  }
  // 组件销毁，断开连接
  beforeDestroy() {
    // Clean up
    this.observer.disconnect();
  }
}
</script>

<style lang="scss" scoped>
.scroller-wraper {
  position: relative;
  // 去除隐藏原生的滚动条
  overflow: hidden;
  height: 100%;
  width: 100%;
  cursor: pointer;

  & .scroller-container {
    white-space: nowrap;
    position: absolute;
  }

  & .is-horizontal-container {
    position: absolute;
    bottom: 0px;
    height: 5px;
    width: 100px;
    background: rgb(66, 59, 54);
    opacity: 0.3;
    border-radius: 10px;
    display: none;
  }

  &:hover .is-horizontal-container {
    display: block;
  }
}
</style>