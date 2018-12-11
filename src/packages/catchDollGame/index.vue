<template>
    <div class="catchDollGame">
        <div class="num-game">游戏次数<span>{{num_play}}</span></div>
        <div class="num-xiaoyou">娃娃数<span>{{num_doll}}</span></div>
        <div class="machine">
            <div class="claw" :class="[{ success: result }, { catch: catching }, clawPositions[clawIndex]]">
            </div>
            <div class="machine-doll"></div>
            <div class="machine-glass"></div>
        </div>
        <timerBar :status="this.status"></timerBar>
        <div class="machine-box" v-show="status">
            <div class="rocker-box">
                <v-touch
                    v-on:panend="onPanEnd"
                    v-on:panleft="onPanLeft"
                    v-on:panright="onPanRight"
                    class="rocker"
                    :class="{left: rockerStatus === 'left',right: rockerStatus === 'right'}"></v-touch>
            </div>
            <div class="btn-catch" @click="goCatch()"></div>
        </div>
    </div>
</template>
<script>
  import timerBar from './timerBar';
  export default {
    name: 'catchDollGame',
    props: {
        num_play: {//游戏次数
            required: true,
			type: Number
        },
        num_doll: {//抓到的娃娃个数
            required: true,
			type: Number
        },
        result: {
            required: true,
			type: Boolean
        }
    },
    data() {
        return {
            status: false,
            catching: false,
            rockerStatus: 'center',
            clawIndex: 1,
            clawPositions: ['left','center','right']
        }
    },
    created() {
    },
    mounted() {
    },
    components: {timerBar},
    methods: {
        gameBegin() {
            this.status = true
        },
        goAnchor(selector) {
            var anchor = this.$el.querySelector(selector)
            document.body.scrollTop = anchor.offsetTop
        },
        //重置
        resetCatch() {
            var that = this
            setTimeout(function(){
                clearInterval(window.scrollTimer);
                window.scrollTimer=null;
                that.catching = false //爪子升起
                that.status = false //计时器重置
                that.$emit("handleResult"); //返回函数 外部进行处理抽奖结果
            },300)
        },
        //伸爪子抓娃娃
        goCatch() {
            var that = this
            if(!this.catching) {
                this.catching = true
                that.resetCatch()
            }
        },
        //左移摇杆
        onPanLeft() {
            this.rockerStatus = 'left'
        },
        //右移摇杆
        onPanRight() {
            this.rockerStatus = 'right'
        },
        //移动爪子
        onPanEnd(e) {
            var deltaX = e.deltaX;
            this.rockerStatus = 'center'
            if (deltaX > 0) { //往右
                if(this.clawIndex>=0&&this.clawIndex<2) {
                    this.clawIndex++
                }
            } else if (deltaX < 0) {//往左
                if(this.clawIndex>=1) {
                    this.rockerStatus = 'left'
                    window.setInterval(() => {
                        this.rockerStatus = 'center'
                    }, 300);
                    this.clawIndex--
                }
            }
        },
    }
  }
</script>
