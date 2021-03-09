<template>
  <div class="app-container">
    <el-card shadow="never">
      <card-header :title="'基本信息'"></card-header>
      <el-form
        ref="VATInvoiceRef"
        :model="VATInvoiceFrom"
        label-width="120px"
        size="mini"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发票开具保单号">
              <el-input
                v-model="VATInvoiceFrom.name"
                maxlength="22"
                placeholder="请输入发票开具保单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户名称">
              <el-input
                v-model="VATInvoiceFrom.name"
                maxlength="22"
                placeholder="请输入客户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input
                v-model="VATInvoiceFrom.name"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="开户行">
              <el-input
                v-model="VATInvoiceFrom.name"
                placeholder="请输入开户行"
              ></el-input>
            </el-form-item>
            <el-form-item label="开票总金额">
              <el-input
                v-model="VATInvoiceFrom.name"
                placeholder="请输入开票总金额"
              ></el-input>
            </el-form-item>
            <el-form-item label="申请原因">
              <el-input
                :autosize="{ minRows: 4, maxRows: 6 }"
                type="textarea"
                placeholder="申请原因"
                v-model="VATInvoiceFrom.applyReason"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属机构">
              <el-input
                v-model="VATInvoiceFrom.name"
                placeholder="请输入归属机构"
              ></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号">
              <el-input
                v-model="VATInvoiceFrom.name"
                placeholder="请输入纳税人识别号"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input
                v-model="VATInvoiceFrom.name"
                placeholder="请输入电话号码"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行卡账号">
              <el-input
                v-model="VATInvoiceFrom.name"
                placeholder="请输入银行卡账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否收到保费">
              <el-radio-group v-model="VATInvoiceFrom.getFee">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="btn-container">
              <el-button type="primary">提交保存</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
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
  @Ref() private VATInvoiceRef!: ElForm;

  private VATInvoiceFrom = {
    name: "",
    getFee: "是", // 是否收到保费
    applyReason: "", // 申请原因
  };
}
</script>

<style>
</style>