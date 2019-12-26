// pages/login/login.js
const WXAPI = require('../../wxapi/main')
const { $Message } = require('../../weui/iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      username: '',
      password: '',
      isShowPassword: true,
      isShowPasswordText: 'password'
  },
  // 获取用户输入
  usernameInput: function(e) {
    console.log(e)
    this.setData({
      username: e.detail.detail.value
    })
  },
  // 获取用户输入
  passwordInput: function(e) {
    this.setData({
      password: e.detail.detail.value
    })
  },
  // 登录
  loginSubmit: function(e) {
    // wx.switchTab({
    //   url: '/pages/home/home',
    // })
    const { username, password } = this.data
   console.log(this, e)
    const data = {
      phone: username,
      password: password
    }
    console.log('data', data)
    WXAPI.login(data).then(function(res) {
      console.log(res)
      if(res.code == 200 ) {
        wx.setStorage({
          key: 'userInfo',
          data: res.msg,
        })
        $Message({
          content: '登录成功',
          type: 'success',
          duration: 2
        })
        setTimeout( () => {
          wx.switchTab({
            url: '/pages/home/home',
            success(res) {
            }
          })
        }, 500)
      } else {
        $Message({
          content: res.msg ? res.msg : '账号输入错误',
          type: 'error',
          duration: 2
        })
      }
    })
  },
  // 忘记密码
  forgetPawwword:function() {
    wx.switchTab({
      url: '/pages/home/home',
      success(res) {
      }

    })
  },
  // 密码显示与隐藏
  showOrHide: function(e) {
    const isShowPassword = this.data.isShowPassword
    this.setData({
      isShowPassword: !isShowPassword,
      isShowPasswordText: isShowPassword ? 'text' : 'password'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
