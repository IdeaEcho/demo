<template>
<div >
	<Example
    :info="exampleInfo.info"
    :code="exampleInfo.code"
    :tableInfo='exampleInfo.tableInfo'>
		<circleCountDown
		 :status="timeStatus"
		 :interval="3"
		 @callback="overHandle()"
		></circleCountDown>
		<button type="button" name="button" @click="timeStatus=!timeStatus">{{timeStatus?'暂停':'开始'}}</button>
	</Example>
</div>
</template>

<script>
import circleCountDown from "../../packages/circleCountDown/index";
import Example from "../../components/example/index";
export default {
	data() {
		return {
			exampleInfo: {
				info: {
					title: "圆型倒计时",
					author: "chenshuyao",
					tip: "圆型倒计时"
				},
				code: `<circleCountDown
				 :status="timeStatus"
				 :interval="3"
				 @callback="overHandle()"
				></circleCountDown>`,
				tableInfo: {
					attributes: [{
						propName: "status",
						explain: `计时状态（开始|结束）`,
						type: `Boolean`,
						default: `-`,
						required: "true"
					}, {
						propName: "interval",
						explain: `倒计时周期`,
						type: `Number`,
						default: `3`,
						required: "false"
					}, {
						propName: "paused",
						explain: `暂停`,
						type: `Boolean`,
						default: `false`,
						required: "false"
					}],
					events: [{
						eventsName: "callback",
						explain: "倒计时结束回调函数",
						arguments: "payload"
					}],
					slot: []
          }
			},
			timeStatus: false,
		};
	},
	methods: {
		overHandle(payload) {
			console.log(payload);
		},
	},
	components: {
		circleCountDown,
		Example
	}
};
</script>

<style lang="scss">
@import "../../common/sass/global";
</style>
