//index.js
//获取应用实例
const util = require('../../utils/util.js');
var api = require('../../API/api.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
var app = getApp();
Page({
  data: {
      banners:[],
      iconList: [{
          icon: 'cardboardfill',
          color: 'red',
          badge: 0,
          name: '未知'
      }, {
          icon: 'recordfill',
          color: 'orange',
          badge: 0,
          name: '未知'
      }, {
          icon: 'picfill',
          color: 'yellow',
          badge: 0,
          name: '未知'
      }, {
          icon: 'noticefill',
          color: 'olive',
          badge: 0,
          name: '未知'
      }, {
          icon: 'upstagefill',
          color: 'cyan',
          badge: 0,
          name: '未知'
      }, {
          icon: 'clothesfill',
          color: 'blue',
          badge: 0,
          name: '未知'
      }, {
          icon: 'discoverfill',
          color: 'purple',
          badge: 0,
          name: '未知'
      }, {
          icon: 'questionfill',
          color: 'mauve',
          badge: 0,
          name: '未知'
      }, {
          icon: 'commandfill',
          color: 'purple',
          badge: 0,
          name: '未知'
      }, {
          icon: 'brandfill',
          color: 'mauve',
          badge: 0,
          name: '未知'
      }],
  },




    onLoad: function (option) {

this.getBanner()

    },

    //  获取广告

    getBanner:function(){
        // 获取广告
        let params = {
            user_id:3262,
            user_type:'teacher',
            studio_id:183,
            code:'artworld'
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




})
