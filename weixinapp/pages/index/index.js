//index.js
//获取应用实例
const app = getApp()
import drawQrcode from 'weapp-qrcode'
import QR from '../../common/weapp-qrcode'
import Page from '../../common/page';
Page({
  data: {
    now:new Date().toLocaleString(),
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    showfriends: false,
    showvips: false,
    qrcodeURL: '',
    foreground: '#000',
    width: '100vw',
    height: '180',
    text: '本人就餐',
    dot: true,
    friends: '',
    vips: '',
    vipusers:[{org:'',name:''}],
    code: 'http:www.google.com',
    src: 'https://images.shobserver.com/news/690_390/2018/12/24/12645b23-eb9f-4d63-8045-f5d4759a4b6d.jpg'
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.draw()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.draw()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.draw()
        }
      })
    }

  },
  onClose() {
    this.setData({
      showfriends: false,
      showvips: false
    })
  },
  onSetFriends(e) {
    console.log(e)
    this.setData({
      showfriends: false,
      friends: e.currentTarget.dataset.num,
      vips: '',
    })
    this.draw()
  },
  onSetVips(e) {
    console.log(e)
    this.setData({
      vips: e.detail
    })
  },
  onPlus(e) {
    console.log('onPlus',e)
    let array = this.data.vipusers
    array.push({org:array[0].org,name:''})
    //console.log(array)
    this.setData({
      vipusers: array
    })
  },
  onMinus(e) {
    console.log('onMinus', e)
    let array = this.data.vipusers
    array.pop();
    //console.log(array)
    this.setData({
      vipusers: array
    })

  },
  onConfirmVips() {
    this.setData({
      showvips: false,
      friends: '',
    })
    this.draw()
  },
  onChange(e) {
    console.log(e)
    let tag = `vipusers[${e.currentTarget.dataset.idx}].${e.currentTarget.dataset.field}`
    this.setData({
      [tag]:e.detail.value
    })
   
  },
  selfDining() {
    this.setData({
      now: new Date().toLocaleString(),
      foreground: '#000',
      text: '本人就餐',
      dot: true,
      friends: '',
      vips: '',
      code: new Date().toString()
    })
    this.draw()
  },
  familyDining() {
    this.setData({
      now: new Date().toLocaleString(),
      foreground: '#1CA4FC',
      dot: false,
      showfriends: true,
      text: '家属就餐',
      code: new Date().toString()
    })

  },
  vipDining() {
    this.setData({
      now: new Date().toLocaleString(),
      foreground: '#FF6F00',
      dot: false,
      showvips: true,
      friends: '',
      vips: '1',
      text: '陪同人员就餐',
      code: new Date().toString()
    })

  },
  draw: function () {
    // const imgData = QR.drawImg(this.data.code, {
    //   typeNumber: 4,
    //   errorCorrectLevel: 'M',
    //   size: 500
    // })
    // //console.log(imgData)
    // this.setData({ qrcodeURL: imgData })
    // console.log(this.data.userInfo.avatarUrl)
    // const that = this
    drawQrcode({
      width: 220,
      height: 220,
      foreground: this.data.foreground,
      typeNumber:-1,
      canvasId: 'myQrcode',
      text: this.data.code,
      image: {
        imageResource: this.data.userInfo.avatarUrl,
        dx: 50,
        dy: 50,
        dWidth: 40,
        dHeight: 40
      },
      callback: e => {
        //console.log(e)
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 220,
          height: 220,
          canvasId: 'myQrcode',
          success:  res => {
            console.log(res.tempFilePath);
            this.setData({
              qrcodeURL: res.tempFilePath
            })
          }
        })
        }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
