//app.js
import Wechat from "./common/wechat.js"
App({
  onLaunch: function () {

  },
  // 提供的公共能力方法
  method: {
    wechat: Wechat, // 微信api接口封装
  },
  globalData: {
    userInfo: null
  }
})