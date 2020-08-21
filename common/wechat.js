export default class Wechat {
  static login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: resolve,
        fail: reject
      })
    })
  }

  static checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: resolve,
        fail: reject
      })
    })
  }

  static getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: resolve,
        fail: reject
      })
    })
  }

  static getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: resolve,
        fail: reject
      })
    })
  }

  static openSetting() {
    return new Promise((resolve, reject) => {
      wx.openSetting({
        success: resolve,
        fail: reject
      })
    })
  }

  static setStorage(key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: key,
        data: value,
        success: resolve,
        fail: reject
      })
    })
  }

  static getStorage(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: key,
        success: resolve,
        fail: reject
      })
    })
  }

  static getStorageSync(key) {
    return wx.getStorageSync(key)
  }

  static setStorageSync(key, value) {
    return wx.setStorageSync(key, value)
  }

  static getLocation(type) {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: type,
        success: resolve,
        fail: reject
      })
    })
  }

  static request(url, params, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: params,
        method: method,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: resolve,
        fail: reject
      })
    })
  }

  static showMsg(msg, duration) {
    wx.showToast({
      title: msg + '',
      icon: "none",
      mask: true,
      duration: duration ? duration : 1500
    })
  }

  static getPhoneInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: resolve,
        fail: reject
      })
    })
  }

  static startPullDownRefresh() {
    return new Promise((resolve, reject) => {
      wx.startPullDownRefresh({
        success: resolve,
        fail: reject
      })
    })
  }
  static stopPullDownRefresh() {
    return new Promise((resolve, reject) => {
      wx.stopPullDownRefresh({
        success: resolve,
        fail: reject
      })
    })
  }
  static hideNavigationBarLoading() {
    return new Promise((resolve, reject) => {
      wx.hideNavigationBarLoading({
        success: resolve,
        fail: reject
      })
    })
  }
  static showNavigationBarLoading() {
    return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading({
        success: resolve,
        fail: reject
      })
    })
  }

  static requestPayment(options) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: options.timeStamp,
        nonceStr: options.nonceStr,
        package: options.package,
        signType: 'MD5',
        paySign: options.paySign,
        success: resolve,
        fail: reject
      })
    })
  }

  static authorize(params) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        scope: params,
        success: resolve,
        fail: reject
      })
    })
  }

  static showLoading(title) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: title ? title : '加载中...',
        mask: true,
        success: resolve,
        fail: reject
      })
    })
  }

  static showShareMenu(params) {
    return new Promise((resolve, reject) => {
      wx.showShareMenu({
        withShareTicket: params.withShareTicket,
        success: resolve,
        fail: reject
      })
    })
  }

  static getShareInfo(params) {
    return new Promise((resolve, reject) => {
      wx.getShareInfo({
        shareTicket: params,
        success: resolve,
        fail: reject
      })
    })
  }

  static showModal(options) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: options.title || "",
        content: options.content || "",
        showCancel: options.showCancel,
        cancelText: options.cancelText || "取消",
        confirmText: options.confirmText || "确定",
        confirmColor: "#02BB00",
        success: resolve,
        fail: reject
      })
    })
  }

  static setNavigationBarTitle(options) {
    return new Promise((resolve, reject) => {
      wx.setNavigationBarTitle({
        title: options.title || "",
        success: resolve,
        fail: reject
      })
    });

  }

  static saveImageToPhotosAlbum(url) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: url,
        success: resolve,
        fail: reject
      })
    })
  }

  static getImageInfo(url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: resolve,
        fail: reject
      })
    })
  }

  static previewImage(params) {
    return new Promise((resolve, reject) => {
      wx.previewImage({
        urls: params.urls,
        current: params.current ? params.current : '0',
        success: resolve,
        fail: reject
      })
    })
  }

  static setClipboardData(params) {
    return new Promise((resolve, reject) => {
      wx.setClipboardData({
        data: params,
        success: resolve,
        fail: reject
      })
    })
  }

  static navigateToMiniProgram(params) {
    return new Promise((resolve, reject) => {
      wx.navigateToMiniProgram({
        appId: params.appId,
        path: params.path,
        extraData: params.extraData ? params.extraData : {},
        envVersion: params.envVersion ? params.envVersion : 'releas',
        success: resolve,
        fail: reject
      })
    })
  }

  static setTabBarBadge(params) {
    return new Promise((resolve, reject) => {
      wx.setTabBarBadge({
        index: params.index,
        text: params.text,
        success: resolve,
        fail: reject
      })
    })
  }

  static removeTabBarBadge(index) {
    return new Promise((resolve, reject) => {
      wx.removeTabBarBadge({
        index: index,
        success: resolve,
        fail: reject
      })
    })
  }

  static chooseImage(index) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject
      })
    })
  }

  static uploadFile(url, data, campId, i, name) {

    let params = {};
    let phoneInfo = Wechat.getStorageSync("phoneInfo"); // 请求附加phoneInfo 信息
    params.us = Wechat.getStorageSync("us");
    params.isMiniApp = true;
    params.av = getApp().globalData.version;
    params = Object.assign(params, phoneInfo, campId);
    console.log(params)
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        filePath: data[i],
        name: name,
        formData: params,
        header: {
          'content-type': 'multipart/form-data'
        },
        success: resolve,
        fail: reject
      })
    })
  }

  static downloadFile(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: resolve,
        fail: reject
      })
    })
  }
  static requestSubscribeMessage(tmplIds = []) {
    return new Promise((resolve, reject) => {
      wx.requestSubscribeMessage({
        tmplIds: tmplIds,
        success: resolve,
        fail: reject
      })
    })
  }

  static hideTabBar() {
    return new Promise((resolve, reject) => {
      wx.hideTabBar({
        success: resolve,
        fail: reject
      })
    })
  }
}