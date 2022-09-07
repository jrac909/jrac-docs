## 基础概念
- 是组件实例对象中的一个核心属性（函数式组件是没有的，因为它连自己的 this 都没有 -> hooks 可以，之后再拓展）

## state 是怎么赋值和使用的？
``` js
<script type="text/babel">
    // 1. 创建类组件
    class Weather extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isHot: true,
            }
        }

        render () {
            return (
                <h1>今天天气很{ this.state.isHot ? '炎热': '凉爽' }</h1>
            );
        }
    }
    

    // 2. 渲染组件到页面
    ReactDOM.render(<Weather />, document.getElementById('test'));
</script>
```

注意：可以很明显的看出来，其实这里完全就是利用了类的基本特性，我们在构造函数中初始化了 state 数据，然后在实例对象中调用就好。

## react 中的事件绑定

``` js
// 1. 创建类组件
class Weather extends React.Component {
    constructor(props) {
        super(props);
        // 初始化状态
        this.state = {
            isHot: true,
        }
    }

    render () {
        return (
            <h1 onClick={ handleClick }>今天天气很{ this.state.isHot ? '炎热': '凉爽' }</h1>
        );
    }
}


// 2. 渲染组件到页面
ReactDOM.render(<Weather />, document.getElementById('test'));

function handleClick() {
    console.log('标题被点击了');
}
```

注意：
1. react 是支持原生的事件绑定的，比如 addEventListener 和 直接 dom.onclick，但是不支持内联的 onclick 事件绑定，因为 react 重写了内联的事件绑定方法，新的方法名 on 后面的第一个单词是大写，比如：onClick，onBlur  -> 重新封装是为了更好的兼容性
2. 需要给事件传递的是一个函数，因为不是字符串，所以需要写在 {} 中
3. 同理，因为需要传递的是一个函数，所以 {} 中的函数名后面不能加 () 进行调用，不然就会直接调用函数，并且传递函数调用的返回值
4. react 中的事件是通过事件委托方式处理的（委托给组件最外层的元素） -> 为了高效
5. 通过 event.target 得到发生事件的 dom 元素对象 -> 不要过度使用 ref

## 修改 state 值会遇到的一些问题

``` js
<script type="text/babel">
    // 1. 创建类组件
    class Weather extends React.Component {
        constructor(props) {
            super(props);
            // 初始化状态
            this.state = {
                isHot: true,
            }
            this.changeWeather = this.changeWeather.bind(this);
        }

        render () {
            return (
                <h1 onClick={ this.changeWeather }>今天天气很{ this.state.isHot ? '炎热': '凉爽' }</h1>
            );
        }

        changeWeather () {
            console.log('标题被点击了', this);
        }
    }
    

    // 2. 渲染组件到页面
    ReactDOM.render(<Weather />, document.getElementById('test'));
</script>
```

注意：
- 因为我们需要在函数中使用实例对象上的值，并且为了让组件相关的事件都封装在一起，所以最好把事件也定义在类中，而不是类外边
- 需要注意的是 onClick 中只是先在实例对象上取函数，这时候并没有执行函数，所以会发生 this 丢失，但是我们要在 changeWeather 中使用 this 怎么办？所以我们可以通过显示绑定 this，比如 this.changeWeather = this.changeWeather.bind(this); 这样就会在实例对象上绑定一个属性 changeWeather，这个属性是一个函数，并且函数的 this 指向实例对象，那原本的 changeWeather 方法呢？需要明确，原本的 changeWeather 方法是实例方法，它挂载在原型对象的 proto 上面，所以此时会有两个 changeWeather 方法，而 onClick={ this.changeWeather } 调用传入的是实例属性而不是 proto 属性，所以，这两个函数名字并不一定要相同。一定要理清楚这个关系。

## setState 方法
问题：如果直接通过 this.state 去修改 state 值, state 的值能够修改，但是界面并不会重新渲染, react 并不像 vue 做了数据劫持然后自动做渲染, 所以我们需要调用 react 提供的一个方法 setData 来重新渲染界面。

``` js
changeWeather () {
    const isHot = this.state.isHot;
    this.setState({ isHot: !isHot });
}
```

注意：这里 setData 是一个合并的操作，也就是说，调用 setState 设置的值不会替换整个 state，只是替换其中的部分属性。

## 提问
### 构造器调用几次？
1次

### render 函数调用几次？
1 + n 次，1 是最开始的一次渲染，n 是状态更新的次数，也就是 setData 每修改一次状态，就会调用一次 render 函数。

## state 的简写方式
``` js
<script type="text/babel">
// 1. 创建类组件
class Weather extends React.Component {
    state = { isHot: true }

    render () {
        return (
            <h1 onClick={ this.changeWeather }>今天天气很{ this.state.isHot ? '炎热': '凉爽' }</h1>
        );
    }

    changeWeather = () => {
        const isHot = this.state.isHot;
        this.setState({ isHot: !isHot });
    }
}


// 2. 渲染组件到页面
ReactDOM.render(<Weather />, document.getElementById('test'));
</script>
```

注意：
1. 在类 class 中直接给一个变量赋值，其实这个值也是挂在实例对象上的属性，只是说 constructor 中赋值可以设置为参数，如果我们不需要在初始化的时候设置为参数，我们可以直接在构造函数外部写 state
2. 之前写成原型方法，导致原型对象 proto 上有一个 changeWeather，然后显示绑定 this 的时候，又创建了一个 changeWeather 方法在实例对象上，这样就挂载了重复的值，没有必要，所以直接将方法设置为变量，直接挂载在实例对象上
3. 方法直接赋值给变量，this 也会丢失，所以这里需要写成箭头函数，这样方法内部的 this 就指向了实例对象