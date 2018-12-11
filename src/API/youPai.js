import Env from './Env';

/**
 * 调用协议，并返回promise
 * @param {*} param0 
 * @param {*} param 
 */

function systemLimit(type) {
    if (Env.isAndroid && type == 'Android') {
        return false;
    } else if (Env.isIos && type == 'IOS') {
        return false;
    } else {
        API.toast('只支持' + type)
        return true;
    }

}

if (typeof window !== "undefined") {
    window.ypApiCache = {};
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
let isDebug = getQueryString('debug') == '1'



let promise = function ({ protocol, cb }, param) {
    if (window.ypApiCache[protocol]) {
        return Promise.resolve(window.ypApiCache[protocol]);
    }
    return new Promise(async res => {
        await new Promise(resolve => {//连续调用api时，若未被缓存，则延迟执行，防止客户端block
            setTimeout(function () {
                resolve();
            }, 200)
        });
        if (!Env.isYouPai) {
            console.log("执行协议：" + protocol)
            console.log("参数：" + param)
            res();
            return;
        }
        let url = protocol + serialize(param);
        location.href = url;
        if (!cb) {
            res();
            return;
        }
        window[cb] = function () {
            window.ypApiCache[protocol] = arguments;
            res(arguments);
        }
    })
}

/**
 * 
 * 序列化参数
 * IOS若无参数，不可在协议后拼接?
 * @param {Object} obj 
 * @returns string
 */
let serialize = function (obj) {
    if (!obj) return '';
    let str = '?';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            str += `${i}=${obj[i]}&`
        }
    }
    return str;
}


