<template>
<div>
	<Example
    :info="exampleInfo.info"
    :code="exampleInfo.code"
    :tableInfo='exampleInfo.tableInfo'>
		<IndexedDB></IndexedDB>
	</Example>
</div>
</template>

<script>
import IndexedDB from "../../packages/IndexedDB/index";
import Example from "../../components/example/index";
export default {
	data() {
		return {
			exampleInfo: {
				info: {
					title: "IndexedDB",
					author: "chenshuyao",
					tip: "IndexedDB的demo，未整理成组件"
				},
				code: `<IndexedDB></IndexedDB>`,
				tableInfo: {
					slot: []
        }
			},
		};
	},
	methods: {
	},
	components: {
		IndexedDB,
		Example
	}
};
</script>

<style lang="scss">
@import "../../common/sass/global";
</style>
