/**
 * 这是一个插入代码格式的全局mixin
 */
import prism from "prismjs";
import './hl.css';

var mixin = {
    data() {
        return {
            html: "",
        }
    },
    created() {
        this.code && (this.html = prism.highlight(this.code, prism.languages.markup))
    }
}

export default mixin;