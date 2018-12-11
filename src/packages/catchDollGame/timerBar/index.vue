<!-- 倒计时器 -->
<template>
  <div class="timer-bar">
    <p>{{interval}}s</p>
    <div ref="bar" class="bar-vertical">
        <div ref="barMask" class="bar-vertical-mask" :style="{height:nowHeight+'px'}"></div>
    </div>
    <p>0s</p>
  </div>
</template>

<script>
  export default {
    name: 'timerBar',
    props: {
        //倒计时周期
        interval: {
            required: false,
            type: Number,
            default: 15
        },
        //开始|结束状态
        status: {
            required: true
        }
    },
    data() {
      return {
          nowHeight: 0,
          gameData: {
              time: 0
          }
      }
    },
    mounted() {

    },
    computed: {

    },
    watch: {
        status: function(val) {
            if(val) {
                this.timing()
            }else {
                //reset倒计时器
                this.gameData.time = 0
                this.nowHeight = 0
            }
        }
    },
    methods: {
        timing(){
            var that = this;
            let bar = this.$refs.bar;
            let barMask = this.$refs.barMask;
            let perHeight = parseFloat(window.getComputedStyle(bar).height)/15;
            //游戏开始才计时
            window.scrollTimer = window.setInterval(() => {
                //游戏进行
                if(that.status&&that.gameData.time<15) {
                    that.nowHeight = parseFloat(window.getComputedStyle(barMask).height) + perHeight;
                    that.gameData.time++;
                } else if(that.status&&that.gameData.time==15) {//时间到自动结束
                    that.gameData.time = 0
                    that.nowHeight = 0
                    that.$parent.goCatch()
                    clearInterval(window.scrollTimer)
                    window.scrollTimer=null;
                }
            }, 1000);
        }
    }
  }
</script>
