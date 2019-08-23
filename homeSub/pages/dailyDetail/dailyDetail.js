// homeSub/pages/dailyDetail/dailyDetail.js
const util = require('../../../utils/util.js');
const api = require('../../../API/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page: 0, //分页
      limit: 10, //每页显示的个数
      articleList:[],
      dailyDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options,'oooo');
      this.setData({
          id:options.id
      })
      this.getData(false,options.id)
  },

    //  获取状态
    getData: function ( append,id) {
        var that = this;
        wx.showLoading({
            "mask": true,
            "title":'加载中'
        })

        util.SEND(api.GetDailyDetail,'POST',{
                id:id,
                user_id:2068,
                studio_id:43,
                user_type:'teacher',
                page: this.data.page,
                limit: this.data.limit
            },res=>{
                console.log(res.data,"list");
                wx.hideLoading()
                //判断是否存在data 是否显示底部加载更多
                if (res.data.data.length===0) {
                    let newData = { loadingMoreHidden: false }
                    if (!append) {
                        newData.articleList = []
                    }
                    that.setData(newData);
                    return
                }

                //上拉加载触发
                if (append) {
                    that.setData({
                        loadingMoreHidden: true,
                        articleList: [...that.data.articleList,...res.data.data],
                        dailyDetail:res.data.data.daily
                    });
                }else {
                    that.setData({
                        loadingMoreHidden: true,
                        articleList: res.data.data,
                        dailyDetail:res.data.data.daily
                    });
                }
                // 停止下拉动作
                wx.stopPullDownRefresh();
            },res=>{
                console.log(res,'作品列表失败');
            }
        )

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