class Env {
    constructor() {
        if (typeof window == 'undefined') return;
        this.href = location.href;
        this.testReg = /\/test\//i;
        this.otReg = /\/ot\//i;
        this.ua = navigator.userAgent;
        this.isAndroid = (/android/gi).test(this.ua);
        this.isIos = this.ua.match(/(iPad|iPhone|iPod)[^;]*;.+OS\s([\d_\.]+)/);
        this.isGameBox = /4399GameCenter/gi.test(this.ua);
        this.isYouPai = /4399YouPai/gi.test(this.ua);
        this.isIosGameBox = this.isIos && this.isGameBox;
        this.isAndroidGameBox = this.isAndroid && this.isGameBox;
        this.isIosYoupai = this.isIos && this.isYouPai;
        this.isAndroidYoupai = this.isAndroid && this.isYouPai;
        this.isWexin = this.ua.match(/MicroMessenger/i) === "micromessenger",
            this.isTest = this.testReg.test(this.href) || this.href.indexOf('localhost') > -1 || this.href.indexOf('192.168') > -1;
        this.isOt = this.otReg.test(this.href);
        this.isOnline = !this.isTest && !this.isOt;
        this.isOuterShare = !this.isGameBox && !this.isYouPai;
    }
}
let env = new Env();
export default env;