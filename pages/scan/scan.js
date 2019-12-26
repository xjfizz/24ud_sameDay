// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfo:{},
    state: 0,
    orderList:[
    ],
    subList:[
    ],// 订单提交的结果
    input_value: ''
  },
  // 获取输入框值
  search_function: function (e) {
    var value = e.detail.value;
    console.log("------->" + value);
    this.setData({
      input_value: value,
      subList: []
    })
    this.pushList(value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      baseInfo: JSON.parse(options.params)
    })
    this.init()
  },
  // 初始化
  init: function() {
    this.setData({
      state: this.data.baseInfo.state,
      title: this.data.baseInfo.title,
    })
    wx.setNavigationBarTitle({
      title: this.data.baseInfo.title
    })
  },
  // 扫码
  scan: function(e) {
    const that = this
    wx.scanCode({
      success(res) {
        console.log('扫码', res, this,that)
        let orderId = res.result
        that.pushList(orderId)
      }
    })
  },
  // 扫码入列表
  pushList: function (orderId) {
    if(!orderId) {
      return  wx.showToast({
        title: '请重新扫描',
        icon: 'error',
        duration: 1000
      })
    }
    let list = this.data.orderList
    let isArrive = list.some(item => {
      return item.id == orderId
    })
    console.log('是否存在', isArrive)
    if (!isArrive) {
      list.push({ id: orderId, stateText: '待提交' })
      this.setData({
        orderList: list
      })
      wx.showToast({
        title: '扫码成功',
        icon: 'success',
        duration: 1000
      })
      this.setData({
        input_value: ''
      })
    } else {
      wx.showToast({
        title: '订单已存在',
        icon: 'success',
        duration: 1000
      })
      this.setData({
        input_value: ''
      })
    }
  },
  // 删除列表项
  delOrder: function(e) {
    console.log(e)
    let order = e.currentTarget.dataset.item
    let list = this.data.orderList
    list.forEach((item,index) => {
      if(item.id == order.id) {
        list.splice(index,1)
      }
    })
    this.setData({
      orderList:list
    })
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
  },
  // 提交订单
  submit: function(e) {
    let list = this.data.orderList.map(item => {
      return {id: item.id, stateText: '成功' }
    })
    this.setData({
      subList:list,
      orderList: []
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
