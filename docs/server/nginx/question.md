### 代理请求头自动去除带下划线参数
#### 【问题描述】
场景：发布到生产环境之后, 携带 abc_no 的请求全都是 400, 但是 swagger 上没有问题, 检查了一下两边的请求, 发现完全是一样的, 从浏览器检查请求头也是带上 abc_no 的。

#### 【解决】
nginx 的配置文件中, underscores_in_headers 属性需要设置为 on, 而不是 off, 为 off 会自动去除带下划线的参数。

#### 【资料】
[1. 代理请求头自动去除带下划线参数](https://blog.csdn.net/weixin_48314739/article/details/110917734)