// mySub/pages/loginDetail/loginDetail.js
const UTIL = require('../../../utils/util.js');
const API = require('../../../API/api.js');
import create from '../../../utils/create'
import store from '../../../store/store'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
create(store,{

  /**
   * 页面的初始数据
   */
  data: {
      actionCode: '',
      sendCode:'发送验证码',
      phone:null,  //手机号
      sms:null,  //验证码

      isChange:false, // 1为手机号 2为激活码
      objectArray: [
          {id:1,name:'学生',type:2},
          {id:3,name:'老师',type:1},
          {id:2,name:'家长',type:3},
      ],
      index: 0,
      buttonText:'登录',
      welcome:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      if(options.scene){
          let scene=decodeURIComponent(options.scene);
          console.log(scene,'接收到的参数');
          //&是我们定义的参数链接方式
          this.setData({
              isShowWhere:scene.split("&")[0],
              invite_id :scene.split("&")[1],
              role:scene.split("&")[2],
              type:options.type||2,
              landing:options.landing||2,
              buttonText:'领取7天免费VIP',
              welcome:true
          })
      }else {
          this.setData({
              type:options.type||2,
              landing:options.landing||2,
              isShowWhere:String(options.share)
          })
      }

  },



    onChange(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            actionCode:event.detail
        })
    },


    //身份选择

    bindPickerChange: function (e) {
        console.log(e,this.data.objectArray[Number(e.detail.value)].type);
        this.setData({
            index: e.detail.value,
            type:this.data.objectArray[Number(e.detail.value)].type,
            typeID:this.data.objectArray[Number(e.detail.value)].id,
        })
    },
    //phonenumber
    onChangePhone(event) {
        // event.detail 为当前输入的值
        this.setData({
            phone:event.detail
        })
    },
    //  SMS

    onChangeSms(event) {
        // event.detail 为当前输入的值
        this.setData({
            sms:event.detail
        })
    },

    sendcode:function () {
        var  that=this;
        UTIL.SEND(API.SendCode,'GET',{
                phone_number:String(that.data.phone)
            },res=>{
                console.log('发送成功');
            },res=>{
                console.log(res,'发送失败');
            }
        )

        var num=(!this.data.phone||this.data.phone.length<11)?0:30;
        var interval=setInterval(()=>{
            num--;
            if(this.data.sms){
                that.setData({
                    sendCode:'重新发送'
                })
                clearInterval(interval);
            }else {
                if(num <= 0){
                    that.setData({
                        sendCode:'重新发送'
                    })
                    clearInterval(interval);
                }else {
                    that.setData({
                        sendCode:num+'s'
                    })
                }
            }

        },1000)
    },

    //切换验证方式
    clickChangeLogin:function(){
      this.setData({
          isChange:!this.data.isChange
      })
    },

    //验证登录
    clickLogin:function(){

      var that=this;
        UTIL.SEND(API.login,'POST',{
            code_number: this.data.actionCode,
            type: this.data.type,
            landing: this.data.landing,
            studio_id:183,
            phone_number:this.data.phone,
            phone_verify_code:this.data.sms,
            invite_id :this.data.invite_id||null ,
            role:this.data.role||null,
            },res=>{
            var arrobj={
                code_number: this.data.actionCode,
                type: this.data.type,
                landing: this.data.landing,
                studio_id:183,
                phone_number:this.data.phone,
                phone_verify_code:this.data.sms,
                invite_id :this.data.invite_id||null ,
                role:this.data.role||null,
            }
            console.log(this.data.invite_id,this.data.role,arrobj,'this.data.invite_id');

            if(res.data.success){
                    that.store.data.userInfo=res.data.data
                    wx.setStorage({
                        key:"userInfo",
                        data:res.data.data
                    })
                    if(that.data.welcome){
                        wx.navigateTo({
                          url: '/mySub/pages/welArt/welArt'
                        })
                    }else {
                        wx.switchTab({
                            url: '/pages/my/my'
                        })
                    }
                }else {
                    Toast(res.data.message)
                }


            },res=>{
                console.log(res,'code失败');
            }
        )
    },


    clickLong:function(){
        wx.setEnableDebug({
            enableDebug: true
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