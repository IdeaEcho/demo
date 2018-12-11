<template>
    <section class="attention-wrap">
        <div class="attention">
            <h1>注意事项</h1>
            <ul class="list">
                <li v-for="(item,index) in attention">{{index+1}}、{{item}}</li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      attention: [
        "import组件库若不是直接可用的vue实例，而是包在default对象内，可在vue-loader.conf.js配置项内增加esModule:false即可"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
    @import "../../common/sass/global";
    .attention-wrap {
      width: re(720);
      margin: 0 auto;
      background: white;
      padding: re(80) 0;
      font-size: re(16);
      @media screen and (max-width: 1280px) {
        width: re(640);
      }
    }
    h1 {
      text-align: left;
      font-size: re(20);
      height: re(40);
      line-height: re(40);
      padding-left: re(10);
      color: #323232;
    }
    .list {
      padding: re(8) re(16);
      background-color: #ecf8ff;
      border-radius: re(4);
      border-left: re(4) solid #50bfff;
      margin: re(20) 0;
      text-align: left;
      li {
        font-size: re(12);
        color: #3182bd;
        line-height: 2;
      }
    }
</style>


