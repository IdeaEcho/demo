import Vue from "vue";
import Router from "vue-router";
import attention from '../components/attention'

Vue.use(Router);

let examples = require.context('../examples/', true, /\.vue$/);
let routes = [];
// routes.push({ path: "/", component: , name: 'index' });
routes.push({ path: '/attention', component: attention, name: 'attention' })

examples.keys().forEach(r => {
    let key = /\.\/([\s\S]*)\/[\s\S]*.vue/.exec(r)[1];
    routes.push({
        path: `/${key}`,
        component: examples(r),
        name: key
    })
})
const router = new Router({
    routes
});

export default router;
