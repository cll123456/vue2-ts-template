<template>
  <div class="app-container">
    <el-card shadow="never">
      <!-- 查询条件 -->
      <el-form :model="willDoTaskListForm" size="mini" :inline="true">
        <el-form-item label="姓名">
          <el-input
            placeholder="请输入员工姓名"
            v-model="willDoTaskListForm.name"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="流程类别" placeholder="请选择流程">
          <el-select clearable filterable v-model="willDoTaskListForm.type">
            <el-option value="1" label="请假流程"></el-option>
            <el-option value="2" label="退垫支流程"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
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
        <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "WillDoTaskList",
})
export default class extends Vue {
  private willDoTaskListForm = {
    name: "", // 员工姓名进行查询
    type: "1", // 流程类别
  };
  /**
   * 表格数据
   */
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

  /**
   * 当前页面
   */
  private currentPage: number = 1;

  handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`);
  }
  handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`);
  }
}
</script>

<style lang="scss" scoped>
.page{
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>