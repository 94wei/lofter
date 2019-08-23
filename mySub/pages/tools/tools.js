// mySub/pages/tools/tools.js
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
const UTIL = require('../../../utils/util.js');
const API = require('../../../API/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:'',
      own:'',
      id:'',
      name:'',
      number:1,
      show:false,
      miyao:'',
      title:'',
      schoolList:[],
      showTitle:'',




  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },






    onChange:function(e){

        this.setData({
            value:e.detail
        })

    },
    //秘钥
    onChangemiYao:function(e){
        console.log(e,'e');
        this.setData({
            miyao:e.detail
        })
    },

    onChangenumber:function(e){
        console.log(e,'4444');
        this.setData({
            number:e.detail
        })
    },

    onSearch:function(){
        this.getSchool(this.data.value)

    },

    //验证登录
    getSchool:function(name){
      var that=this
        UTIL.SEND(API.GetSchoolInfo,'POST',{
                name:name,
            },res=>{
            if(res.data.success){
                that.setData({
                    schoolList:res.data.data,
                    showTitle:res.data.data.length>0?'':'没有找到',
                })
            }else {
                Toast(res.data.message)
            }

            },res=>{
                console.log(res,'code失败');
            }
        )
    },

    clickCell:function(e){
        this.setData({
            show: true,
            type:e.currentTarget.dataset.param,
            id:e.currentTarget.dataset.id,
            title:e.currentTarget.dataset.name+'---'+e.currentTarget.dataset.title,

        });

    },

    clickOk:function(){
        var that=this;
      if(that.data.miyao){
          UTIL.SEND(API.GetSchoolAdd,'GET',{
                  id:that.data.id,
                  type:that.data.type,
                  number:that.data.number,
                  text:that.data.miyao,
              },res=>{
                  that.setData({
                      show:false
                  })
                  Toast(res.data.message)
                  this.getSchool(that.data.value)
              },res=>{
                  console.log(res,'code失败');
              }
          )
      }else {
          Toast('请输入秘钥')
      }




    },

    onClose() {
        this.setData({ show: false });
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