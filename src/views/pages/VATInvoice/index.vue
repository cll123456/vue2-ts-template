<template>
  <div class="app-container">
    <el-card shadow="never">
      <card-header :title="'基本信息'"></card-header>
      <div>内容详情</div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { ElForm } from "node_modules/element-ui/types/form";
import { Component, Ref, Vue } from "vue-property-decorator";
import CardHeader from "./../components/CardHeader/index.vue";
@Component({
  name: "VATInvoice",
  components: {
    CardHeader,
  },
})
export default class extends Vue {
  /**
   * 表单的ref
   */
  @Ref() public VATInvoiceRef!: ElForm;

  public VATInvoiceFrom = {
    name: "",
    getFee: "是", // 是否收到保费
    applyReason: "", // 申请原因
  };
}
</script>

<style>
</style>