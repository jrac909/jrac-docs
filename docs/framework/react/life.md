## 生命周期
### 基础示例
``` js
<script type="text/babel">
class Life extends React.Component {
    state = {
        opacity: 1
    }

    death = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('test'));
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let { opacity } = this.state;

            opacity = opacity <= 0 ? 1 : opacity - 0.1;
            this.setState({ opacity: opacity })
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                <h2 style={{ opacity: this.state.opacity }}>这是一个变化中的标题</h2>
                <button onClick={ this.death }>销毁组件</button>
            </div>
        )
    }
}

ReactDOM.render(<Life />, document.getElementById('test'));
</script>
```

### ReactDOM.unmountComponentAtNode(dom)
销毁参数节点。

### componentWillMount
组件将要挂载

### componentDidMount
组件挂载完毕就被调用。

### componentWillUnmount
组件临销毁前的状态，这个方法执行后就执行销毁了。

### render
也属于生命钩子函数的一个。


### componentDidUpdate(preProps, preState, getSnapshotBeforeUpdate传的参数)

### 生命周期流程图（旧版本）
- 挂载时
    - 调用构造器方法
    - 调用 componentWillMount
    - 调用 render
    - 调用 componentDidMount

- 卸载组件
    - componentWillUnmount

- 更新状态 1 （setState）
    - 调用 shouldComponentUpdate：组件是否应该被更新，如果这个钩子返回 false，这次更新操作到这里就结束了。如果不写这个钩子函数，默认返回 true，但是只要写了，就一定要写返回值！true，继续执行后面的钩子函数。
    - 调用 componentWillUpdate
    - 调用 render
    - 调用 componentDidUpdate

- 更新状态 2 （forceUpdate:不经过阀门判断，直接进入更新流程，即使没有对状态做修改）
    - 调用 componentWillUpdate
    - 调用 render
    - 调用 componentDidUpdate

- 更新状态 3 （父组件 render：父组件执行了 render）
    - componentWillReceiveProps(props)：这里有个坑，`第一次传的 props 不会调用这个钩子，其实就像 will receive new props`，这个钩子函数还有一个参数, props 是新的 props
    - 调用 shouldComponentUpdate：组件是否应该被更新，如果这个钩子返回 false，这次更新操作到这里就结束了。如果不写这个钩子函数，默认返回 true，但是只要写了，就一定要写返回值！true，继续执行后面的钩子函数。
    - 调用 componentWillUpdate
    - 调用 render
    - 调用 componentDidUpdate

### 生命周期流程图（新版本：干掉了原来的三个，新提出来了两个）
#### 去掉了哪些钩子函数
1. 去掉的三个钩子函数分别是：componentWillMount、componentWillUpdate、componentWillReceiveProps
2. 在新版本 17.x 中，使用上面的三个方法并不会报错，但是会有警告，可以通过加 UNSAFE_ 前缀来调用上面的三个方法消除警告

#### 为什么会去掉这些钩子函数？
首先明确，让这些钩子函数过期，并不是因为钩子函数本身有安全性问题。而是因为，这些钩子函数总是被开发者误解和滥用，由于这些误解和滥用，可能会导致一些问题，并且 React 正在设计一个异步渲染，在异步渲染中，它们潜在的误用问题可能更大。

#### 执行流程
- 挂载时
    - 调用构造器方法
    - 调用 getDerivedStateFromProps
    - 调用 render
    - 调用 componentDidMount

- 卸载时
    - 调用 componentWillUnmount

- 更新状态 1 （setState）
    - 调用 getDerivedStateFromProps
    - 调用 shouldComponentUpdate
    - 调用 render
    - 调用 getSnapshotBeforeUpdate
    - 调用 componentDidUpdate

- 更新状态 2 （forceUpdate:不经过阀门判断，直接进入更新流程，即使没有对状态做修改）
    - 调用 getDerivedStateFromProps
    - 调用 render
    - 调用 getSnapshotBeforeUpdate
    - 调用 componentDidUpdate

- 更新状态 3 （父组件 render：父组件执行了 render）
    - 调用 getDerivedStateFromProps
    - 调用 shouldComponentUpdate
    - 调用 render
    - 调用 getSnapshotBeforeUpdate
    - 调用 componentDidUpdate

#### getDerivedStateFromProps
从 props 得到一个派生的状态。

``` js
static getDerivedStateFromProps(props) {
    return { count: 888 }
}
```

注意：
1. 必须是一个静态方法，所以必须写 static
2. 返回值必须是一个状态对象或者 null
3. 可以接收两个参数，参数是 (props, state)

问题：返回 null 的时候会怎么执行？
如果这个钩子函数返回 null，其实和不写这个钩子函数效果是一样的，所有的代码都会正常执行。

问题：返回状态对象会怎么执行？
其实就是返回一个对象，返回的这个对象会被合并设置到 state 上面，所以说它是一个派生的 state，但是这个 state 有一个特点，就是在当前组件对 state 进行更新，这个 state 是不会变化的，界面渲染也不会发生变化。

问题：为什么名字是 from props？
因为这个钩子函数可以接收一个参数 props，然后 return 这个 props，达到将 props 转为 state 的特点。

问题：什么时候使用？
适用于一个罕见的用例。即 state 的值在任何时候都取决于 props，但是派生状态会导致代码冗余，并使代码难以维护。

#### getSnapshotBeforeUpdate
在发生更改之前从 dom 中捕获一些信息，其实就是更新前的信息，这里面return的值会作为更新完成钩子函数的参数，这样可以做一些计算。

