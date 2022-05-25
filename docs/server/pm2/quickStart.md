[[toc]]

## PM2 快速开始
pm2 是一个守护进程管理器, 它可以用来管理和维护在线应用。pm2 以简单的命令行形式提供服务, 并且可以通过 npm 安装。

### 作用
[pm2 的应用](https://juejin.cn/post/6975110853473337381)

pm2 是一个带有负载均衡功能的 Node 应用的进程管理器, 可以利用服务器上的所有 CPU, 并保证进程永远都活着, 0 秒重载, 部署管理多个 node 项目。
- 监听文件变化, 自动重启程序
- 支持性能监控
- 负载均衡
- 程序崩溃自动重启
- 服务器重新启动时自动重新启动
- 自动化部署项目

### 安装
可以通过 Npm 和 yarn 安装 pm2 的最新版本
``` js
npm install pm2@latest -g
# 或
yarn global add pm2
```

### 启动 pm2
1. 最简单方式启动、监控一个应用：
``` js
pm2 start app.js # 会以表格形式显示这个应用运行情况, 比如占用内存
```

2. 启动、监控其他类型脚本文件：
``` js
pm2 start bashscript.sh
pm2 start python-app.py --watch
```

3. 可以通过命令行传入一些参数

| 参数        | 作用           |
| ------------- |:-------------:|
| --name      | 指定应用程序的名称(后面可以通过这个 name 去 stop、delete, 同一个应用程序, 可以启动多次, 有多个 name) |
| --watch      | 监听文件, 在文件变化时, 重启应用程序      |
| --max-memory-restart <200MB> | 设置应用程序重载的内存阈值      |
| --log | 指定日志文件的路径      |
| -- arg1 arg2 arg3 | 给脚本传递额外的参数      |
| --restart-delay \<delay in ms\> | 自动重启的间隔时间      |
| --time | 带时间的日志前缀      |
| --no-autorestart | 不自动重启应用程序      |
| --cron \<cron_pattern\> | 为强制重启指定记时程序      |
| --no-daemon | 附加到应用程序日志      |


### 一些简单的、常用的管理应用状态的命令
``` js
pm2 restart app_name // 重启应用
pm2 reload app_name // 重新加载应用
pm2 stop app_name // 停止应用(列表还能看到, 只是状态为 stop)
pm2 delete app_name // 删除应用(列表中也无了)
```

注意：
- app_name 还可以替换为应用 id, 或者替换成 all, 表示是操作所有进程
- restart 和 reload 的区别: restart 是先停止这个进程, 然后再开启进程, 中间会有中断的过程; reload 是先开启这个进程, 然后关闭旧进程

现在已经启动了应用, 你现在可以查看它的状态、日志、各项指标了, 甚至可以通过 pm2.io 以 dashboard 形式查看。


### 列出管理中的应用
``` js
pm2 list|ls|status // 这三个命令看到的效果是一样的
pm2 describe app_name // 查看详细信息
```

### 查看日志
``` js
pm2 logs // 比如刷新页面进行新的请求, 就会打印日志
pm2 logs --lines 200 // 显示指定行日志, 这里是显示 200 行日志
```

### 查看实时 dashboard
``` js
pm2 monit
```
查看实时日志、指标等, 会适配当下的终端

### pm2.io 使用 web 监控信息
``` js
pm2 plus
```

### 集群模式
对于Node.js应用，PM2包含一个自动负载均衡器，它将在每个生成的进程之间共享所有HTTP/Websocket/TCP/UDP连接。以集群模式启动应用。 
``` js
pm2 start app.js -i max // max 表示 pm2 将自动检测可用的 CPU 数量, 也可以自己指定数量
```

### 配置文件的形式启动
你可以通过创建一个叫做 ecosystem 的配置文件, 来管理多个应用。
``` js
pm2 init simple // 这样会生成一个 ecosystem.config,js, 其中包含了最简单的配置内容, 即应用名字和文件路径
// 然后通过下面的命令可以启动
pm2 start ecosystem.config.js
```

### 设置 pm2 开机自启
比如 centos 系统
``` js
pm2 startup centos
// 保存设置
pm2 save
```

## 基础 (不完整)
### 配置文件
#### 支持格式
pm2 配置文件支持 js、json、yaml 格式。

#### js 格式
1. 生成配置文件模板
``` js
pm2 init
```

#### 配置属性
- apps: 是一个数组, 其中每一个对象元素表示管理的一个应用进程
- instances：集群模式下, 将应用程序分布在多少 CPU 上
    - 0 / max : 将应用分布在所有 CPU 上 (注意这里 0 表示所有)
    - -1 : 将应用程序分布到所有 CPU - 1 
    - number : 将应用程序分布在多个 CPU 上
- cwd : 启动应用程序的目录, 相当于在这个目录下执行 pm2 xxxx, 对后面的 __dirname 这些有影响
- name : 应用程序名称, 默认是不带扩展名的脚本文件名, 比如 pm2 start app.js 那么默认 name 就是 app
- script : 执行的脚本的路径, 也就是 pm2 start 执行的脚本
- exec_mode : 执行模式, 有 "cluster" 和 "fork" 两种值, 默认是 fork, 一般来说生产环境用 cluster
- max_memory_restart : 超过这个指定的内存量, 应用程序将自动重新启动
- kill_timeout (下面有详细解释) : 延长时间发送 final SIGKILL 信号
- wait_ready : 
    - 默认为 false, 表示执行 listen 回调, 就将程序视为 online, 但是可能应用还需要在回调中与 dbs/caches/workers... 建立连接
    - 所以如果将其设置为 true, 就可以手动执行 process.send('ready'), 只有执行这个代码, 才表示准备就绪应用上线
- listen_timeout : 如果不执行 process.send('ready'), pm2 也不可能一直等待, 默认等待时间是 3000ms, 这里可以手动设置等待时间
- error_file : 错误日志存放目录
- out_file : 指定标准输出日志文件路径
- 环境变量, 值为 env_ 后的值, 值是一个对象, 对象作为环境变量参数, 也就是可以通过 process.env 拿到

::: warning kill_timeout
实际情况: 使用 pm2, 我们希望每次 pull 新的代码之后, 能够通过 reload 自动升级成最新的服务, 但是默认情况下, 由于 pm2 的 reload 是零延时重启, 所以 pm2 直接重启会导致正在处理的请求丢失, 所以在 pm2 重启前, 应该先通知应用, 让应用能够进行以下处理:
1. 停止接收新的请求: 比如, server.close([callback])
2. 尽可能保证处理完正在处理的请求: 在 close 回调函数中使用 setTimeout 延时执行 process.exit(0);
3. 重启服务: 这里的重启肯定是希望有延时的, 因为要保证把上面的操作进行完, 所以就有了 kill_timeout 配置延时时间

怎么通知应用? 可以在 pm2 启动的文件中添加 SIGINT 的监听：
``` js
process.on('SIGINT', function() {})
```
:::