## 背景
### js 代码怎么运行？
js 只能在运行环境中才能被执行，那什么是运行环境呢，现在最为熟悉的运行环境有两个：
- 浏览器
- node

运行环境包含什么东西呢？
- js 引擎
- 内置 api

我们首先需要了解，js 引擎是单独的东西，比如我们最熟悉的 v8 引擎，因为执行效率高，所以最为常用，也是 chrome 浏览器和 node 均采用的引擎。
那内置 api 呢，我们比较熟悉的是，浏览器的内置 api 有 bom、dom、ajax，所以！我们学习 node，其实主要就是学习 node 提供的内置 api。因为内置 api 和运行环境绑定，而不是和引擎，所以在 node 中时没有办法调用浏览器的内置 api 的，也就是 bom、dom 等。

而且，js 在浏览器中运行，使得我们可以编写前端代码，那 js 在 node 中运行，其实就是为我们提供了 js 编写后端代码的运行环境。

### node.js 有什么作用？
Node.js 作为一个 js 的运行环境，仅仅提供了基础的功能和 api，然而，基于 nodejs 提供的这些基础功能，开发了很多强大的工具和框架，前端程序员可以胜任更多的工作和岗位。

- express：快速构建 web 应用。
- electron：可以构建跨平台的桌面应用。
- restify：快速构建 api 接口项目。
- 读写和操作数据库、创建实用的命令行工具辅助前端开发等等。

### node 学习路径
js 基础语法 + node 内置 api模块（fs、path、http 等） + 第三方 api 模块（express、mysql 等）

### 安装 node环境
要在浏览器运行环境执行 js 首先要下载浏览器，同样的，安装 node 就好了。

#### LTS 版本和 Current 版本
前者长期稳定，后者为新特性尝新版

#### 终端查看 node 版本
``` js
node -v
```

#### 什么是终端？
即 Terminal，用于实现人机交互的一种方式。windows macos 都有终端。

## fs 文件系统
fs 模块是 nodejs 官方提供的、用来操作文件的模块，它提供了一系列的方法和属性，用来满足用户对文件的操作和需求。例如：
fs.readFile 方法，用来读取指定文件的内容
fs.writeFile 方法，用来向指定的文件中写入内容。

### 引入模块
只要安装了 node，这些官方内置模块也会一起安装
``` js
const fs = require('fs);
```

### 读取指定文件中的内容
``` js
fs.readFile(path[,options],callback);
```
- path: 文件的路径
- options：以什么编码格式来读取文件
- callback：回调函数

【示例代码】
``` js
const fs = require('fs');

fs.readFile('./demo.txt', 'utf8', function(err, datastr) {
    // 如果读取成功 err 为 null；如果读取失败，err 为失败对象，datastr 为 undefined
})
```

### 判断文件是否读取成功
判断回调函数的 err 参数是否有值

### 向指定文件中写入内容
``` js
fs.writeFile(file, data[, options], callback)
```
- file：向 file 路径的文件写入内容

【示例代码】
``` js
const fs = require('fs');

fs.writeFile('./demo.txt', ‘ABCd’, 'utf8', function(err) {
    // 编码默认就是 utf8
    // 如果文件写入成功，err 为 null；如果写入失败，err 为错误对象
})
```

### 路径动态拼接的问题
【问题一】
！！！一个非常重要，也很容易出错的点。
在使用 fs 模块操作文件时，如果提供的路径是以 ./ 或 ../ 开头的相对路径，很容易出现路径动态拼接错误的问题。
原因：代码在运行的时候，会以执行 node 命令时候所处的目录，动态拼接文件的完整路径。比如：
现在有文件目录 aaa/bbb，bbb 文件夹下有 index.js 和 1.txt，这时候，在 index.js 中用 readFile('./1.txt') 读取文件。然后我们在 bbb 文件夹中执行 indexjs，这时候没错，因为会以 bbb 为基础拼接 ./1.txt，但是如果这时候到 aaa 执行 indexjs，就会报错，因为 aaa 下面没有 1.txt。

【解决问题】
方法一：提供一个完整的文件存放路径（这种肯定不可能在实际应用中用）
方法二：使用 __dirname，这个就是当前文件所在的完整目录

## path 路径模块
path 模块是 nodejs 官方提供的，用来处理路径的模块，它提供了一系列方法和属性，用来满足用户对路径的处理需求。例如：
- path.join
- path.basename

