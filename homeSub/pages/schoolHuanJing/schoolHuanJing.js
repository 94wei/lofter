// homeSub/pages/schoolHuanJing/schoolHuanJing.js
const util = require('../../../utils/util.js');
const api = require('../../../API/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type: 10, //分类id
      page: 0, //分页
      limit: 10, //每页显示的个数
      articleList: [],
      active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.getMenu();
  },


    //  点击图片
    tapBanner:function(e){
        console.log(e,"jjjjj");

        var newPic=[]
        this.data.articleList.forEach((item,index)=>{
            newPic.push(item.pic_url)
        })

        wx.previewImage({
            current: e.currentTarget.dataset.pic,
            urls: newPic
        })

    },
    //获取分类
    getMenu:function(){
        // 获取广告
        let params = {
            name:'SchoolPic',
            type:10,
            user_id:2068,
            user_type:'teacher',
            studio_id:43,
        };
        util.SEND(api.GetKingContent,'POST',params,res=>{
            console.log(res);

            this.setData({
                menu:res.data.data.type,
                articleList:res.data.data.list,
            })

            // 停止下拉动作
                wx.stopPullDownRefresh();
            },res=>{
                console.log(res,'code失败');
            }
        )
    },




  //  点击分类

    tabClick:function(event) {
        console.log(this.data.menu[event.detail.index].id);

        this.setData({
            type: this.data.menu[event.detail.index].id,
            page: 0,
        });
        this.getSchoolPicList(this.data.type,false);

    },



    //  获取图片列表
    getSchoolPicList: function (categoryId, append) {
        var that = this;
        wx.showLoading({
            "mask": true,
            "title":'加载中'
        })
        if (categoryId === 10) {
            categoryId = 10;
        }
        util.SEND(api.GetSchoolMenu,'POST',{
                type:categoryId,
                user_id:2068,
                user_type:'teacher',
                studio_id:43,
                page: this.data.page,
                limit: this.data.limit
            },res=>{
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
                    });
                }else {
                    that.setData({
                        loadingMoreHidden: true,
                        articleList: res.data.data,
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
      this.setData({
          page: 0
      });
      this.getSchoolPicList(this.data.type,false)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

      this.setData({
          page: this.data.page + 1
      });
      this.getSchoolPicList(this.data.type, true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})