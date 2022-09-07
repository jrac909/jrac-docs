## 一个简单的函数式组件例子

``` js
<script type="text/babel">
    // 1. 创建函数式组件
    function Demo() {
        return (
            <h1>我是用函数定义的组件（适用于【简单组件】的定义）</h1>
        );
    }

    // 2. 渲染组件到页面
    ReactDOM.render(<Demo />, document.getElementById('test'));
</script>
```

注意：
1. 组件的名字必须是大写
2. 传入的第一个参数要用标签的形式
3. 标签必须闭合

## 组件函数中的 this 是什么？
是 undefined，因为 babel 会默认开启严格模式，所以导致 this 不会指向全局对象 window，而是 undefined。

## 执行了 ReactDOM.render 之后，发生了什么？
1. react 解析组件标签，找到了相应的组件
2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟 dom 转为真实 dom，随后呈现在页面中