<!-- 倒计时器 -->
<template>
  <div class="timer-bar">
  	<div class="bar--circle" :class="[{'restart':status},{'pause':pause}]">
  		<div class="circle"></div>
  		<div class="left">
  			<div class="circle_left" :class="interval==2 ? 'time2' : ''"></div>
  		</div>
  		<div class="right">
  			<div class="circle_right" :class="interval==2 ? 'time2' : ''"></div>
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
		}
	},
	data() {
		return {
			pause: false,
      usedtime: 0,
			gameData: {
				time: this.interval
			}
		}
	},
	created() {},
	mounted() {
		this.timing()
	},
	computed: {
	},
	watch: {
		status: function(val) {
			this.pause = false
			this.gameData.time = this.interval
			clearInterval(window.scrollTimer)
			window.scrollTimer = null;
			clearInterval(window.scoreTimer)
			window.scoreTimer = null;
			this.timing()
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
				// console.log(that.gameData.time);
				if (that.gameData.time == 0) {
					// that.pause= true
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
        that.usedtime = that.usedtime+100
				// that.UPDATE_USEDTIME(that.usedtime+100)
			}, 100);
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
		border:12px solid #000;
		border-radius: 100%;
	}
	.right {
		position: absolute;
		top:0;
		right: 0;
    width: 100px;
    height: 200px;
		overflow: hidden;
		.circle_right {
			position: absolute;
			top:0;
			right: 0;
      height: 200px;
      width: 200px;
			border:12px solid transparent;
			border-radius: 100%;
			border-top:12px solid #bfd1ff;
			border-right:12px solid #bfd1ff;
			transform : rotate(45deg);
			background-clip: padding-box;
			animation: circle_right 3s linear infinite;
			overflow: hidden;
			&.time2 {
				animation: circle_right 3s linear infinite;
			}
		}
	}
	.left {
		position: absolute;
		top:0;
		left: 0;
    width: 100px;
    height: 200px;
		overflow: hidden;
		.circle_left {
			position: absolute;
			top: 0;
			left: 0;
      height: 200px;
      width: 200px;
			border:12px solid transparent;
			border-radius: 100%;
			border-bottom:12px solid #bfd1ff;
			border-left:12px solid #bfd1ff;
			transform : rotate(-135deg);
			animation: circle_left 3s linear infinite;
			&.time2 {
				animation: circle_left 3s linear infinite;
			}
		}
	}
	&.restart {
		.circle_right {
			animation: circle_right_restart 3s linear infinite;
			&.time2 {
				animation: circle_right_restart 3s linear infinite;
			}
		}
		.circle_left {
			animation: circle_left_restart 3s linear infinite;
			&.time2 {
				animation: circle_left_restart 3s linear infinite;
			}
		}
	}
	&.pause {
		.circle_right,.circle_left {
			animation-play-state: paused;
		}
	}
}

@keyframes circle_right{
	0%{
		transform: rotate(-135deg);
	}
	50%{
		transform: rotate(45deg);
	}
}
@keyframes circle_left{
	50% {
		transform : rotate(-135deg);
	}
	100%{
		transform : rotate(45deg);
	}
}
@keyframes circle_right_restart{
	0%{
		transform: rotate(-135deg);
	}
	50%{
		transform: rotate(45deg);
	}
}
@keyframes circle_left_restart{
	50% {
		transform : rotate(-135deg);
	}
	100%{
		transform : rotate(45deg);
	}
}
</style>
