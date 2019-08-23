/**
 * 设置数据缓冲时间
 */
class TimeStorage {

    constructor() {
        this.deepTime = "_deepTime";
    }

    // 存储某一缓冲数据
    putStorage(k, v, t = 0) {
        // 保存数据到缓冲中
        wx.setStorageSync(k, v);
        // 判断是否添加失效时间
        if (t > 0) {
            // 获取当前时间
            let timestamp = Date.parse(new Date());
            // 添加失效时间
            timestamp = timestamp / 1000 + parseInt(t);
            // console.log("添加失效时间");
            // console.log(timestamp);
            // 保存失效时间到缓冲中
            wx.setStorageSync(k + this.deepTime, timestamp.toString());
        }
    }

    // 获取某一缓冲数据
    getStorage(k) {
        // 获取当前时间
        let timeNow = Date.parse(new Date()) / 1000;

        // 获取失效时间
        let loseTime = parseInt(wx.getStorageSync(k + this.deepTime));
        // console.log("获取失效时间");
        // console.log(loseTime);
        // console.log("获取当前时间");
        // console.log(timeNow);
        // 判断失效时间是否已存在
        if (loseTime) {
            // 判断当前时间和失效时间是否过期
            if (loseTime > timeNow) {
                // 获取缓冲的数据
                let res = wx.getStorageSync(k);
                return res ? res : '';
            }else {
                this.removeStorage(k);
                return '';
            }
        }else {
            let res = wx.getStorageSync(k);
            return res ? res : '';
        }
    }

    // 移除某一缓冲数据
    removeStorage(k) {
        // 清除缓冲数据
        wx.removeStorage({key: k});
        // 清除缓冲失效时间
        wx.removeStorage({key: k + this.deepTime});
    }

    // 清除所有缓冲
    clearStorage() {
        wx.clearStorage();
    }
}

export { TimeStorage }
