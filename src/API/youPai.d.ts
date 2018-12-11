interface loginInfo {
    cookie: string;
    uid: string;
    nick: string;
    sface: string;
}


interface videoInfo {
    id: string,
    title: string,
    videoSrc: string,
    pic: string,
    type: string
}
interface youPai {
    /**
     * 获取设备id
     * @returns 设备id
     */
    getDeviceId(): string;
    /**
     * 获取登录信息
     * @returns -{cookie,uid,nick,sface}
     */
    getLoginInfo(): loginInfo;
    /**
     * 获取应用版本号
     * @returns 应用版本号
     */
    getVersion(): string;

    /**
     * 获取登录信息
     * 未登录跳转登录
     * @returns  -{cookie,uid,nick,sface}
     */
    doCheckLogin(): void | loginInfo;

    /**
     * 播放视频
     * @param {number} id -视频id
     * @param {string} title -视频标题
     * @param {string} videoSrc -视频地址
     * @param {string} pic -预览图地址
     * @param {string} type 视频类型
     */
    doPlayVideo({ id, title, videoSrc, pic, type }: videoInfo): void
    
    /**
     * 判断是否到达某个版本号
     * @param {string} { android：要比较的安卓4位版本号, ios：要比较的ios版本号 } 
     * @returns {boolean} 是否到达传入版本号
     */
    isRequiredVersion({ android: string, ios: string }): Promise<boolean>

    /**
     * toast提示
     * @param {string} -要弹出的文本 
     */
    doToast(message:string): void;
    
    /**
     * 关闭活动页
     */
    doCloseWebView(): void;

    /**
     * 调用客户端检查更新功能
     */
    doCheckUpdate(): void;

     /**
     * 调起客户端分享组件
     * @returns {number} -分享是否成功 0： 失败 , 1： 成功 
     */
    doOpenShare(): Promise<number>;

    /**
     * 自定义分享参数
     * @param {string} title -分享标题
     * @param {string} content -分享内容
     * @param {string} iconUrl -分享图标地址
     * @param {string} url -分享页地址
     * @returns {number} -分享是否成功 0： 失败 , 1： 成功 
     */
    doCustomShare({ title: string, content: string, iconUrl: string, url: string }): Promise<number>;
    
    /**
     * 跳转登录
     */
    jumpLogin(): void;

     /**
     * 跳转热门视频
     * @requires Android
     * @param {string} id 视频id
     */
    jumpHotVideo({ id: string }): void;
    
    /**
     * 跳转视频集合页
     * @requires IOS
     * @param {string} id  -集合id
     * @param {string} name -集合名称
     */
    jumpVideoCollection({ id: string, name: string }): void;

    /** 
     *跳转上传视频页 
     * @param {string} channel -上传的来源标识字符串   
     */
    jumpUploadVideo({ channel: string }): void;
    
    /**
     * 跳转到反馈页
     */
    jumpFeedBack(): void;

    /**
     * 跳转到搜索页
     */
    jumpSearch({ keyword: string }): void;
    
    /**
     * 跳转直播页
     */
    jumpOpenLive(): void;

    /**
     * 跳转到个人主页
     * @param {string | number} id -用户id
     */
    jumpPersonalPage({ id: string }) 
    
    /**
     * 跳转游拍直播列表页
     * @param {string | number} id -模块id
     * @param {string} type -模块类型
     * @param {string} name -标题
     */
    jumpLiveList({ id: string, type: string, name: string }): void;

    /**
     * 启动摇晃监听
     * @param {number} operate 1：开启 0 关闭 
     */
    doListenShake({ operate }): Promise<number>

}
export = youPai;