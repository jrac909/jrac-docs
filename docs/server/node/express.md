## app.use([path], function)
**express 是一个路由和中间件 Web 框架**，这个框架自身的功能很少，它主要是用来调用一系列中间件函数，中间件函数又是什么呢？

**中间件函数**直接从代码来理解，它被 express 执行，其实就是作为参数传递给 app.use 函数，并且这个中间件函数参数有`(req, res, next) => {}`,由此可知，这个中间件函数是可以访问请求对象(req)、响应对象(res)以及下一个中间件函数(next)的。听描述有点像拦截器。它有以下重要特性：

- 更改请求和响应对象(比如 res.setHeader等等)
- 结束请求响应周期(res.end())
- 调用堆栈中的下一个中间件函数(next())

::: danger 注意
关于 `结束请求响应周期(res.end())`，如果此时进来一个请求，某个中间件函数匹配了这个请求，执行这个中间函数，在这个中间函数的结束可以做两种处理：1. 使用 res.end() 结束当前请求，这样的话，其他匹配该请求的中间函数就不会再执行；2. 调用 next() 把请求的控制权限交给下一个中间件函数。除了这两种处理，请求都将被挂起。
:::

**中间件类型**
- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

### 应用级中间件
不设置 path，每次应用请求时都会执行该函数：
``` js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  next()
})
```
设置 path，不指定 method，每次应用请求该 path 都会执行该函数：
``` js
app.use('/user/:id', (req, res, next) => {
  console.log(req.method)
  next()
})
```
设置 path 和 method，只有请求满足这两个条件才执行该函数：
``` js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```
**针对某一个路由，也就是某一个 path，可以有多个中间件函数，形成一个中间件函数队列，这些中间件函数遵循以下规则**
- 必须执行 next() 才能将控制权交给下一个中间件函数，否则不会执行下一个中间件函数
- 中间件函数队列中所有函数，只能执行一次 res.send(); 并且再 res.send() 后就不能执行next() 了,总之需要记住,因为所有的中间件函数都能操作 req、res，所以我们要保证 res.send() 是对 req、res 的最后操作，所以 next() 不允许在 res.send() 后面。
- 多个中间件函数可以写做多个 app.use，也可以作为多个参数传递给一个 app.use

**:boom: Case 1**
``` js
// 访问 /user/333, 输出是 Req URL: /user/333 Req Type: GET Req URL2: /user/333
app.use('/user/:id', function(req, res, next) {
    console.log(`Req URL: ${ req.originalUrl }`);
    next();
    console.log(`Req URL2: ${ req.originalUrl }`);
    res.send(`Req URL: ${ req.originalUrl }`);
},function(req, res, next) {
    console.log(`Req Type: ${ req.method }`);
});
```

**:boom: Case 2**
``` js
// 执行结果相同
app.use('/user/:id', function(req, res, next) {
    console.log(`Req URL: ${ req.originalUrl }`);
    next();
    console.log(`Req URL2: ${ req.originalUrl }`);
    res.send(`Req URL: ${ req.originalUrl }`);
});

app.use('/user/:id', function(req, res, next) {
    console.log(`Req Type: ${ req.method }`)
});
```

### 路由器中间件
和应用级的工作方式基本一致，只是说创建方式不同，如下：
``` js
var app = express();
var router = express.Router();
```
同样使用 router.use 和 router.Method 方法

### 错误处理中间件
::: warning 注意
错误中间件函数有四个参数`(err, req, res, next) => {}`，并且框架是通过参数个数来判断是否是错误中间件的，所以即使不用 next 参数, 也必须要写出来。
:::

``` js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('error!');
});
```

### 内置中间件
express 中唯一内置的中间件函数是 express.static，负责提供 express 应用程序的静态资源。详细使用见左侧目录 `express.static(root, [options])`

### 第三方中间件
这个就直接安装、引入、使用就好了。比如：`serve-favicon`，功能比较单一简单，可以看看源码，其实本质就是返回了一个中间件函数。

## express.static(root, [options])
**最简单的使用**
``` js
app.use(express.static('public'));
```
**根据上述使用方式，来讲一讲它的作用**

首先，我们知道 app.use 的参数是中间件函数，中间件函数的作用是拦截 path, 操作 req, res 等，这里也是一样的，我们传入一个 root, 也就是一个根路径下的文件夹名字，比如有项目 demo，demo 下有文件夹 public，其中存放了图片、js 文件，这时候我们要请求其中的 a.png, 我们需要写一个中间件函数，拦截 public/a.png，或者做匹配，然后通过 res 返回相应的资源，这样处理很麻烦但是又很固定，所以就内置了这个中间件函数。

**options**
| 属性        | 描述           | 类型  | 默认值           |
| ------------- |:-------------:| -----:|:-------------:|
| acceptRanges      | 是否启用 Accept-Ranges 和 Range 请求头 | boolean | true           |
| cacheControl      | 是否启用 Cache-Control      |   boolean | true           |
| dotfiles | 遇到 . 文件如何处理(直接 . 开头的文件)      |    string | 'ignore'           |
| etag | Enable or disable etag generation      |    boolean | true           |
| extensions | Set file extension fallbacks. When set, if a file is not found, the given extensions will be added to the file name and search for. The first that exists will be served. Example: ['html', 'htm'].      |    boolean | false           |
| fallthrough |       |    boolean | true           |

**dotfiles**
| 值        | 处理方式           |
| ------------- |:-------------:|
| 'allow'      | No special treatment for dotfiles. |
| 'deny'      | Deny a request for a dotfile and 403/next().      |
| dotfiles | Pretend like the dotfile does not exist and 404/next().      |
