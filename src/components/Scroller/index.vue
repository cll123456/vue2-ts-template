<template>
  <div class="scroller-wraper" @mousewheel.prevent="handleScroll">
    <div class="scroller-container">
      <slot></slot>
    </div>
    <div
      v-if="type === EType.horizontal"
      :style="getStyle"
      class="is-horizontal-container"
    @mousedown="movedis"
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
  @Prop({ default: EType.horizontal }) public type!: EType;
  /**
   * 父级的id
   */
  @Prop({ required: true }) public parentId!: string;
  /**
   * 滚动条的背景颜色
   */
  @Prop({ default: "rgb(66, 59, 54)" }) public bgColor!: string;

  /**
   * 注册一个观察者
   */
  public observer!: MutationObserver;

  /**
   * 元素总宽度/高度
   */
  public childsTotalLength: number = 0;

  /**
   * 父元素的总高度/宽度
   */
  public parentLength: number = 0;
  /**
   * 枚举类型
   */
  public EType = EType;
  /**
   * 父元素
   */

  public PDom!: Element;
  /**
   * 滚动条dom
   */
  public scrollDom!: HTMLDivElement;
  /**
   * 滚动条容器
   */
  public scrollContainerDom!: HTMLDivElement;

  /**
   * 滚动条和实际长度的比列
   */
  public radio: number = 1;
  /**
   * 获取子元素的宽/高
   */
  public caculateChildLength() {
    // 求和之前需要先制空
    this.childsTotalLength = 0;
    // 计算当前元素的子元素的总和高度/宽度
    this.childsTotalLength =
      this.type === EType.horizontal
        ? document.getElementsByClassName("scroller-container")[0].clientWidth
        : document.getElementsByClassName("scroller-container")[0].clientHeight;
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
  public caculateParentLength() {
    this.parentLength =
      this.type === EType.horizontal
        ? this.PDom.clientWidth
        : this.PDom.clientHeight;
  }
  /**
   * 处理水平状态的滚动条
   */
  public horizontalScrollTo(eventDelta: number) {
    const scrollContainerLeft = parseFloat(
      window.getComputedStyle(this.scrollContainerDom).left
    );
    const scrollLeft = parseFloat(window.getComputedStyle(this.scrollDom).left);
    // 边界判断
    // 内容的left值不能大于0,或者left 值不能无限向左边滚动
    if (
      scrollContainerLeft <= 0 ||
      this.PDom.clientWidth + -scrollContainerLeft <= this.childsTotalLength
    ) {
      let moveValue =
        scrollContainerLeft + eventDelta / 4 > 0
          ? 0
          : scrollContainerLeft + eventDelta / 4;
      moveValue =
        moveValue >= -(this.childsTotalLength - this.PDom.clientWidth)
          ? moveValue
          : -(this.childsTotalLength - this.PDom.clientWidth);
      this.scrollContainerDom.style.left = moveValue + "px";
    }
    // 滚动条的left值不能小于0，滚动条left + 滚动条本身的宽度不能大于pDom
    if (
      scrollLeft >= 0 ||
      scrollLeft + this.scrollDom.clientWidth <= this.PDom.clientWidth
    ) {
      let moveValue =
        scrollLeft + (-eventDelta / 4) * this.radio < 0
          ? 0
          : scrollLeft + (-eventDelta / 4) * this.radio;
      moveValue =
        moveValue >= this.PDom.clientWidth - this.scrollDom.clientWidth
          ? this.PDom.clientWidth - this.scrollDom.clientWidth
          : moveValue;
      this.scrollDom.style.left = moveValue + "px";
    }
  }
  public movedis(e:MouseEvent){
    console.log(e,'----');
    
  }

  /***
   * 鼠标滚动事件
   */
  public handleScroll(e: WheelEvent) {
    // 如果父级的宽度大于子集的总和，不需要移动
    if (this.radio >= 1) return;
    // 获取鼠标滚动的距离，正数向上，负数向下
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
    // 水平方向移动
    if (this.type === EType.horizontal) {
      this.horizontalScrollTo(eventDelta);
    }
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
        ? this.$el.querySelectorAll(".is-horizontal-container")[0] as HTMLDivElement
        : this.$el.querySelectorAll(".is-vertical-container")[0]  as HTMLDivElement;
    // 滚动条容器的dom
    this.scrollContainerDom = this.$el.querySelectorAll(
      ".scroller-container"
    )[0]  as HTMLDivElement;
    // 计算子元素的长度/宽度
    this.caculateChildLength();
    // 获取父级元素的宽/高
    this.caculateParentLength();
    // 添加一个dom 监听器
    this.$nextTick(() => {
      // 创建一个观察者
      this.observer = new MutationObserver(
        (mutations: MutationRecord[], observer: MutationObserver) => {
          // 计算子元素的长度/宽度
          this.caculateChildLength();
          // 获取父级元素的宽/高
          this.caculateParentLength();
          // 赋值比列
          this.radio = this.parentLength / this.childsTotalLength;
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