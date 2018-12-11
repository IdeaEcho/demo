<template>
  <div class="root">
    <header>
      <span class="nav"
        v-show="$route.path!=='/API'"
        @click="isShowAside=!isShowAside"></span>
      <a @click="goUI"
        :class="{'router-link-exact-active':$route.path!=='/API'}">Examples</a>
      <!-- <router-link to='API'>API文档</router-link> -->
    </header>
    <section class="main">
      <aside style="display:block"
        @click='isShowAside = false'
        :class="{show:isShowAside,hide:!isShowAside}">
        <div class="links"
          @click.stop=''>
          <router-link :to="{name:route.name}"
            v-for="(route,index) in routerArr"
            :key="index">{{route.name}}</router-link>
        </div>
      </aside>
      <section class='container'>
        <div class="inner">
          <router-view></router-view>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "root",
  data() {
    return {
      isShowAside: false,
      routerArr: []
    };
  },
  mounted() {
    this.getRouteArr();
  },
  computed: {},
  methods: {
    getRouteArr() {
      let routers = require.context("../examples/", true, /\.vue$/);
      routers.keys().map(r => {
        if (routers(r).sideBar !== false) {
          let key = /\.\/([\s\S]*)\/[\s\S]*.vue/.exec(r)[1];
          this.routerArr.push({
            name: key
          });
        }
      });
    },
    goUI() {
      this.$router.replace("/");
    }
  },
  components: {}
};
</script>

<style lang="scss">
  @import "../common/sass/reset";
  @import "../common/sass/global";
  @import "./index";
</style>
