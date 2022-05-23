## PM2 快速开始
pm2 是一个守护进程管理器, 它可以用来管理和维护在线应用。pm2 以简单的命令行形式提供服务, 并且可以通过 npm 安装。

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

