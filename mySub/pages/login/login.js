// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

      role:[
          {id:1,title:'我是老师',type:1,landing:1,share:"oneCode"},
          {id:2,title:'我是学生',type:2,landing:1,share:"two"},
          {id:3,title:'我是家长',type:3,landing:2,share:"onePhone"},
      ]

  },

  /**
   * 生命周期函数--监听页面加载
   */



    clickButton:function(e){
        console.log(e);
        wx.navigateTo({
        url: '/mySub/pages/loginDetail/loginDetail?type='+e.currentTarget.dataset.type+"&landing="+e.currentTarget.dataset.landing+"&share="+e.currentTarget.dataset.share
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