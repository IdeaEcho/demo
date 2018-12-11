# DEMO

## 基于vue的组件库

```bash
#dev运行
npm run dev

#打包
npm run build
```

```bash
#项目结构

        -build
        -config
        -src
            -common#demo页所需全局模块，如global.scss等
            -components#demo页所需组件，如example组件
            -entrances#入口文件
                -index.js
                -index.scss#网站布局样式
                -index.vue
            -examples#demo示范引用，内部的文件夹内的.vue将自动生成一个新的路由，路由的名字与文件夹一致
            -mixin#混合
                -hl.css
                -hl.js#代码高亮混合
            -packages#组件源码，发布的地方，发布的组件引用名与内部文件夹名字一致
            -router#定义路由
```
### 注意事项
* packages内要发布的组件，如果需要引用其他外部模块，请保证引用的模块在packages目录下，如果是npm下载的模块，请在package目录下的package.json内声明
