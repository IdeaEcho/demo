<template>
  <div class="wrap">
    <!-- 说明 -->
    <div class="info">
      <div class='title'>{{info.title}}</div>
      <div class="author">{{info.author}}</div>
      <div class="tip">{{info.tip}}</div>
    </div>
    <!-- 插入组件区域 -->
    <slot></slot>
    <!-- 代码显示 -->
    <div class="btn-showCode"
      @click="isShowCode=!isShowCode">{{isShowCode?`隐藏代码`:`显示代码`}}</div>
    <div class="code-wrap"
      v-show="isShowCode">
      <div class="tips"
        v-html="tips">
      </div>
      <pre class="code language-markup"
        v-show="isShowCode"
        v-html="html">
            </pre>
    </div>
    <!-- 参数配置表 -->
    <table class="attributes"
      v-if="tableInfo.attributes">
      <caption class="title">Attributes</caption>
      <thead>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
        <th>required</th>
      </thead>
      <tbody>
        <tr v-for="body in tableInfo.attributes">
          <td>{{body.propName|empty}}</td>
          <td>{{body.explain|empty}}</td>
          <td>{{body.type|empty}}</td>
          <td>{{body.default|empty}}</td>
          <td>{{body.required|empty}}</td>
        </tr>
      </tbody>
    </table>
    <table class='events'
      v-if="tableInfo.events">
      <caption class="title">Events</caption>
      <thead>
        <th>事件名</th>
        <th>说明</th>
        <th>arguments</th>
      </thead>
      <tbody>
        <tr v-for="event in tableInfo.events">
          <td>{{event.eventsName|empty}}</td>
          <td>{{event.explain|empty}}</td>
          <td>{{event.arguments|empty}}</td>
        </tr>
      </tbody>
    </table>
    <table class='slot'
      v-if="tableInfo.slot">
      <caption class="title">Slot</caption>
      <thead>
        <th>插槽名</th>
        <th>说明</th>
        <th>scope</th>
      </thead>
      <tbody>
        <tr v-for="event in tableInfo.slot">
          <td>{{event.slotName|empty}}</td>
          <td>{{event.explain|empty}}</td>
          <td>{{event.scope|empty}}</td>
        </tr>
      </tbody>
    </table>
    <table class='methods'
      v-if="tableInfo.methods">
      <caption class="title">Methods</caption>
      <thead>
        <th>方法名</th>
        <th>说明</th>
        <th>参数</th>
      </thead>
      <tbody>
        <tr v-for="event in tableInfo.methods">
          <td>{{event.name|empty}}</td>
          <td>{{event.explain|empty}}</td>
          <td>{{event.param|empty}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "example",
  props: {
    info: {
      default() {
        return {};
      },
      required: true,
      type: Object
    },
    code: {
      required: true,
      type: String
    },
    tips: {
      default: "",
      required: false,
      type: String
    },
    tableInfo: {
      default() {
        return {};
      },
      required: false,
      type: Object
    }
  },
  filters: {
    empty: function(val) {
      if (val) {
        return val;
      } else {
        return "-";
      }
    }
  },
  data() {
    return {
      isShowCode: false,
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/sass/global";
  .container {
    color: #333;
    text-align: center;
    display: inline-block;
    height: 100%;
    width: 100%;
    .inner {
      padding-top: re(20);
    }
  }
  //模块样式
  .wrap {
    width: re(720);
    margin: 0 auto;
    background: white;
    padding: re(20) 0;
    font-size: re(16);
    @media screen and (max-width: 1280px) {
      width: re(640);
    }
  }
  .btn-showCode {
    width: 100%;
    height: re(40);
    font-size: re(16);
    line-height: re(40);
    cursor: pointer;
    background: #f8f8f8;
    color: #646464;
    margin-top: re(20);
    -webkit-user-select: none;
  }
  .hl {
    color: #f75555;
  }
  //代码块样式
  pre {
    overflow-x: auto !important;
    font-size: re(12) !important;
    font-weight: 400;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #f5f5f5;
      display: block;
    }
    /*定义滚动条的轨道，内阴影及圆角*/
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f5f5f5;
    }
    /*定义滑块，内阴影及圆角*/
    &::-webkit-scrollbar-thumb {
      /*width: 10px;*/
      height: 20px;
      border-radius: 10px;
      background-color: #999;
    }
  }
  .code-wrap {
    .tips {
      background: #f8f8f8;
      font-size: re(12);
      padding: re(10) re(40);
      text-align: left;
      color: #323232;
    }
  }

  //标题样式
  .info {
    margin-bottom: re(40);
    text-align: left;
    font-size: 0;
    margin-left: re(20);
    .title {
      font-size: re(24);
      display: inline-block;
      vertical-align: middle;
    }
    .author {
      font-size: re(16);
    }
    .tip {
      font-size: re(14);
      color: #999;
    }
  }
  //下载模块样式
  .download {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: re(4);
    border-left: re(4) solid #50bfff;
    margin: re(20) 0;
    p {
      font-size: re(12);
      color: #3182bd;
      line-height: 2;
    }
  }
  //表格样式
  table {
    margin-top: re(20);
    font-size: re(12);
    width: 100%;
    line-height: 1.5;
    .title {
      text-align: left;
      font-size: re(20);
      height: re(40);
      line-height: re(40);
      padding-left: re(10);
      color: #3182bd;
    }
    td,
    th {
      padding-left: re(10);
      color: #333;
      border-bottom: 1px solid #d8d8d8;
      padding: re(8);
      max-width: re(260);
      text-align: left;
    }
  }
</style>
