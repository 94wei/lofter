// pages/mine/mine.js
const util = require('../../utils/util.js');
const api = require('../../API/api.js');
import create from '../../utils/create'
import store from '../../store/store'
const App = getApp();
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
create(store,{
    data: {
        listCell:[
            // {id:1,title:"我的素材库",isShowRed:true,subTitle:"素材库",type:"ad"},
            // {id:2,title:"校园素材库",isShowRed:true,subTitle:"素材库",type:"ad"},
            // {id:3,title:"邀请好友",isShowRed:true,subTitle:"素材库",type:"ad"},
            // {id:4,title:"绑定机构码",isShowRed:true,subTitle:"素材库",type:"ad"},
            // {id:5,title:"余额",isShowRed:true,subTitle:"素材库",type:"ad"},
            // {id:5,title:"vip到期时间",isShowRed:true,subTitle:"2020-06-05",type:"ad"},
            {id:6,title:"内部工具",isShowRed:true,subTitle:"美术圈使用信息查询",type:"tool"},
        ],
    },
    onLoad: function () {

    },

    onShow:function(){

        this.store.data.userInfo = wx.getStorageSync('userInfo')
    },

    clickCell:function(e){
        console.log(e);
        if(e.currentTarget.dataset.type==='ad'){
            wx.navigateTo({
                url: '/mySub/pages/login/login'
            })
        }else if(e.currentTarget.dataset.type==='tool'){
           if(this.store.data.userInfo.is_vip){
               wx.navigateTo({
                   url: '/mySub/pages/tools/tools'
               })
           }else {
               Toast('无权限')
           }
        }

    },


    clickLogin:function(){
        wx.navigateTo({
            url: '/mySub/pages/login/login'
        })
    },



})
