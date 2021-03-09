<template>
  <h2 class="card-header-container">{{ title }}</h2>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "CardHeader",
})
export default class extends Vue {
  @Prop({ required: true, default: "一级标题" }) private title!: string;
}
</script>

<style lang="scss" scoped>
.card-header-container {
  font-size: 18px;
  color: $subColor;
  position: relative;
  margin-left: 24px;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 22px;
    background: #ff9700;
    left: -20px;
    top: 0;
    border-radius: 6px;
  }
}
</style>