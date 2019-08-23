// pages/jingyan/jingyan.js
const util = require('../../../utils/util.js');
const api = require('../../../API/api.js');
import create from '../../../utils/create'
import store from '../../../store/store'
create(store,{
  /**
   * 页面的初始数据
   */
  data: {
      page: 0, //分页
      limit: 10, //每页显示的个数
      articleList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.getData(false);
  },

    //获取新闻列表
    getData: function ( append) {
        var that = this;
        wx.showLoading({
            "mask": true,
            "title":'加载中'
        })

        util.SEND(api.GetKingContent,'POST',{
            name:'NewList',
            user_id:this.store.data.userInfo.admin_id,
            studio_id:this.store.data.userInfo.studio_id,
            user_type:this.store.data.userInfo.user_role,
            page: this.data.page,
            limit: this.data.limit
            },res=>{
            console.log(res.data.data.list,"list");
            wx.hideLoading()
                //判断是否存在data 是否显示底部加载更多
                if (res.data.data.list.length===0) {
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
                        articleList: [...that.data.articleList,...res.data.data.list],
                    });
                }else {
                    that.setData({
                        loadingMoreHidden: true,
                        articleList: res.data.data.list,
                    });
                }
                // 停止下拉动作
                wx.stopPullDownRefresh();
            },res=>{
                console.log(res,'作品列表失败');
            }
        )

    },


  //  新闻点击
    clickNews:function(e){
        console.log(e,"xxxx");
        wx.navigateTo({
            url: '/homeSub/pages/web/web?url='+encodeURIComponent(e.currentTarget.dataset.url)
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
      this.setData({
          page: 0
      });
      this.getData(false)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.setData({
          page: this.data.page + 1
      });
      this.getData(true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})