<template>
<div class="lotteryCard">
	<Example
    :info="exampleInfo.info"
    :code="exampleInfo.code"
    :tableInfo='exampleInfo.tableInfo'>
		<lotteryCard
        :lotteryTimes="lotteryTimes"
        :prizeData="prizeList"
        :lotteryResult="lotteryResult"
        v-on:handleResult="handleLotteryResult">
			<div slot="startBtn" class="btn--start">
				<p>翻牌</p>
				<p class="time">剩余<span class="time_num">{{lotteryTimes}}</span>次</p>
			</div>
		</lotteryCard>

	</Example>
</div>
</template>

<script>
import lotteryCard from "../../packages/lotteryCard/index";
import Example from "../../components/example/index";
export default {
	data() {
		return {
			exampleInfo: {
				info: {
					title: "洗牌翻牌抽奖",
					author: "chenshuyao",
					tip: "初始状态滚动展示抽奖结果，点击抽奖由组件外部传入抽奖结果，组件内部进行处理展示，抽奖结束后，继续滚动展示"
				},
				code: `<lotteryCard
                :lotteryTimes="lotteryTimes"
                :prizeData="prizeList"
                :lotteryResult="lotteryResult"
                v-on:handleResult="handleLotteryResult"></lotteryCard>
                      <script>
                          export default {
                              data() {
                                return {
                                    lotteryTimes: 3,
                                    lotteryResult: {
                                        key: 'nov11_hebi_110',
                                        message:'110盒币'
                                    },
                                    prizeList: [{
                        					key: 'nov11_hebi_1',
                        					message: '1盒币'
                        				},
                        				{
                        					key: 'nov11_hebi_11',
                        					message: '11盒币'
                        				},
                        				{
                        					key: 'nov11_hebi_110',
                        					message: '110盒币'
                        				},
                        				{
                        					key: 'nov11_duobaoquan',
                        					message: '夺宝券'
                        				},
                        				{
                        					key: 'nov11_flow_100',
                        					message: '100流量券'
                        				},
                        				{
                        					key: 'nov11_voucher_50',
                        					message: '50抵用券'
                        				},
                        				{
                        					key: 'nov11_voucher_100',
                        					message: '100抵用券'
                        				},
                        				{
                        					key: 'nov11_voucher_200',
                        					message: '200抵用券'
                        				},
                        				{
                        					key: 'one_more_time',
                        					message: '再来一次'
                        				}
                        			]
                        		};
                              },
                              methods: {
                                  handleLotteryResult(payload) {
                                      console.log(payload);
                                      this.lotteryTimes = payload.lotteryTimes
                                  }
                              },
                          }
                      <\/script>`,
				tableInfo: {
					attributes: [{
						propName: "prizeData",
						explain: `奖品列表`,
						type: `Array`,
						default: `-`,
						required: "true"
					}, {
						propName: "lotteryResult",
						explain: `抽奖结果，中奖:{key:奖品key,message:奖品名称},没中奖:{key:'one_more_time',message:'再来一次'}`,
						type: `Object`,
						default: `-`,
						required: "true"
					}, {
						propName: "lotteryTimes",
						explain: `抽奖次数`,
						type: `Number`,
						default: `-`,
						required: "true"
					}],
					events: [{
						eventsName: "handleResult",
						explain: "用户翻牌后动画结束时触发的事件，该示例调用时将payload数据log了输出方便查看",
						arguments: "payload"
					}],
					slot: [
		              {
		                slotName: "startBtn",
		                explain: "开始按钮，可自行修改样式插入"
		              }
		            ]
                }
			},
			lotteryTimes: 3,
			lotteryResult: {
				key: 'nov11_hebi_110',
				message: '110元'
			},
			prizeList: [{
					key: 'nov11_hebi_1',
					message: '1元'
				},
				{
					key: 'nov11_hebi_11',
					message: '11元'
				},
				{
					key: 'nov11_hebi_110',
					message: '110元'
				},
				{
					key: 'nov11_duobaoquan',
					message: '夺宝券'
				},
				{
					key: 'nov11_flow_100',
					message: '100流量券'
				},
				{
					key: 'nov11_voucher_50',
					message: '50抵用券'
				},
				{
					key: 'nov11_voucher_100',
					message: '100抵用券'
				},
				{
					key: 'nov11_voucher_200',
					message: '200抵用券'
				},
				{
					key: 'one_more_time',
					message: '再来一次'
				}
			]
		};
	},
	methods: {
		handleLotteryResult(payload) {
			console.log(payload);
			this.lotteryTimes-=1
		}
	},
	components: {
		lotteryCard,
		Example
	}
};
</script>

