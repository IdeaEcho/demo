import Env from './Env';

let plat = 'A';

plat = Env.isAndroidGameBox ? 'A' :
    Env.isIosGameBox ? 'I' :
        'E';

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
    window.gameBoxAPICache = {};
}

function Exec(funcs, ...params) {
    if (window.gameBoxAPICache[funcName]) {
        return window.gameBoxAPICache[funcName];
    }
    let funcName = funcs[plat];
    let res = funcName();
    window.gameBoxAPICache[funcName] = res;
    return res;
}

// class API {
//     constructor() {

//     }

// }

let API = {
    //获取数据接口
    getLoginInfo() {
        return Exec({
            A: () => login.onLoadUserInfo(),
            I: () => onJsLoadUserInfo(),
            E: () => { }
        })
    },
    getScookie() {
        return Exec({
            A: () => login.onLoadAuthCookie(),
            I: () => onJsLoadCookieForJs(),
            E: () => { }
        })
    },
    getUdid() {
        return Exec({
            A: () => android.getUniqueId(),
            I: () => onJsGetMUDID(),
            E: () => { }
        })
    },
    getDeviceId() {
        return Exec({
            A: () => android.onJsGetDeviceId(),
            I: () => onJsGetDeviceId(),
            E: () => { }
        })
    },
    //功能接口
    doListenPageCallback({ action }) {
        return new Promise(res => {
            window.pageCallbackAction = action;
            Exec({
                A: () => {
                    android.bindEvent('resume', () => {
                        if (window.pageCallbackAction === action) {
                            res();
                        }
                    })
                },
                I: () => {
                    onJsNeedPageCallBack();
                    let TopicApp = {};
                    TopicApp.onJsPageBackCallBack = () => {
                        if (window.pageCallbackAction === action) {
                            res();
                        }
                    };
                },
                E: () => {
                    Promise.resolve('back');
                }
            })
        })
    },
    doCopy({ text, toastText }) {
        return Exec({
            A: () => android.onCopyToClipboard(text, toastText),
            I: () => onJsCopyToClipboard(text, toastText),
            E: () => { }
        })
    },
    doToast({ message }) {
        return Exec({
            A: () => android.onJsToShowToast(message),
            I: () => onJsToast(message),
            E: () => { }
        })
    }
    //跳转接口
}

export default API;