## 学习内容
- React 基础
- React-Router：路由
- PubSub：消息管理
- Redux：集中式状态管理
- Ant-Design：UI 组件库

## 学习前先明确几个问题
### 1. React 是什么？
官方说，是用于构建用户界面的 js 库。

按照原生 js 来讲，要写一个页面大概包括：
- 发送请求获取数据
- 处理数据（过滤、整理格式等）
- 操作 dom 呈现页面

React 主要就是处理第三步，操作 DOM 呈现页面，它只管视图，也就是说：React 是一个将数据渲染为 html 视图的开源 js 库。

### 2. 谁开发的？
由 Facebook 开发，且开源。

### 3. 为什么要学？
- 原生 js 操作 dom 繁琐、效率低（dom-api 操作 ui）
- 使用 js 直接操作 dom，浏览器会进行大量的重绘重排
- 原生 js 没有组件化编码方案，代码复用率低

#### 模块化和组件化？
模块化是对 js 代码分模块；组件化是对 html结构/css样式/js逻辑/资源全部分模块，一拆到底。

### 4. React 的特点
- 采用组件化模式、声明式编码，提高开发效率及组件复用率。
- 在 React Native 中可以使用 React 语法进行移动端开发。
- 使用虚拟 dom + 优秀的 diffing 算啊，尽量减少与真实 dom 的交互。

#### 4.1 命令式编码？
比如要修改一个 dom 的颜色，首先需要获取一个盒子，然后修改颜色，每一步都是一个命令代码。

#### 4.2 声明式编码？
比如要修改一个 dom 的颜色，直接调用一个方法，告诉它设置为蓝色，react 就自动帮我们做了。

## 基础内容
### 引入需要的 js 文件（必要的三个文件）
- react.development.js：react 核心库
- react-dom.development.js：react 扩展库：扩展的功能是，react 帮忙操作 dom
- babel.min.js：react 写的是 jsx，但是浏览器只认 js，所以 babel 将 jsx 转为 js

注意：react.development.js 必须在 react-dom.development.js 前面引入

### 编写一个基础的 hello react 例子

``` js
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>hello react</title>
</head>
<body>
	<!-- 准备一个容器 -->
	<div id="test"></div>
	<!-- 引入 react 核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入 react dom 扩展库 -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入 babei 将 jsx 转为 js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel">
		// 1. 创建虚拟 dom
		const VDOM = <h1>Hello, React</h1>; /* 此处一定不要写引号，因为不是字符串 */
		
		// 2. 渲染虚拟 dom 到页面
		// 引入 react 两个 js 文件后，多了两个全局变量：React 和 ReactDOM
		// ReactDOM.render(虚拟dom, 渲染到哪个容器);
		ReactDOM.render(VDOM, document.getElementById('test'));
	</script>
</body>
</html>
```

注意：
1. 在写 script 代码的时候，script 标签声明的类型必须是 text/babel，因为默认是 js，但是我们这里写的是 jsx，并且我们需要通过 babel 去转换。注意，这个是必须要写的。
2. 上面这种引入 js 的方式并不适合应用于生产环境，因为浏览器读取到代码才会发现是 babel 解析，所以这样可能会导致一段时间的白屏。
3. react 也提供了一个开发者调试工具 React DEVTools

### 虚拟 dom 到底是个什么东西？
打印出来一看，其实就是一个对象 Object

- 本质是 Object 类型的对象（一般对象）
- 真实 dom 比较重，虚拟 dom 比较轻，因为虚拟 dom 是 react 内部在用，不需要真实 dom 上那么多的属性（看真实 dom 可以在打印真实 dom 前打断点）。
- 虚拟 dom 最终会被 react 转换为真实 dom，呈现在页面上。

### 编写一个动态渲染的列表
``` js
<script type="text/babel">
		// 模拟一些数据
		const data = ['angular', 'react', 'vue']
		
		// 创建虚拟 dom
		const vdom = (
			<div>
				<ul>
					{
						data.map((item, index) => {
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		)

		// 渲染 dom 虚拟到页面
		ReactDOM.render(vdom, document.getElementById('test'));
	</script>
```

注意：这里只有表达式能渲染，并且表达式会返回一个值，我们只要保证返回的这个值也是虚拟 dom 就好。
