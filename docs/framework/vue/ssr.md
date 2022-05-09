## 什么是 SSR?
&emsp;&emsp;指在服务端（`nodejs server`）完成页面 html 拼接（`包括一些初始数据的查询`），然后再发送给浏览器，此时的 html 并未绑定事件，也没有相关的状态，所以需要在客户端进行`“激活”`，使其成为能够交互的客户端应用。

::: tip 补充
&emsp;&emsp;应用的大部分代码同时运行在服务端和客户端：服务端需要解析拼接整个页面，所以肯定要有相关代码的，包括初始数据的请求，路由、状态管理等；客户端要保证用户的交互，所以肯定也需要有页面的代码，还有相关的事件操作等等。

&emsp;&emsp;为什么服务端可以解析，在学 vue 的时候就能了解到，vue 是基于 VNode 虚拟 Dom 的，它的一个大优势就是跨平台。
:::

## 为什么要用 SSR？
&emsp;&emsp;这里可以从前端开发模式的变更说起，最开始的应用，前后端不分离，服务器直接返回渲染好的 html 文档，前端可以在页面上进行很多操作，状态可以从 session 获取，这样处理前端渲染更快， SEO 友好，但是前端工作不明确，代码结构不清晰，开发效率低，前端也要了解一些后端基础，基于这个情况，出现了前后端分离。

&emsp;&emsp;前端单独开启一个服务，独立开发，渲染页面，通过 ajax 等技术仅与后端进行数据交换。但是这样产生了新的问题，比如 vue，初始 html 只有一个容器 div，需要下载 vuejs 对 template 模板进行渲染后，包括数据请求后，才能看到完整的页面，这导致 SEO 失效，另一方面，下载内容过多，首屏渲染过慢。

&emsp;&emsp;服务端渲染除了最早期的服务端开发模式，优势在于：
- 可以使用前端语言，node 的语言也是 js，而不需要去学 java
- 仍然具有前后端分离的优势

::: warning 注意
使用 ssr 开发有更多的限制：
- 服务端只会执行 create 两个钩子，所以一些第三方库代码依赖其他钩子，服务端无法执行，需要做特殊处理
- 因为依赖于 node，所以部署的时候需要在服务器上安装 node
- 更高的服务端负载，采用合理的缓存策略（`lru-cache`）
:::

## SSR vs. SSG?
&emsp;&emsp;**SSG**主要是指渲染提前渲染好静态页面由服务器托管，其中一个特性就是，对所有用户返回的页面是相同的，不存在状态管理。所以像一些教程文档、宣传页就更适合 SSG。

## 基础教程
> 参考官方文档：https://staging-cn.vuejs.org/guide/scaling-up/ssr.html#ssr-vs-ssg
1. 创建新的项目文件夹并且进入文件夹: `mkdir demo` `cd demo`
2. `npm init -y`：采用默认初始化项目配置，其实就是生成 package.json,也可以在这里自定义项目信息
3.  在 package.json 中添加 "type": "module",使 nodejs 以 ES modules mode 运行：这个其实并不是一定要配置的，这个配置是什么意思呢，可以去看一看 node 的文档，node 默认采用 commonjs 模块化，所以我们引入都是 require,这个配置就是开启 es module 模块化，也就是 import 引入库。但是需要注意，这两者是二选一的关系。（如果要对照文档的引入来写，就需要改这个配置，只是说实际项目中，这个不是必要的配置。）
4. 执行 `npm install vue`：基于 vue 开发，这个肯定是必要的库
5. 创建一个 server.js 文件：
``` js
// 此文件运行在 Node.js 服务器上
// 这个方法主要是创建一个 vue 实例
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`
})
// renderToString 方法接收 vue 实例作为参数,将 vue 实例编译成 html 静态串
renderToString(app).then((html) => {
  console.log(html)
})
```
6. 运行 example.js：`node server.js`

&emsp;&emsp;上述 1-6 步在服务端将 vue 实例编译成 html 串,要实现服务器渲染,我们还需要：1.开启一个 node 服务;2.拼接完整的 html 串,可以看到上面生成的 html 只包括内容部分,还需要 html head body 等标签,我们需要将其补充完整。

1. 使用 express 开启服务(先安装 express:`npm install express`)：
``` js
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

2. 执行 `node server.js`
3. 访问 http://localhost:3000

::: danger 注意
这时候点击按钮是没有效果的，回忆一下最开始说的，服务端返回静态 html 串，server.js 在服务端执行，客户端甚至连 vue 都没有引入，所以需要客户端激活，在客户端绑定事件等。
:::

## 客户端激活
### 怎么激活？
&emsp;&emsp;创建一个和服务端完全相同的应用实例，也就是说 options 是完全一致的，既然如此，为了避免服务端客户端两边不一致，我们最好写一个公共的创建实例的方法，我们可以创建一个 app.js 文件，在其中实现创建 vue 实例的工厂函数，并 export 导出，提供给服务端和客户端使用。
``` js
// app.js (在服务器和客户端之间共享)
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}
```
&emsp;&emsp;然后在客户端创建实例并挂载：
``` js
// client.js
import { createApp } from './app.js'

createApp().mount('#app')
```
&emsp;&emsp;将服务端的 createSSRApp 同样替换为这个公用方法创建实例。

**这时候还有什么问题？**
1. 服务端返回的 html 没有变化, 我们写了 client.js 是用来激活的，但是怎么执行它呢
2. 这个 client.js 依赖于 vue, 那我们是不是还应该引入 vue? 怎么引入呢?

&emsp;&emsp;不需要考虑的太复杂,想一想浏览器是怎样执行 js 文件的,要么直接写在 script 标签中,要么直接通过标签引入,这里肯定是标签引入 client.js 文件了。既然依赖于 vue,那在这前面再引入 vue 就好了,所以直接在 server.js 的 html 串加上引用
``` html
renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
```

现在再执行 node server.js 就没问题了

::: tip
以上只是一个最基础的例子,主要为了讲解大致流程,在实际项目中我们还需要考虑更多的问题,比如路由控制、状态管理,我们可以自己实现配置,也可以直接使用一些插件,比如 nuxt。
:::

## 遵循原则
无论是选择自己配置,还是使用框架,都需要遵循以下原则。

### 服务端的响应性
浏览器每一个请求url,返回的是一个生成好的 html,不包括用户的交互,服务端不需要处理用户交互也不需要更新DOM,所以服务端是禁用响应性的

### 生命周期
既然服务端没有响应式也没有 $mount 挂载,那它自然不需要执行 mounte 和 update 阶段钩子,事实上确实没有,所以我们应该避免在 create 创建的东西,在 unmount 清除,比如定时器,create 两边都创建,但是 unmount 只在客户端清除,那服务端就一直保留了,所以这种代码最好放在 mount 执行

### 访问平台特有 api
比如 window 和 document 是浏览器的变量，那肯定没法在 create 阶段操作 window，因为服务端会执行，找不到就会报错，反过来也一样。

### 跨请求状态污染
先看了引入 vuex 再讲这一部分吧。