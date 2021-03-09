/**
 * 通过地址来下载文件
 * @param downUrl 
 * @param fileName 
 */
export function downLoadByURL(downUrl: string, fileName: string = '文件名称') {
  let a = document.createElement("a");// 创建a标签
  if ('download' in a) {
    a.download = fileName;// 设置下载文件的文件名
  }
  (document.body || document.documentElement).appendChild(a);
  a.href = downUrl;// downUrl为后台返回的下载地址
  a.target = '_parent';
  a.click();// 设置点击事件
  a.remove(); // 移除a标签
}