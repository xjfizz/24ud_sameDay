Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/images/tabBar/home@2x.png",
      selectedIconPath: "/images/tabBar/home_selected@2x.png",
      text: "首页"
    }, {
      pagePath: "/pages/my/my",
        iconPath: "/images/tabBar/my@2x.png",
        selectedIconPath: "/images/tabBar/my_selected@2x.png",
      text: "我的"
    }],
    list_left: [{
      pagePath: "/pages/home/home",
      iconPath: "/images/tabBar/home@2x.png",
      selectedIconPath: "/images/tabBar/home_selected@2x.png",
      text: "首页"
    }],
    list_right: [{
      pagePath: "/pages/my/my",
      iconPath: "/images/tabBar/my@2x.png",
      selectedIconPath: "/images/tabBar/my_selected@2x.png",
      text: "我的"
    }],
    sannerState: false,
    item: {
      index: 0,
      msg: '测试',
      time: '2019'
    },
    scanModal: true
  },
  attached() {
    console.log('attached')
  },
  ready() {
    console.log('ready')
    this.setData({
      scanModal: true
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    },
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
      const scanModal = this.data.scanModal
      //打开弹出框
      this.setData({
        scanModal: !scanModal
      })
    },
    // 跳转扫描界面
    goScanPage: function(e) {
      let state  = Number(e.currentTarget.dataset.item)
      let title  = ''
      console.log(e)
      switch (state) {
        case 3:
          title = '收件扫描'
          break;
        case 4:
          title = '发件扫描'
          break;
        case 8:
          title = '领件扫描'
          break;
        case 9:
          title = '签收扫描'
          break;
        case 10:
          title = '问题件扫描'
          break;
      }
      let params = {
        state: state,
        title: title
      }
      wx.navigateTo({
        url: `/pages/scan/scan?params=${JSON.stringify(params)}`
      })
    },
  }
})
