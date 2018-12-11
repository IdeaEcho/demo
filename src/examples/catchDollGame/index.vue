<template>
<div class="wrap">
	<Example :info="exampleInfo.info" :code="exampleInfo.code" :tableInfo='exampleInfo.tableInfo'>
		<div class="catchDollGame">
			<catchDollGame
			ref="catchDollGame"
			:gameStatus="gameStatus"
			:num_play="num_play"
			:num_doll="num_doll"
			:result="result"
			v-on:handleResult="handleResult"
		></catchDollGame>
	    <button v-show="!gameStatus" class="btn-start" type="button" name="button" @click="gameBegin"></button>
		</div>
	</Example>
</div>
</template>

<script>
import catchDollGame from "../../packages/catchDollGame/index";
import Example from "../../components/example/index";
export default {
	data() {
		return {
			exampleInfo: {
				info: {
					title: "简单的抓娃娃游戏",
					author: "chenshuyao",
				},
				code: ``,
				tableInfo: {
					attributes: [{
						propName: "gameStatus",
						explain: `游戏状态`,
						type: `Boolean`,
						default: `-`,
						required: "true"
					}, {
						propName: "num_play",
						explain: `游戏次数`,
						type: `Number`,
						default: `-`,
						required: "true"
					}, {
						propName: "num_doll",
						explain: `娃娃个数`,
						type: `Number`,
						default: `-`,
						required: "true"
					}, {
						propName: "result",
						explain: `抽奖结果`,
						type: `Boolean`,
						default: `-`,
						required: "true"
					}],
					events: [{
						eventsName: "handleResult",
						explain: "处理抽奖结果",
					}]
				}
			},
            gameStatus: false,
			num_play: 3,
			num_doll: 0,
			result:false
		};
	},
	methods: {
        gameBegin: function() {
			if(this.num_play>=1) {
				this.gameStatus = true
				this.result = false
				this.num_play--//游戏减少次数
				this.$refs.catchDollGame.gameBegin()
			} else {
				alert('没有游戏次数啦');
			}
		},
		handleResult: function() {
			this.gameStatus = false
			let randomResult= parseInt(10*Math.random())
			if(randomResult>0) {
				console.log('抓到了小游');
				this.result = true
				this.num_doll++ //娃娃数量增加
			} else {
				console.log('没抓到小游');
				this.result = false
			}
		}
	},
	components: {
		catchDollGame,
		Example
	}
};
</script>

<style lang="scss">
@import "../../common/sass/global";
$base: "./images/";
.catchDollGame {
    color: #fff;
	.num-game {
	    float: left;
	    display: inline-block;
	    margin-left: rem(85);
	    @include bg('num-game.png');
	    @include whr(242,60);
	    line-height: rem(60);
	}
	.num-xiaoyou {
	    float: right;
	    margin-right: rem(75);
	    padding-left: rem(20);
	    @include bg('num-xiaoyou.png');
	    @include whr(213,60);
	    line-height: rem(60);
	}
	.machine {
	    position: relative;
	    display: inline-block;
	    @include bg('machine-bg.png');
	    @include whr(487,389);
	    margin: rem(15);
	    overflow: hidden;
	    .claw {
	        position: absolute;
	        top: -45%;
	        transform: translateX(-50%);
	        @include bg('claw.png');
	        @include whr(1414/14,322);
	        background-size: rem(1414) rem(322);
	        animation: claw 1s steps(14) infinite;
	        transition: all 0.3s linear;
	        &.left {
	            left: 40%;
	        }
	        &.center {
	            left: 55%;
	        }
	        &.right {
	            left: 75%;
	        }
	        &.catch {
	            top: 0;
	        }
	        &.success {
	            @include bg('claw-doll.png');
	            @include whr(124,360);
	            transition: none;
	            animation: none;
	        }
	    }
	    @keyframes claw {
	        0% {
	            background-position: 0 0;
	        }
	        100% {
	            background-position: rem(-1414) 0;
	        }
	    }
	    .machine-doll {
	        position: absolute;
	        top: rem(200);
	        left: rem(120);
	        @include bg('machine-doll.png');
	        @include whr(320,179);
	    }
	    .machine-glass {
	        position: absolute;
	        @include bg('machine-glass.png');
	        @include whr(487,389);
	    }
	}
	.machine-box {
	    position: relative;
	    bottom: rem(-20);
	    margin: auto;
	    @include bg('machine-box.png');
	    width: rem(601);
	    background-position: 0 100%;
	    height: rem(164+30);
	    .rocker-box {
	        position: relative;
	        top: rem(30);
	        left: rem(100);
	        @include bg('rocker-bg.png');
	        @include whr(149,44);
	    }
	    .rocker-box::after {
	        position: absolute;
	        content: '';
	        top: rem(44);
	        left: 0;
	        @include bg('rocker-mask.png');
	        @include whr(149,44);
	    }
	    .rocker {
	        position: relative;
	        @include bg('rocker.png');
	        @include whr(93,156);
	        margin-left: rem(25);
	        bottom: rem(102);
	        transition: all 0.3s linear;
	        &.left {
	            margin-left: rem(0);
	            transform: rotate(-20deg);
	        }
	        &.right {
	            margin-left: rem(50);
	            transform: rotate(20deg);
	        }
	    }
	    .btn-catch {
	        position: relative;
	        float: right;
	        top: rem(-35);
	        right: rem(85);
	        @include bg('catch_nor.png');
	        @include whr(180,104);
	        &:active {
	            top: rem(-42);
	            @include bg('catch_act.png');
	            @include whr(180,116);
	        }
	    }
	}
	.btn-start {
	    @include bg('play_nor.png');
	    @include whr(272,105);
		margin: rem(35) 0;
		&:active {
	        @include bg('play_act.png');
	        @include whr(272,105);
		}
	}
	//计时器
	.timer-bar {
	    display: inline-block;
	    vertical-align: top;
	    position: relative;
	    background: #628cc8;
	    width: rem(58);
	    height: rem(370);
	    border: 1px solid #4f79b5;
	    border-radius: rem(12);
	    padding: rem(7) 0;
	    margin: rem(15) 0;
	}
	.bar-vertical {
	    @include bg('Vbar.png');
	    @include whr(20,302);
	    margin: rem(7) auto;
	}
	.bar-vertical-mask {
	    position: absolute;
	    top: rem(33);
	    @include bg('Vbar-mask.png');
	    @include whr(20,0);
	    margin: 0 auto;
	}
}
</style>
