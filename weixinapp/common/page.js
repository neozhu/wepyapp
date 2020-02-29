export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '食堂就餐扫码APP'
      };
    },
    ...options
  });
}