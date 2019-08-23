//app.js
const util = require('/utils/util.js');
const API = require('/API/api.js');
App({


        onLaunch: function (option) {
            var that = this;
            // this.login();
            that.updataApp()


            wx.getSystemInfo({
                success: function(res) {
                    that.globalData.StatusBar = res.statusBarHeight;
                    let custom = wx.getMenuButtonBoundingClientRect();
                    that.globalData.Custom = custom;
                    that.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;

                    if (res.model.search("iPhone X") != -1) {
                        that.globalData.iphone = true;
                    }
                    if (res.model.search("MI 8") != -1) {
                        that.globalData.iphone = true;
                    }
                }
            });

        },

        login:function(){
                wx.login({
                  success: res => {
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                      util.SEND(API.login,'GET',{
                              code: res.code
                          },res=>{
                          console.log(res.data.data.openid,'opid');
                          this.globalData.openId =  res.data.data.openid;
                          wx.setStorageSync('userOpenid', res.data.data.openid)
                              if(this.tokenReadyCallback){
                                this.tokenReadyCallback(res.data.data.openid)
                              }
                          },res=>{
                              console.log(res,'code失败');
                          }
                      )

                  }
                })

        },

         updataApp: function () {//版本更新
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                if (res.hasUpdate) { // 请求完新版本信息的回调
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        wx.showModal({// 新的版本下载失败
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        })
                    })
                }
            })
        } else {
            wx.showModal({// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },

    fadeInOut:function(that,param,opacity){
        var animation = wx.createAnimation({
            //持续时间800ms
            duration: 200,
            timingFunction: 'ease',
        })


        animation.opacity(opacity).step()

        var json = '{"' + param + '":""}'
        json = JSON.parse(json);
        json[param] = animation.export()
        that.setData(json)
    },

    globalData: {
            openId:null,
            userInfo:null,
        }
})