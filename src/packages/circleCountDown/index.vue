<!-- 倒计时器 -->
<template>
<div class="timer-bar">
	<div :class="['bar--circle',
  {'start':status},
  {'paused':paused}]">
		<div class="circle"></div>
		<div class="left">
			<div class="circle__left"></div>
		</div>
		<div class="right">
			<div class="circle__right"></div>
		</div>
		<div ref="bar" class="num">{{gameData.time}}</div>
	</div>
</div>
</template>

<script>
import {
	mapGetters,
	mapActions,
	mapMutations
} from 'vuex';
export default {
	name: 'timerBar',
	props: {
		//倒计时周期
		interval: {
			required: false,
			type: Number,
			default: 3
		},
		//开始|结束状态
		status: {
			required: true,
			default: false
		},
		paused: {
			required: false,
			default: false
		}
	},
	data() {
		return {
			usedtime: 0,
			gameData: {
				time: this.interval
			}
		}
	},
	created() {},
	mounted() {
	},
	computed: {},
	watch: {
		status: function(val) {
			this.paused = false
			this.gameData.time = this.interval
			clearInterval(window.scrollTimer)
			window.scrollTimer = null;
			clearInterval(window.scoreTimer)
			window.scoreTimer = null;
			if (val) {
				this.timing()
			}
		}
	},
	methods: {
		timing() {
			var that = this;
			this.usedtime = 0
			// that.UPDATE_USEDTIME(0)
			//游戏秒数计时
			window.scrollTimer = window.setInterval(() => {
				that.gameData.time -= 1
				if (that.gameData.time == 0) {
					// that.paused = true
					clearInterval(window.scrollTimer)
					window.scrollTimer = null;
					clearInterval(window.scoreTimer)
					window.scoreTimer = null;
					that.$emit("callback"); //返回函数 外部进行处理
				}
			}, 1000);
			var startTime = new Date().getTime();
			//游戏得分毫秒计时
			window.scoreTimer = window.setInterval(() => {
				that.usedtime = that.usedtime + 10
				// that.UPDATE_USEDTIME(that.usedtime+100)
			}, 10);
		}
	}
}
</script>
<style lang="scss" scoped>
@function rem($px) {
    @return $px/20/2+rem;
}
.timer-bar {
    position: relative;
}
.bar--circle {
    position: relative;
    height: 200px;
    width: 200px;
    border-radius: 100%;
    .num {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 50px;
        font-weight: bold;
        transform: translate(-50%,-50%);
    }
    .circle {
        position: relative;
        height: 200px;
        width: 200px;
        border: 12px solid #000;
        border-radius: 50%;
    }
    .right {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 200px;
        overflow: hidden;
        .circle__right {
            position: absolute;
            top: 0;
            right: 0;
            height: 200px;
            width: 200px;
            border: 12px solid transparent;
            border-top: 12px solid #bfd1ff;
            border-right: 12px solid #bfd1ff;
						border-radius: 50%;
            transform: rotate(-135deg);
        }
    }
    .left {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 200px;
        overflow: hidden;
        .circle__left {
            position: absolute;
            top: 0;
            left: 0;
            height: 200px;
            width: 200px;
            border: 12px solid transparent;
            border-left: 12px solid #bfd1ff;
            border-bottom: 12px solid #bfd1ff;
            border-radius: 50%;
            transform: rotate(-135deg);
        }
    }
    &.start {
        .circle__right {
            animation: circle__right 3s linear infinite;
        }
        .circle__left {
            animation: circle__left 3s linear infinite;
        }
    }
    &.paused {
        .circle__left,
        .circle__right {
            animation-play-state: paused;
        }
    }
}

@keyframes circle__right {
    50% {
        transform: rotate(45deg);
    }
    100% {
        transform: rotate(45deg);
    }
}
@keyframes circle__left {
    50% {
        transform: rotate(-135deg);
    }
    100% {
        transform: rotate(45deg);
    }
}
</style>
