function SEND(url, method, data, success, fail) {
    // console.log(data,url,'util');
    wx.request({
             url: url,
            header: {
               'content-type': 'application/json',
                'openid': wx.getStorageSync('userOpenid')
              },
             method: method,
             data: data,
             success(res) {
                 console.log(data,url,res,'util');
                 success(res);
             },
             fail(res) {
                  fail(res);
                }
       });
    }

 function formatDate(ts) {
    var currentTs = new Date().getTime();
    var diffTs = currentTs - ts;

    //year
    var years = diffTs / (365 * 24 * 3600 * 1000);

    if(years >= 1.0) {
        return Math.ceil(years) + '年前';
    }

    //days
    var days = diffTs / (24 * 3600 * 1000);
    if(days >= 1.0) {
        return Math.ceil(days) + '天前';
    }

    //hours
    var hours = diffTs / (3600 * 1000);
    if(hours >= 1.0) {
        return Math.ceil(hours) + '小时前';
    }

    //minutes
    var minutes = diffTs / (60 * 1000);
    if(minutes >= 1.0 ) {
        return Math.ceil(minutes) + '分钟前';
    }

    return '刚发一会...';

}



module.exports = {
    SEND:SEND,
    formatDate:formatDate
}
