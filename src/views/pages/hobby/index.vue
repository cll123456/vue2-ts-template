<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-form ref="padBranchFormRef" :model="padBranchForm" size="mini">
        <card-header :title="'申请人信息'" />
        <div class="appy-info-container">
          <el-form-item label="申请人" label-width="120px">
            <el-input
              v-model="padBranchForm.name"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="申请时间" label-width="120px">
            <el-input
              v-model="padBranchForm.name"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门" label-width="120px">
            <el-input
              v-model="padBranchForm.name"
              style="width: 200px"
            ></el-input>
          </el-form-item>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <card-header :title="'申请内容'" />
            <el-card shadow="never">
              <el-form-item label="爱好" label-width="120px">
                <el-radio-group v-model="padBranchForm.applyItem">
                  <el-radio label="吃饭"></el-radio>
                  <el-radio label="睡觉"></el-radio>
                  <el-radio label="打豆豆"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="险种" label-width="120px">
                <el-select
                  v-model="padBranchForm.insurance"
                  placeholder="请选择活动"
                  style="width: 100%"
                >
                  <el-option label="跳绳" value="0"></el-option>
                  <el-option label="游泳" value="1"></el-option>
                  <el-option label="打篮球" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付金额（/元）" label-width="120px">
                <el-input
                  placeholder="请输入支付金额"
                  v-model.number="padBranchForm.payMoney"
                />
              </el-form-item>
              <el-form-item label="银行卡号" label-width="120px">
                <el-input
                  placeholder="请输入银行卡号"
                  v-model="padBranchForm.cardNumber"
                />
              </el-form-item>
              <el-form-item label="支付原因" label-width="120px">
                <el-input
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  type="textarea"
                  placeholder="请输入支付原因"
                  v-model="padBranchForm.payReason"
                  maxlength="200"
                  show-word-limit
                />
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <card-header :title="'图片上传'" />
            <pic-list :fileList.sync="fileList" :parentHight="326" />
          </el-col>
        </el-row>
        <div class="btn-container">
          <el-button type="primary">提交保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { ElForm } from "element-ui/types/form";
import { Component, Ref, Vue } from "vue-property-decorator";
import CardHeader from "./../components/CardHeader/index.vue";
import { IFileObj } from "./../../types/fileTypes";
import PicList from "./../components/PicList/index.vue";
@Component({
  name: "Hobby",
  components: {
    CardHeader,
    PicList,
  },
})
export default class extends Vue {
  /**
   * from 表单的数据
   */
  public padBranchForm = {
    name: "",
    applyItem: "打豆豆", // 申请事项
    insurance: "", // 险种
    payMoney: 0, // 支付金额
    cardNumber: "", // 支付金额
    payReason: "", // 支付原因
  };
  /**
   * form 表单的ref
   */
  @Ref() padBranchFormRef!: ElForm;

  /**
   * 文件列表
   */
  public fileList: IFileObj[] = [];
}
</script>

<style lang="scss" scoped>
.appy-info-container {
  display: flex;
}



</style>