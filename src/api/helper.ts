export class RequestDataHelper {

  /**
   * 格式化数据为fromdata 的形式
   * @param data
   * @returns {string}
   */
  static formatDataToFormData(data:any){
      let result = '';
      for (let it in data) {
          result += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return result;
  }
}