let API = {
    //功能接口

    getDeviceId() {
        if (isDebug) {
            return Promise.resolve(getQueryString('deviceId'))
        }
        return promise({
            protocol: "protocol://getDeviceID",
            cb: "setDeviceID"
        }).then(res => {
            return res ? res[0] : null
        })
    },

    /**
      * 获取用户登录信息
      * @returns {object} -{cookie,uid,nick,sface}
      */
    getLoginInfo() {
        if (isDebug) {
            return Promise.resolve({
                cookie: getQueryString('scookie'),
                uid: '1',
                nick: '小debug',
                sface: ''
            })
        }
        return promise({
            protocol: "protocol://setLoginInfo",
            cb: "setLoginInfo"
        }).then(res => {
            //2.4.2版本未登录时返回 {0:"",1:"",2:"",3:"",4:"",5:"0"}
            if (!res || (!res[0] && !res[1])) {
                return false;
            }
            let loginInfo = {
                cookie: res[0] + "|" + res[1],
                uid: res[2],
                nick: res[3],
                sface: res[4]
            }
            return loginInfo;
        })
    },

    /**
     * 获取应用版本号
     * @returns {string}
     */
    getVersion() {
        return promise({
            protocol: "protocol://getVersion",
            cb: 'setVersion'
        }).then(res => {
            return res ? res[0] : null
        })
    },
    /**
     * 
     * 判断是否登录
     * 未登录自动调用登录接口
     * @returns object
     */
    doCheckLogin() {
        return new Promise(async res => {
            let loginInfo = await this.getLoginInfo();
            if (loginInfo) {
                res(loginInfo);
            } else {
                this.jumpLogin();
            }
        })
    },

    /**
     * 播放视频
     * @param {number} id -视频id
     * @param {string} title -视频标题
     * @param {string} videoSrc -视频地址
     * @param {string} pic -预览图地址
     * @param {string} type 视频类型
     */
    doPlayVideo({
        id = "215801",
        title = "陈子豪：艰难的战斗",
        videoSrc = "http://sj.video.5054399.com/sjyx/youpaiyunyingshiping1/czhjndzd.mp4",
        pic = "http://t1.sj.img4399.com:8089/test_ma/ma~1_20150518102327_55594d1f8e44b.jpeg",
        type = "电脑游戏"
    }) {
        return promise({
            protocal: 'protocol://toPlayVideo'
        }, { id, title, videoSrc, pic, type })
    },

    /**
     * 判断是否到达某个版本号
     * @param {string} { android, ios } 
     * @returns {boolean}
     */
    async isRequiredVersion({ android, ios }) {
        if (!Env.isYouPai) return true;
        let version = await this.getVersion();
        let ver = String(version);
        ver = ver.split('.').join("");
        let result;
        if (ver.length <= 3) {
            result = ver.slice(0, 2) + '0' + ver[2];
        } else {
            result = ver.split;
        }
        function normolize(str) {
            return parseInt(str.split('.').join(""));
        }
        if (Env.isIosYoupai) {
            return ver >= normolize(ios);
        } else if (Env.isAndroidYoupai) {
            return ver >= normolize(android);
        } else {
            return true;
        }
    },

    /**
     * toast提示
     * @param {string} -要弹出的文本 
     */
    doToast(msg = "默认信息") {
        if (Env.isAndroidYoupai) {
            window.ClientAPI.onJsToast(msg);
        } else if (Env.isIosYoupai) {
            let dic = { 'handlerInterface': 'Native', 'function': 'onJsToast', 'parameters': { 'msg': msg } };
            window.webkit.messageHandlers['Native'].postMessage(dic);
        } else {

        }
    },

    /**
     * 关闭活动页
     */
    doCloseWebView() {
        return promise({
            protocol: "protocol://toClose"
        })
    },

    /**
     * 调用客户端检查更新功能
     */
    doCheckUpdate() {
        return promise({
            protocol: 'protocol://toCheckver'
        })
    },

    /**
     * 调起客户端分享组件
     * @returns {number} -分享是否成功 0： 失败 , 1： 成功 
     */
    doOpenShare() {
        return promise({
            protocol: 'protocol://toShare',
            cb: 'setShareResult'
        })
    },

    /**
     * 自定义分享参数
     * @param {string} title -分享标题
     * @param {string} content -分享内容
     * @param {string} iconUrl -分享图标地址
     * @param {string} url -分享页地址
     * @returns {number} -分享是否成功 0： 失败 , 1： 成功 
     */
    doCustomShare({ title, content, iconUrl, url }) {
        iconUrl = encodeURI(iconUrl);
        url = encodeURI(url);
        return promise({
            protocol: 'protocol://toCustomShare',
            cb: 'setShareResult'
        }, { title, content, iconUrl, url })
    },

    //跳转接口

    /**
     * 跳转登录
     */
    jumpLogin() {
        return promise({
            protocol: "protocol://toLogin",
            cb: "setLoginInfo"
        })
    },

    /**
     * 跳转热门视频
     * @requires Android
     * @param {string} id 视频id
     * 
     */
    jumpHotVideo({ id = "342" }) {
        if (systemLimit('Android')) return;
        return promise({
            protocol: 'protocol://toVideoCategory'
        }, { id })
    },

    /**
     * 跳转视频集合页
     * @requires IOS
     * @param {string} id  -集合id
     * @param {string} name -集合名称
     */
    jumpVideoCollection({ id = "253", name = "集合名称" }) {
        if (systemLimit('IOS')) return;
        return promise({
            protocol: 'protocol://toVideoCollection'
        }, { id, name })
    },

    /** 
     *跳转上传视频页 
     * @param {string} channel -上传的来源标识字符串   
     */
    jumpUploadVideo({ channel = "huodong" }) {
        return promise({
            protocol: 'protocol://uploadVideo'
        }, { channel })
    },

    /**
     * 跳转到反馈页
     */
    jumpFeedBack() {
        return promise({
            protocol: 'protocol://toFeedback'
        })
    },

    /**
     * 跳转到搜索页
     */
    jumpSearch({ keyword = "默认关键词" }) {
        return promise({
            protocol: 'protocol://search'
        }, { keyword })
    },

    /**
     * 跳转直播页
     */
    jumpOpenLive() {
        return promise({
            protocol: "protocol://toOpenLive"
        })
    },

    /**
     * 跳转到个人主页
     * @param {string | number} id -用户id
     */
    jumpPersonalPage({ id = '0' }) {
        return promise({
            protocol: "protocol://toPersonalPage"
        }, { id })
    },

    /**
     * 跳转游拍直播列表页
     * @param {string | number} id -模块id
     * @param {string} type -模块类型
     * @param {string} name -标题
     */
    jumpLiveList({ id = 1, type = 1, name = "推荐直播" }) {
        return promise({
            protocol: "protocol://toLiveList"
        }, { id, type, name })
    },

    /**
     * 跳转游拍直播列表页
     * @param {string | number} id -模块id
     * @param {string} type -模块类型
     * @param {string} name -标题
     */
    jumpLiveDetail({ id = 1, type = 1, name = "推荐直播" }) {
        return promise({
            protocol: "protocol://toLiveList"
        }, { id, type, name })
    },

    /**
     * 启动摇晃监听
     * @param {number} operate 1：开启 0 关闭 
     */
    doListenShake({ operate = 1 }) {
        return promise({
            protocol: "protocol://toShake",
            cb: "setShake"
        }, { operate })
    },
}

export default API;