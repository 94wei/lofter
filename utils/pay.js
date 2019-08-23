function wxpay(app, ArticleID, redirectUrl) {
    console.log(app,ArticleID, redirectUrl,'支付传递的参数');
    wx.request({
    url: 'https://api.pbook.musemore.art/v1/player/unified-order',
    header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('userOpenid')
    },
    data: {
        pid:ArticleID, //作品id
    },
    method:'POST',
    success: function(res){
        wx.requestPayment({
            appId:res.data.data.appId,
            timeStamp:res.data.data.timeStamp,
            nonceStr:res.data.data.nonceStr,
            package:res.data.data.package,
            signType:res.data.data.signType,
            paySign:res.data.data.paySign,
            fail:function () {
              wx.showToast({title: '支付失败'})
            },
            success:function () {
                wx.showToast({title: '支付成功'})
                wx.reLaunch({
                    url: redirectUrl
                });
            }
        })
    },
     fail:function (res) {
         console.log(1);
     }
   
  })
}

module.exports = {
  wxpay: wxpay
}
