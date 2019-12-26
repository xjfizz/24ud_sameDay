// pages/goTarget/goTarget.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  // 初始化
  init: function(){
    console.log(app)
    let globalData = app.globalData
    this.setData({
      order: globalData.orderDetail
    })
    this.getMap()
    console.log(this.data.order)

  },

  // 开启导航地图
  getMap: function() {
    const latitude = this.data.order.senderLocation.y
    const longitude = this.data.order.senderLocation.x
    const name = this.data.order.senderAddress
    const address = this.data.order.senderAddress // this.data.order.senderAddress
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})