// pages/home/home.js
const WXAPI = require('../../wxapi/main')
const { $Toast } = require('../../weui/iview/base/index');
const { $Message } = require('../../weui/iview/base/index');
const common = require('../../utils/config')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    waitPickList:[{}],
    PickedList:[{}],
    sendList:[{paymentType: '1'},{paymentType: '2'}],
    signedList:[{}],
    list: [],
    page: 0,
    state: 2,
    userInfo: {},
    totalCount: {
      waitPickCount: 0,
      PickedCount: 0,
      sendCount: 0,
      signedCount: 0,
    },
    location:{},
    scanModal: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad', options)
  },
  // 初始化
  init: function () {
    console.log('init', this)
    this.getUserInfo()
    this.getAddress()
    this.setData({
      scanModal: app.globalData.scanModal
    })
  },
  
  // 获取用户信息
  getUserInfo: function() {
    console.log(this)
    const that = this
    wx.getStorage({
      key: 'userInfo',
      success: (res)=> {
        console.log(res, this, that)
        this.setData({
          userInfo: res.data
        })
        this.getAllList()
      },
    })
  },

  // 初始化获取所有列表
  getAllList: function() {
    this.getWaitPickList()
    this.getPickedList()
    this.getSendList()
    this.getSignedList()
    setTimeout( () =>{
      this.setData({
        state: 2,
        page: 0,
        list: []
      })
      this.getList()
    },500)
  },

  // 获取列表
  getList: function() {
    console.log('getList', this, this.data)
    const { state } = this.data
    switch (state) {
      case 2:
        this.getWaitPickList()
        break;
      case 3:
        this.getPickedList()
        break;
      case 8:
        this.getSendList()
        break;
      case 9:
        this.getSignedList()
        break
    }
  },

  // 获取取件列表
  getWaitPickList: function() {
    console.log('getList', this, this.data)
    const {  userInfo, page } = this.data
    let params = {
        state: 2,
        category: '1',
        pickerId: userInfo.id,
        page: page
    }
    WXAPI.getSignList(params).then( res => {
      console.log(res)
      if(res){
        let countName = 'totalCount.waitPickCount'
        this.setData({
          list: this.data.list.concat(res.data),
          waitPickList: this.data.list.concat(res.data),
          [countName]: res.header['X-TotalCount'],
        })
      }
    })
  }, 

  // 获取已取件列表
  getPickedList: function() {
    console.log('getList', this, this.data)
    const {  userInfo, page } = this.data
    let params = {
      state: 3,
      category: '1',
      pickerId: userInfo.id,
      page: page
    }
    WXAPI.getSignList(params).then( res => {
      console.log(res)
      if(res){
        let countName = 'totalCount.PickedCount'
        this.setData({
          list: this.data.list.concat(res.data),
          PickedList  : this.data.list.concat(res.data),
          [countName]: res.header['X-TotalCount'],
        })
      }
    })
  },

  // 获取派件列表
  getSendList: function() {
    console.log('getList', this, this.data)
    const {  userInfo, page } = this.data
    let params = {
      state: 8,
      category: '1',
      deliverId: userInfo.id,
      page: page
    }
    WXAPI.getSignList(params).then( res => {
      console.log(res)
      if(res){
        let countName = 'totalCount.sendCount'
        this.setData({
          list: this.data.list.concat(res.data),
          sendList: this.data.list.concat(res.data),
          [countName]: res.header['X-TotalCount'],
        })
      }
    })
  },

  // 获取签收列表
  getSignedList: function() {
    console.log('getList', this, this.data)
    const {  userInfo, page } = this.data
    let params = {
      state: 9,
      category: '1',
      deliverId: userInfo.id,
      page: page
    }
    WXAPI.getSignList(params).then( res => {
      console.log(res)
      if(res){
        let countName = 'totalCount.signedCount'
        this.setData({
          list: this.data.list.concat(res.data),
          signedList: this.data.list.concat(res.data),
          [countName]: res.header['X-TotalCount'],
        })
      }
    })
  },

  // 滑动列表列表
  bindChange: function(e) {
    console.log(e)
    const that = this;
    const data = e.detail
    let state = 2
    switch (data.current) {
      case 0:
        state = 2
        break;
      case 1:
        state = 3
        break;
      case 2:
        state = 8
        break;
      case 3:
        state = 9
        break
    }
    that.setData({
      currentData: data.current,
      state: state,
      page: 0,
      list: []
    })
    this.getList()
  },

  // 切换列表
  checkCurrent: function(e) {
    console.log(e)
    const that = this;
    const data = e.target.dataset
    let state = 2
    if(that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      switch (data.current) {
        case 0:
          state = 2
          break;
        case 1:
          state = 3
          break;
        case 2:
          state = 8
          break;
        case 3:
          state = 9
          break
      }
      that.setData({
        currentData: data.current,
      })
    }
  },

  // 拨打电话
  playPhone: function(e) {
    console.log(e)
    const {senderTel} = e.currentTarget.dataset.item
    wx.makePhoneCall({
      phoneNumber: senderTel,
    })
  },

  // 获取微信定位
  getAddress: function () {
    wx.getLocation({
      type: 'wgs84',
      // altitude: true,
      // isHighAccuracy: true,
      success: res => {
        debugger
        console.log('位置', res)
        this.setData({
          location:{
            lat: res.latitude || 0,
            lng: res.longitude || 0
          }
        })
      }
    })
  },

  // 取件
  pickGoods: function(e) {
    wx.navigateTo({
      url: '../sign/sign'
    })
    let order = e.currentTarget.dataset.order
    console.log(e, this.data.location, order)
    if (!this.data.location.lat || !this.data.location.lng) {
      console.log('fail')
      $Toast({
        content: '获取位置信息失败',
        type: 'error',
        mask: false
      });
      return
    }
    console.log('success')
    let end;
    if (order.state === 2) {
      end = {
        lat: order.senderLocation.y,
        lng: order.senderLocation.x
      };
    } else if (order.state === 8) {
      end = {
        lat: order.receiverLocation.y,
        lng: order.receiverLocation.x
      };
    }
    let distance = this.getDistance(this.data.location.lat, this.data.location.lng, end.lat, end.lng);
    console.log('distance', distance)
    if (distance > 5000) { // 测试环境设置距离5000米，正式环境500米
      if (order.state === 2) {
        $Toast({
          content: '未到达取件点',
          type: 'error',
          mask: false
        });
      } else if (order.state === 8) {
        $Toast({
          content: '未到达签收点',
          type: 'error',
          mask: false
        });
      }
      return;
    } else {
      if (order.state === 2) {
       // 跳转取件页面
        $Message({
          content: '跳转取件页面',
          type: 'success',
          duration: 2
        })
      } else if (order.state === 8) {
        wx.navigateTo({
          url: '../sign/sign'
        })
        // // 跳转签收页面
        // $Message({
        //   content: '跳转签收页面',
        //   type: 'success',
        //   duration: 2
        // })
      }
    }

  },

  // 计算两个坐标距离
  getDistance: function(lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    let rad1 = lat1 * Math.PI / 180.0;
    let rad2 = lat2 * Math.PI / 180.0;
    let a = rad1 - rad2;
    let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let r = 6378137;
    let distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

    return distance;
  },

  // 前往导航页面
  goTarget: function(e) {
    console.log(e)
    console.log(common);
    let order = e.currentTarget.dataset.order
    console.log(order)
    const latitude =31.3020082185;// order.senderLocation.y
    const longitude = 120.6411832239 // order.senderLocation.x
    const name = '江苏省苏州市姑苏区钟楼西路' // order.senderAddress
    const address = '江苏省苏州市姑苏区钟楼西路' // order.senderAddress // this.data.order.senderAddress
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: function(res) {
        wx.openLocation({
          latitude,
          longitude,
          name,
          address
        })
      },
    })
    // 跳转-设置-全局变量orderDetail存储订单信息


    // app.globalData.orderDetail = order
    // wx.navigateTo({
    //   url: '../goTarget/goTarget'
    // })
  },
  // 前往订单详情
  goOrderDetail: function(e) {
    console.log(e)
    let order = e.currentTarget.dataset.item
    let id = JSON.stringify(order.id)
    wx.navigateTo({
      url: `../orderDetail/orderDetail?id=${id}`
    })
  },
  /**
   * 开始扫描
   *
   */
  // 开始扫描
  startScanner: function(e) {
    console.log(e)
    this.footAddtell();
  },
  /**
   * 弹出模态框
   *
   * */
  footAddtell: function() {
    console.log('111111')
    app.globalData.scanModal = !app.globalData.scanModal
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow', this)
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  }
})