<style lang="scss">
@import "../../common/sass/global";
$base: "./images/";
@function card_font-w() {
    @return rem(166);
}
@function card_font-h() {
    @return rem(180);
}
.lotteryCard {
	.box--card {
	    position: relative;
	    @include whr(568, 620);
	    margin: 0 auto;
	    overflow: hidden;
	}
	.box__mask {
	    position: absolute;
	    display: block;
	    @include whr(568, 620);
	    border-radius: rem(18);
	    background: rgba(0, 0, 0, 0.75);
	    z-index: 1;
	    .btn--start {
	        position: absolute;
	        display: inline-block;
	        top: 50%;
	        left: 50%;
	        transform: translate(-50%, -50%);
	        color: #ffea00;
	        width: rem(320);
	        height: rem(110);
	        border: 3px solid #ffea00;
	        border-radius: rem(110);
	        padding-top: rem(8);
	        box-shadow: 0 0 16px #ffea00 inset;
	        font-size: rem(35);
	        .intro {
	            font-size: rem(26);
	        }
	        .time {
	            color: #cd8c1d;
	            font-size: rem(26);
	        }
	    }
	}
	.box__content {
	    position: relative;
	    top: rem(20);
	    .prize {
	        position: relative;
	        left: 50%;
	        top: 50%;
	        transform: translate(-50%, -50%);
	    }
	    .name {
	        position: absolute;
	        width: rem(160);
	        left: 50%;
	        bottom: rem(10);
	        transform: translateX(-50%);
	    }
		.card {
		    position: relative;
		    display: inline-block;
		    width: card_font-w();
		    height: card_font-h();
		    top: 0;
		    left: 0;
		    margin: rem(5);
		    font-size: rem(16);
		    color: #fff;
		    transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
		    -moz-transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
		    -webkit-transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
		    -o-transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
		}
		.card1 {
		    top: card_font-h();
		    left: card_font-w();
		}
		.card2 {
		    top: card_font-h();
		    left: rem(0);
		}
		.card3 {
		    top: card_font-h();
		    left: -(card_font-w());
		}
		.card4 {
		    left: card_font-w();
		}
		.card5 {
		    left: rem(0);
		}
		.card6 {
		    left: -(card_font-w());
		}
		.card7 {
		    top: -(card_font-h());
		    left: card_font-w();
		}
		.card8 {
		    top: -(card_font-h());
		    left: 0;
		}
		.card9 {
		    top: -(card_font-h());
		    left: -(card_font-w());
		}
		.card {
		    .font {
		        -webkit-transform: rotateY(0deg);
		        -moz-transform: rotateY(0deg);
		        -o-transform: rotateY(0deg);
		        transform: rotateY(0deg);
		        @include whr(166,180);
		        @include bg('card_font.png');
		    }
		    .back {
		        @include whr(166,180);
		        @include bg('card_back.png');
		        -webkit-transform: rotateY(-180deg);
		        -moz-transform: rotateY(-180deg);
		        -o-transform: rotateY(-180deg);
		        transform: rotateY(-180deg);
		    }
		}
		.card .back,
		.card .font {
		    position: absolute;
		    top: 0;
		    left: 0;
		    transition: transform 0.4s;
		    transform-style: preserve-3d;
		    -webkit-transform-style: preserve-3d;
		    backface-visibility: hidden;
		    -webkit-backface-visibility: hidden;
		    -moz-backface-visibility: hidden;
		    -ms-backface-visibility: hidden;

		}

		.turn .font {
		    -webkit-transform: rotateY(180deg);
		    -moz-transform: rotateY(180deg);
		    -o-transform: rotateY(180deg);
		    transform: rotateY(180deg);
		}

		.turn .back {
		    -webkit-transform: rotateY(0deg);
		    -moz-transform: rotateY(0deg);
		    -o-transform: rotateY(0deg);
		    transform: rotateY(0deg);
		}
	}

	.nov11_hebi_1 {
	    @include whr(64,44);
	    @include bg("prize_coin1.png");
	}
	.nov11_hebi_11 {
	    @include whr(95,82);
	    @include bg("prize_coin11.png");
	}
	.nov11_hebi_110 {
	    @include whr(113,96);
	    @include bg("prize_coin110.png");
	}
	.nov11_duobaoquan {
	    @include whr(132,91);
	    @include bg("prize_duobao.png");
	}
	.nov11_flow_100 {
	    @include whr(107,84);
	    @include bg("prize_liuliang.png");
	}
	.nov11_voucher_50 {
	    @include whr(144,69);
	    @include bg("prize_quan50.png");
	}
	.nov11_voucher_100 {
	    @include whr(144,65);
	    @include bg("prize_quan100.png");
	}
	.nov11_voucher_200 {
	    @include whr(144,65);
	    @include bg("prize_quan200.png");
	}
	.one_more_time {
	    @include whr(71,93);
	    @include bg("prize_again.png");
	}
}
</style>
