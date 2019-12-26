// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signIndex:0,
    questionIndex:0,
    signerList: ['自己签收', '他人代签', '其它'], // 签收人列表
    questionList:['异常件1','异常件2', '异常件3'],
    textMsg: '',
    files: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })

  },
  // 签收人选择
  signerSelect: function (e) {
    this.setData({
      signIndex: e.detail.value
    })
  },
  // 问题件选择
  questSelect: function (e) {
    this.setData({
      questionIndex: e.detail.value
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log('res', res)
        that.setData({
          files: that.data.files.concat({url: res.tempFilePaths[0]})
        });
      }
    })
  },
  // 删除方法
  delate: function(e) {
    console.log('删除',e, this.data.files)
    let j = e.detail.index
    let list = this.data.files
    list.splice(j,1);
    console.log(list);
    this.setData({
      files: list
    })
  },
  previewImage: function(e){
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    this.setData({
      files: this.data.files.concat({url: files.tempFilePaths[0]} )
    });
    console.log('files', this.data.files )
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('some error')
      }, 1000)
    })
  },
  // uploadError(e) {
  //   console.log('upload error', e.detail)
  // },
  // uploadSuccess(e) {
  //   console.log('upload success', e.detail)
  // },

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
