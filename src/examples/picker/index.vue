<template>
  <Example :info="exampleInfo.info" :code="exampleInfo.code" :tableInfo="exampleInfo.tableInfo">
    <picker :values="timeList" @change="onValuesChange" :formatTextFn="formatTime"></picker>
  </Example>
</template>

<script>
  import Example from "../../components/example/index";
  import Picker from "../../packages/picker/picker";
  export default {
    components: {
      Picker,
      Example
    },
    data() {
      return {
        exampleInfo: {
          info: {
            title: "选择器",
            author: "chenshuyao",
            tip: "一个轻量的选择器，用于选择单个选项，无级联操作，支持传入字符串格式处理函数"
          },
          code: `<picker :values="timeList" @change="onValuesChange" :formatTextFn="formatTime"></picker>
        <script>
          export default {
            data(){
              return{
                timeList: [{
                    "key": "1566000000-1566003600",
                    "stime": 1566000000,
                    "etime": 1566003600
                }, {
                    "key": "1566003600-1566007200",
                    "stime": 1566003600,
                    "etime": 1566007200
                }, {
                    "key": "1566007200-1566010800",
                    "stime": 1566007200,
                    "etime": 1566010800
                }, {
                    "key": "1566010800-1566014400",
                    "stime": 1566010800,
                    "etime": 1566014400
                }, {
                    "key": "1566021600-1566025200",
                    "stime": 1566021600,
                    "etime": 1566025200
                }, {
                    "key": "1566025200-1566028800",
                    "stime": 1566025200,
                    "etime": 1566028800
                }, {
                    "key": "1566043200-1566046800",
                    "stime": 1566043200,
                    "etime": 1566046800
                }, {
                    "key": "1566046800-1566050400",
                    "stime": 1566046800,
                    "etime": 1566050400
                }, {
                    "key": "1566050400-1566054000",
                    "stime": 1566050400,
                    "etime": 1566054000
                }, {
                    "key": "1566054000-1566057600",
                    "stime": 1566054000,
                    "etime": 1566057600
                }]
              }
            },
            methods:{
              onValuesChange(picker, value) {
                console.log('当前选中项:',value)
              },
              formatTime(item) {
                let stime = item.stime
                let etime = item.etime
                let time = new Date(parseInt(stime) * 1000)
                let year = time.getFullYear()
                let mon = time.getMonth() + 1
                let day = time.getDate()

                let hour = time.getHours()
                hour = hour < 10 ? '0' + hour : hour
                let min = time.getMinutes()
                min = min < 10 ? '0' + min : min

                return year + '年' + mon + '月' + day + '日 ' + hour + ':' + min
              }
            }
          }
        <\/script>
        `,
          tableInfo: {
            attributes: [{
                propName: "values",
                explain: "选择器内容数据",
                type: "Array",
                default: "-",
                required: "true"
              },{
                propName: "defaultIndex",
                explain: "初始下标",
                type: "Number",
                default: "0",
                required: "false"
              },{
                propName: "formatTextFn",
                explain: "字符串格式处理函数，若props有传入formatTextFn参数，则values的每项数据都会调用并展示该函数的返回值，若传入formatTextFn，则展示values的每项数据本身",
                type: "Function",
                default: "null",
                required: "false"
              },
            ],
            events: [{
              eventsName: "change",
              explain: "滚动选择时，当前选择值变更触发change事件，传出picker对象和value当前选择项",
              arguments: "picker,value"
            }]
          }
        },
        timeList: [{
          "key": "1566000000-1566003600",
          "stime": 1566000000,
          "etime": 1566003600
        }, {
          "key": "1566003600-1566007200",
          "stime": 1566003600,
          "etime": 1566007200
        }, {
          "key": "1566007200-1566010800",
          "stime": 1566007200,
          "etime": 1566010800
        }, {
          "key": "1566010800-1566014400",
          "stime": 1566010800,
          "etime": 1566014400
        }, {
          "key": "1566021600-1566025200",
          "stime": 1566021600,
          "etime": 1566025200
        }, {
          "key": "1566025200-1566028800",
          "stime": 1566025200,
          "etime": 1566028800
        }, {
          "key": "1566043200-1566046800",
          "stime": 1566043200,
          "etime": 1566046800
        }, {
          "key": "1566046800-1566050400",
          "stime": 1566046800,
          "etime": 1566050400
        }, {
          "key": "1566050400-1566054000",
          "stime": 1566050400,
          "etime": 1566054000
        }, {
          "key": "1566054000-1566057600",
          "stime": 1566054000,
          "etime": 1566057600
        }]
      };
    },
    methods: {
      onValuesChange(picker, value) {
        console.log('当前选中项:', value)
      },
      formatTime(item) {
        let stime = item.stime
        let etime = item.etime
        let time = new Date(parseInt(stime) * 1000)
        let year = time.getFullYear()
        let mon = time.getMonth() + 1
        let day = time.getDate()

        let hour = time.getHours()
        hour = hour < 10 ? '0' + hour : hour
        let min = time.getMinutes()
        min = min < 10 ? '0' + min : min

        return year + '年' + mon + '月' + day + '日 ' + hour + ':' + min
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
</style>