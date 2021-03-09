<template>
  <el-card shadow="never" class="upload-container" :style="getParentStyle">
    <!-- 图片上传 -->
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :multiple='true'
      :limit="limits"
      :on-exceed="exceedLimitFile"
      :on-change="handleChange"
      :file-list="fileList"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
            title="查看图片"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
            title="下载图片"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
            title="删除图片"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <!-- 查看图片 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { downLoadByURL } from "@/utils/download";
import { IFileObj } from "@/views/types/fileTypes";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "PicList",
})
export default class extends Vue {
  /**
   * 文件列表
   */
  @Prop({ required: true, default: [] }) private fileList!: IFileObj[];
  /**
   * 文件个数
   */
  @Prop({ default: 5 }) private limits: number = 5;

  /**
   * 父级容器的高度
   */
  @Prop({ default: 200 }) private parentHight!: number;
  /**
   * 获取父级容器的高度
   */
  get getParentStyle() {
    return {
      height: this.parentHight + "px",
    };
  }

  /**
   * 图片弹框地址
   */
  private dialogImageUrl: string = "";
  /**
   * 图片打开的弹框
   */
  private dialogVisible: boolean = false;
  /**
   * 是否显示按钮
   */
  private disabled: boolean = false;
  /**
   * 查看图片
   */
  private handlePictureCardPreview(file: IFileObj) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  /**
   * 下载文件
   */
  private handleDownload(file: IFileObj) {
    downLoadByURL(file.url, file.name);
  }
  /**
   * 获取文件列表
   */
  private handleChange(file: IFileObj, fileList: IFileObj[]) {
    console.log(file);
    
    this.$emit('update:fileList', fileList);
  }
  /**
   * 删除文件，
   */
  private handleRemove(file: IFileObj) {
    console.log(file, this.fileList);
    
    let list = this.fileList.filter(
      (f: IFileObj) => f.uid !== file.uid && f.url !== file.url
    );
    this.$emit('update:fileList', list);
  }
  /**
   * 文件超过限制
   */
  private exceedLimitFile() {
    this.$message.warning(`上传的文件个数不能超过${this.limits}张!`);
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  overflow-y: auto;
  /deep/ .el-upload {
    width: 148px !important;
  }
}
</style>