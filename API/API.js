

const ApiRootJbj = 'https://api.teacher.meishuquanyunxiao.com';

//顶级域名API
const TopDomain = 'https://api.meishuquanyunxiao.com';


module.exports = {
    login:ApiRootJbj + '/v2/admin/login-test', //登录
    SendCode:ApiRootJbj + '/v2/admin/send-phone-verify-code', //发送验证码
    GetUserInfo:ApiRootJbj + '/v2/share/get-info', //获取用户信息


    GetKing:TopDomain + '/v1/news/get-name', //获取首页8个金刚位的名字信息
    GetKingContent:TopDomain + '/v1/news/get-list', //获取8个金刚位置对应的数据内容
    GetBanner:TopDomain + '/v1/news/get-banner/', //获取首页banner

    GetSchoolMenu:TopDomain + '/v1/news/post-school-pic', //获取校园环境分类图片
    GetHomeDaily:TopDomain + '/v1/news/get-daily', //首页状态列表
    GetDailyDetail:TopDomain + '/v1/news/get-daily-comment', //状态详情
    GetSchoolInfo:ApiRootJbj + '/v2/for-friend/list', //获取学校
    GetSchoolAdd:ApiRootJbj + '/v2/for-friend/add-num', //添加激活码
    GetVipAdd:ApiRootJbj + '/v2/ebook/get-ebooks', //VIP介绍页

};