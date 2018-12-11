<template>
<div class="box--card">
	<div class="box__mask" v-if="mask">
		<div @click="start()">
			<slot name="startBtn"></slot>
		</div>
	</div>
	<ul class="box__content">
		<li class="card" v-for="(item,index) in prizeData" :class="[{turn: turning[index]},moving ? card[index]: '']">
			<a class="back" @click="turnOut(index)"></a>
			<a class="font">
				<div class="prize" :class="prizeData[prizeIndex[index]].key"></div>
				<p class="name">{{prizeData[prizeIndex[index]].message}}</p>
			</a>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	name: 'lotteryCard',
	props: {
		prizeData: {
			required: true,
			type: Array
		}, //奖品数组，**{key:'',message:''}**
		lotteryResult: {
			required: true,
			type: Object
		}, //抽奖结果对象，数据必须在prizeData中存在。**{key:'',message:''}**
		lotteryTimes: {
			required: true,
			type: Number
		}
	},
	data() {
		return {
			mask: true,
			moving: false,
			turning: [],
			card: [],
			prizeIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8] //奖品排序序列
		}
	},
	mounted() {
		for (let i = 0; i < 9; i++) {
			this.$set(this.card, i, 'card' + (i + 1))
			this.$set(this.turning, i, false)
		}
	},
	computed: {},
	methods: {
		random(array) {
			return array.sort(function() {
				return Math.random() > 0.5
			});
		},
		//重置
		reset() {
			for (let i = 0; i < 9; i++) {
				this.$set(this.turning, i, false)
			}
			this.mask = true
		},
		//洗牌
		start(e) {
			var that = this
			this.mask = false //隐藏蒙层
			let temp = this.random(this.prizeIndex) //随机奖品排序序列
			for (let i = 0; i < 9; i++) {
				this.$set(this.turning, i, true)
				this.$set(this.prizeIndex, i, temp[i])
			}
			this.moving = true
			setTimeout(function() {
				that.moving = false
			}, 1000);
		},
		//把用户点的index处更新为奖品
		updatePrizeIndex(prizeKey, index) {
			let prizeId, tempIndex //奖品id,奖品位置
			for (let i = 0; i < 9; i++) { //遍历奖品列表，用服务端给的key找到奖品id
				if (this.prizeData[i].key === prizeKey) {
					prizeId = i
				}
			}
			for (let i = 0; i < 9; i++) { //用奖品id找到奖品打乱后位置并记录位置tempIndex
				if (this.prizeIndex[i] == prizeId) {
					tempIndex = i
				}
			}
			//把用户点击的index处的奖品i和下一个index的奖品对换
			let tempId = this.prizeIndex[index] //记录用户点击处的原有奖品ID
			this.$set(this.prizeIndex, index, prizeId) //把用户点击处的原有奖品ID 换成 服务端的奖品ID
			this.$set(this.prizeIndex, tempIndex, tempId) //把奖品原先的位置奖品ID 换成 点击处的原有奖品ID
			this.$set(this.turning, index, false) //翻转
			var that = this
			setTimeout(function() {
				that.$emit("handleResult", {
					message: that.lotteryResult.message,
				});
				that.reset()
			}, 500)
		},
		//用户翻转第index位的卡片
		turnOut(index) {
			if (!this.moving) {
				//从服务端获取的奖品Key，用户点击的位置
				this.updatePrizeIndex(this.lotteryResult.key, index)
			}
		}
	}
}
</script>
