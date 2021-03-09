<template>
  <div class="app-container">
    <el-card shadow="never">
      <card-header :title="'基本信息'" />
      <el-card shadow="never" class="purchase-obj-container">
        <span>采购对象</span>
        <el-radio-group v-model="purchaseObj">
          <el-radio label="个人采购"></el-radio>
          <el-radio label="部门采购"></el-radio>
        </el-radio-group>
        <span
          >采购金额：<span class="money-container">￥{{ 100 }}</span></span
        >
        <span
          >总金额：<span class="money-container">￥{{ 200 }}</span></span
        >
      </el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <card-header :title="'商品列表'" />
          <el-card shadow="never">
            <el-input
              placeholder="请输入商品名称，自动搜索指定的商品"
              v-model="searchGoods"
              size="mini"
            ></el-input>
            <el-table :data="tableData" border style="width: 100%" size="mini">
              <el-table-column fixed prop="date" label="日期" width="150">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="province" label="省份" width="120">
              </el-table-column>
              <el-table-column prop="city" label="市区" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址" width="300">
              </el-table-column>
              <el-table-column prop="zip" label="邮编" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="12">
          <card-header :title="'购物车列表'" />
          <el-card shadow="never">
            <el-input
              placeholder="请输入商品名称，自动搜索指定的商品"
              v-model="searchGoods"
              size="mini"
            ></el-input>
            <el-table :data="tableData" border style="width: 100%" size="mini">
              <el-table-column fixed prop="date" label="日期" width="150">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="province" label="省份" width="120">
              </el-table-column>
              <el-table-column prop="city" label="市区" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址" width="300">
              </el-table-column>
              <el-table-column prop="zip" label="邮编" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <div class="btn-container">
        <el-button type="primary">提交保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import CardHeader from "./../components/CardHeader/index.vue";
@Component({
  name: "Purchase",
  components: {
    CardHeader,
  },
})
export default class extends Vue {
  /**
   * 采购对象
   */
  private purchaseObj: string = "个人采购";
  /**
   * 搜索商品
   */
  private searchGoods: string = "";

  private tableData = [
    {
      date: "2016-05-02",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333,
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1517 弄",
      zip: 200333,
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1519 弄",
      zip: 200333,
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1516 弄",
      zip: 200333,
    },
  ];
}
</script>

<style lang="scss" scoped>
.purchase-obj-container {
  display: flex;
  user-select: none;

  span {
    &:first-child {
      margin: 0px 20px 0px 0px;
    }
    &:nth-of-type(2) {
      margin: 0px 0px 0px 40px;
    }
    margin: 0px 0px 0px 20px;
  }

  .money-container {
    color: #f40;
    font-size: 16px;
  }
}
</style>