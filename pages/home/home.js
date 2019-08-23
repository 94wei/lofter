// pages/home/home.js
const util = require('../../utils/util.js');
const api = require('../../API/api.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import create from '../../utils/create'
import store from '../../store/store'
const app = getApp()
create(store,{

  /**
   * 页面的初始数据
   */
  data: {
      banners:[],
      page: 0, //分页
      limit: 5, //每页显示的个数
      articleList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.fadeInOut(this,'fadeAni',0)
      this.getBanner();
      this.getKing();
      this.getData(false);
  },



    onPageScroll: function(t) {
        if(t.scrollTop >= 64){
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            app.fadeInOut(this,'fadeAni',1)
        }else{
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#ffffff'
            })
            app.fadeInOut(this,'fadeAni',0)
        }
    },


  //  获取状态
    getData: function ( append) {
      var that = this;
        wx.showLoading({
            "mask": true,
            "title":'加载中'
        })

        util.SEND(api.GetHomeDaily,'POST',{
                user_id:this.store.data.userInfo.admin_id,
                studio_id:this.store.data.userInfo.studio_id,
                user_type:this.store.data.userInfo.user_role,
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
  //  获取广告
    getBanner:function(){
      // 获取广告
        let params = {
            studio_id:this.store.data.userInfo.studio_id,
            user_id:this.store.data.userInfo.admin_id,
            user_type:this.store.data.userInfo.user_role,
            code:this.store.data.userInfo.code_number
        };
        util.SEND(api.GetBanner,'POST',params,res=>{
                this.setData({
                    banners:res.data.data
                })
                // 停止下拉动作
                wx.stopPullDownRefresh();
            },res=>{
                console.log(res,'code失败');
            }
        )
    },

    //获取king

    getKing:function(){
        // 获取广告
        let params = {
            user_id:this.store.data.userInfo.admin_id,
            user_type:this.store.data.userInfo.user_role,
        };

        util.SEND(api.GetKing,'POST',params,res=>{
            this.setData({
                    king:res.data.data
                })
                // 停止下拉动作
                wx.stopPullDownRefresh();
            },res=>{
                console.log(res,'code失败');
            }
        )
    },


  //  新闻点击
  clickImage:function(e){

    wx.navigateTo({
      url: '/homeSub/pages/web/web?url='+encodeURIComponent(e.currentTarget.dataset.url)
    })

  },

    //点击kiong

    clickKing:function(e){
        if(e.currentTarget.dataset.type==="xwzx"){
            wx.navigateTo({
              url: '/homeSub/pages/news/news'
            })
        }else if(e.currentTarget.dataset.type==="hhyj"){
            wx.navigateTo({
                url: '/homeSub/pages/result/result'
            })
        }else if(e.currentTarget.dataset.type==="bmzx"){
            wx.navigateTo({
                url: '/homeSub/pages/schoolHuanJing/schoolHuanJing'
            })
        }

    },


    //预览图片
    tapBanner:function(e){
        console.log(e.currentTarget.dataset);

        var newPic=[]
        e.currentTarget.dataset.pics.forEach((item,index)=>{
            newPic.push(item.url)
        })
        wx.previewImage({
            current: e.currentTarget.dataset.pic,
            urls: newPic
        })

    },


    //跳转动态详情

    clickDailyContent:function(e){
      Toast('下载美术世界APP查看更多')
        // wx.navigateTo({
        //     url: '/homeSub/pages/dailyDetail/dailyDetail?id='+e.currentTarget.dataset.id
        // })
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
      this.getBanner();
      this.getKing();
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