<template>
<div class="lotteryCard">
	<Example
    :info="exampleInfo.info"
    :code="exampleInfo.code"
    :tableInfo='exampleInfo.tableInfo'>
		<mapBox></mapBox>
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
					tip: "用svg写的地图，svg数据在map.json文件里，json在手，什么样式的地图都可以通用"
				},
				code: ``,
				tableInfo: {
        }
			},
		};
	},
	methods: {

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
