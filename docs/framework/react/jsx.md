## React 中不使用 jsx 来创建虚拟 dom

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
	
	<script type="text/javascript">
		// 1. 创建虚拟 dom
        // const VDOM = React.createElement(标签名, 标签属性, 标签内容);
		const VDOM = React.createElement('h1', { id: 'test' }, 'Hello, React');
		
		// 2. 渲染虚拟 dom 到页面
		ReactDOM.render(VDOM, document.getElementById('test'));
	</script>
</body>
</html>
```

注意：
1. 不需要 babel 进行转换了
2. script 标签上的 type 需要用 javascript
3. 利用 React.createElement api 来创建虚拟 dom

## React 中不使用 jsx 来创建一个嵌套的虚拟 dom

``` js
<script type="text/javascript">
		// 1. 创建虚拟 dom
		const VDOM = React.createElement('div', { id: 'test' }, React.createElement('span', {}, 'Hello, React'));
		
		// 2. 渲染虚拟 dom 到页面
		ReactDOM.render(VDOM, document.getElementById('test'));
	</script>
```

可以看到，这样需要一直不停的用 React.createElement api 来进行嵌套，这对于复杂结构是非常麻烦的。

注意：
1. jsx 代码经过 babel 转换后最终还是 React.createElement 代码，所以 jsx 其实就是 React.createElement 的一个语法糖

## jsx 语法规则
全称是 javascript xml

1. 定义虚拟 dom 时，不要用引号
2. 标签中混入 js 表达式时要用{}
3. 样式的类名指定不要用 class，要用 className
4. 内联样式，要用双花括号 key: value 的形式去写
5. 虚拟 dom 必须只有一个根标签
6. 标签必须闭合（自闭合也可以）
7. 标签首字母：
    - 如果是小写字母开头，则将该标签转为 html 中同名元素，如果 html 没有这个标签，则报错
    - 如果是大写字母开头，react 就去渲染对应的组件，如果这个组件没有定义，则报错

### 混入 js 表达式

``` jsx
const id = 'test';
const content = 'hello';
const vdom = (
    <h1 id={id}>
        { content }
    </h1>
)
```

### jsx 写内联样式

``` js
const vdom = (
    <h1>
        <span style={{ color: 'white'; fontSize: '14px' }}>hello, react!</span>
    </h1>
)
```

## xml 扩展知识

- xml 早期用于存储和传输数据

``` xml
<student>
    <name>Tom</name>
</student>
```

- 后面出现了 json，成为了更为好用、流行的数据格式。当然也不是完全不用 xml 了，比如微信公众号。

## js 表达式和语句的区别

1. 表达式：一个表达式会产生一个值, 可以放在任何一个需要值的地方，比如：
    (1). a
    (2). a + b
    (3). demo(1); 调用函数
    (4). arr.map();
    (5). function test() {}; // 定义一个函数也是表达式

2. 语句：
    (1). if() {}
    (2). for() {}
    (3). switch() { case: }


