<template>
<div class="map-box">
	<div id="map" class="map"></div>
	<p class="intro" v-if="randomIng&&popType!='dialog--tip'">
		<span :key="randomIdx">{{provinceName[randomIdx]}}</span>{{this.province[randomId]}}人点亮
	</p>
</div>
</template>

<script>
import {
	mapGetters,
	mapActions,
	mapMutations
} from 'vuex'
import Raphael from './raphael.js';
import MapJson from './map.json';

export default {
	name: 'mapBox',
	data() {
		return {
			popType: '',
			MapJson: MapJson,
			doubleClick: false,
			active: '',
			clickIng: false,
			randomIng: false,
			randomIdx: 0,
			randomId: 11,
			svgId: [],
			lightColor: ['#dd62fb', '#e888ff', '#eda4ff', '#f0b3ff', '#f4c7ff', '#fbe5ff'],
			darkColor: ['#4b1b55', '#511e5c', '#5d2769', '#693176', '#73407f', '#7f498b'],
			id: [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71],
			provinceName: ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆','台湾'],
			province:{"11":100,"12":200,"13":300,"14":400,"15":500,"21":600,"22":700,"23":800,"31":900,"32":1000,"33":0,"34":0,"35":0,"36":0,"37":0,"41":0,"42":0,"43":0,"44":0,"45":0,"46":0,"50":0,"51":0,"52":0,"53":0,"54":0,"61":0,"62":0,"63":0,"64":0,"65":0,"71":0,"81":0,"82":0}
		}
	},
	async mounted() {
		this.initDark()
	},
	computed: {
	},
	methods: {
		...mapMutations(['CLOSE_POP', 'OPEN_POP']),
		getColor(arr, people) {
			let level = Math.floor(people / 100) < 6 ? Math.floor(people / 100) : 5
			return arr[level]
		},
		initDark() {
			let that = this
			let people = 0
			let fill = that.darkColor[0]
			let map = new Raphael(document.getElementById('map'));
			map.setViewBox(0, 0, 471, 389.5)
			this.id.forEach((item, idx) => {
				people = parseInt(that.province[item])
				fill = this.getColor(that.darkColor, people)
				let pathTmp = map.path(that.MapJson[idx])
				that.svgId.push(pathTmp.id)
				pathTmp.attr({fill: fill,'stroke-width': 0})
					.data("idx", idx)
					.data("id", item)
					.data("dark", fill)
					.data("people", people)
					.click(function(e) {

					});
			})
			this.refreshShine(map)
		},
		refreshShine(map) {
			let that = this
			setInterval(() => {
				if (!that.randomIng) that.randomIng = true
				let len = that.svgId.length
				let idx = Math.floor(Math.random() * that.svgId.length);
				let key = that.id[idx]
				let dom = map.getById(that.svgId[idx])
				that.randomMapHandle(dom, map, that.province[key])
			}, 2000);
		},
		shinning(dom) {
			let people = dom.data("people") ? dom.data("people") : 0
			let fill = this.getColor(this.lightColor, people)
			dom.animate({
				fill: fill,
				'stroke-width': 0
			}, 500)
		},
		// 检查是否有高亮块
		resetActive(map) {
			if (this.active) { //已有高亮的块
				let activeDom = map.getById(this.active)
				let dark = activeDom.data("dark")
				activeDom.animate({
					fill: dark,
					'stroke-width': 0
				}, 500)
			}
		},
		randomMapHandle(dom, map) {
			let that = this
			if (that.active == dom.id) return;
			that.resetActive(map)
			that.randomId = dom.data("id")
			that.randomIdx = dom.data("idx")
			that.active = dom.id
			that.shinning(dom)
		},
		clickMapHandle(dom, map, e) {
			let that = this
			if (that.active == dom.id) return;
			that.resetActive(map)
			let mapBox = document.getElementById('map');
			// console.log(e);
			that.OPEN_POP({
				popType: 'dialog--tip',
				popData: {
					id: dom.data("id"),
					idx: dom.data("idx"),
					x: e.offsetX + 10,
					y: e.offsetY + mapBox.offsetTop - 38,
				}
			})
			setTimeout(() => {
				that.resetActive(map)
				that.active = ''
				that.CLOSE_POP()
			}, 1000)
			that.active = dom.id
			that.shinning(dom)
		}
	},
	components: {}
}
</script>

<style lang="scss" scoped>
.map {
  width: rem(596);
  height: rem(498);
  margin: auto;
  padding: 0 rem(4) rem(12);
	background-position: bottom;
}
.map > * {
  transition: all 0.3s linear;
}
.level1 {
  fill: #4b1b55;
}
.level2 {
  fill: #511e5c;
}
.level3 {
  fill: #5d2769;
}
.level4 {
  fill: #693176;
}
.level5 {
  fill: #73407f;
}
.level6 {
  fill: #7f498b;
}
</style>
