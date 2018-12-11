<template>
<div class="lotteryCard">
	<Example
    :info="exampleInfo.info"
    :code="exampleInfo.code"
    :tableInfo='exampleInfo.tableInfo'>
		<mapBox>
		</mapBox>

	</Example>
</div>
</template>

<script>
import mapBox from "../../packages/map/index";
import Example from "../../components/example/index";
export default {
	data() {
		return {
			exampleInfo: {
				info: {
					title: "地图",
					author: "chenshuyao",
					tip: "地图"
				},
				code: ``,
				tableInfo: {
        }
			},
			lotteryTimes: 3,
		};
	},
	methods: {
		handleLotteryResult(payload) {
			console.log(payload);
			this.lotteryTimes-=1
		}
	},
	components: {
		mapBox,
		Example
	}
};
</script>

<style lang="scss">
@import "../../common/sass/global";


</style>
