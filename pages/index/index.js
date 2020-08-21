//index.js
//获取应用实例
const app = getApp()
const { wechat } = app.method;
Page({
  data: {
    painting:{},
    url:'',
    isShowDialog: false
  },
  onLoad(){
    this.getPainting();
  },
  onShow(){
    this.setData({
      isShowDialog: false
    })
  },
  getPainting(){
    let painting = {
      canvasId:'canvasDrawer',
      width: 375,
      height: 555,
      views: [
        {
          type: 'image',
          url: 'https://testact.shangbin.org/minAppImg/expert/pic_popup_useup.png',
          top: 0,
          left: 0,
          width: 375,
          height: 150
        },{
          type:'text',
          content: '我通过了课程的全部测试我通过了课程的全部测试我通过了课程的全部测试我通过了课程的全部测试我通过了课程的全部测试',
          color: '#000',
          fontSize: 28,
          width: 536,
          top: 160,
          left: 0,
          lineHeight:35,
          bolder: true,
          breakWord: true,
          MaxLineNumber: 3
        },{
          type: 'rect',
          background: 'rgba(0,0,0,0.4)',
          top:265,
          left: 0,
          width: 375,
          height: 50,
          radius: 16
        },{
          type: 'image',
          url: 'https://testact.shangbin.org/minAppImg/expert/pic_popup_useup.png',
          top: 320,
          left: 0,
          width: 50,
          height: 50,
          isCircle: true
        }
      ]
    };
    this.setData({
      painting
    })
  },
  eventGetImage(e) {
    // wx.hideLoading();
    console.log(e);
    const {
      tempFilePath
    } = e.detail
    this.setData({
      url: tempFilePath
    });
  },
  saveImg() {
    wechat.getSetting().then(res => {
      if (this.isEmptyObj(res.authSetting) || res.authSetting['scope.writePhotosAlbum']) { //没有授权
        this.save();
      } else if (res.authSetting['scope.writePhotosAlbum'] == false) { //授权被拒绝
        this.setData({
          isShowDialog: true
        })
        
      } else { // 其他情况
        this.save();
      }
    })
  },
  isEmptyObj(obj) {
    for (let name in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    return true;
  },
  save() {
    wechat.saveImageToPhotosAlbum(this.data.url).then(re => {
      wechat.showModal({
        content: '保存成功',
        showCancel: false,
        confirmText: '知道了'
      })
    }).catch((err) => {
    })
  },
})
