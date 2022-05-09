## app.use([path], function)
**express 是一个路由和中间件 Web 框架**，这个框架自身的功能很少，它主要是用来调用一系列中间件函数，中间件函数又是什么呢？

**中间件函数**直接从代码来理解，它被 express 执行，其实就是作为参数传递给 app.use 函数，并且这个中间件函数参数有`(req, res, next) => {}`,由此可知，这个中间件函数是可以访问请求对象(req)、响应对象(res)以及下一个中间件函数(next)的。听描述有点像拦截器。它有以下重要特性：

- 更改请求和响应对象(比如 res.setHeader等等)
- 结束请求响应周期(res.end())
- 调用堆栈中的下一个中间件函数(next())

::: danger 注意
关于 `结束请求响应周期(res.end())`，如果此时进来一个请求，中间件函数处理了，需要继续让下一个中间件函数继续处理，一共有两种方法：1. 使用 res.end() 结束请求；2. 调用 next() 把请求的控制权限交给下一个中间件函数。否则，请求将被挂起。
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
