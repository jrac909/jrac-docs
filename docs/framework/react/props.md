## props 的基础使用
``` js
<script type="text/babel">
class Person extends React.Component {
    render() {
        const { name, age, sex } = this.props;
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>年龄：{age}</li>
                <li>性别：{sex}</li>
            </ul>
        );
    }
}

ReactDOM.render(<Person name="xiaowang" age="25" sex="女" />, document.getElementById('test'));
ReactDOM.render(<Person name="xiaoji" age="25" sex="男" />, document.getElementById('test2'));
</script>
```

注意：
1. 传递方式是在标签上写值
2. react 内部将值设置到实例对象 props 属性上面，所以我们直接通过 this.props.属性值就可以拿到

## 怎么简写传递的多个 props 属性
``` js
const p = { name: 'xiaowang', age: 25, sex: '女' }
ReactDOM.render(<Person {...p} />, document.getElementById('test'));
```

注意：
1. 在原生 js 中，对象是不能被解构的，比如直接使用 ...p 是会报错的，但是呢，我们可以通过 {...p} 来进行对象的复制操作, 还有 { ...p, name: 'jiran' } 来进行属性的替换
2. 需要注意，这里 react 中标签上的 {...p} 和原生中的解构并不是一个东西，它完全是自己定义的东西，而且，{} 和 ...p 并不是搭配使用的，{} 表示其中是变量, ...p 才是展示对象，只要有 babel 和引入的 react，...p 操作就不会报错，但是也有限制，就是它只能在标签上使用才有效，如果我们用在其他地方，比如直接打印 ...p，是不会有任何值的。

## 对 props 进行限制
``` js
<!-- 引入 prop-types，用于对组件标签进行类型限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
    class Person extends React.Component {
        render() {
            const { name, age, sex } = this.props;
            return (
                <ul>
                    <li>姓名：{name}</li>
                    <li>年龄：{age}</li>
                    <li>性别：{sex}</li>
                </ul>
            );
        }
    }

    // 限制属性类型
    Person.propTypes = {
        name: PropTypes.string.isRequired, // 字符串类型并且必传
        sex: PropTypes.string, // 字符串类型
        age: PropTypes.number, // 数值类型
        action: PropTypes.func, // 函数类型
    };

    // 限制属性默认值
    Person.defaultProps = {
        sex: '男',
        age: 18
    }

    ReactDOM.render(<Person name='xiaowang' sex="女" action={fun1} />, document.getElementById('test'));

    function fun1() {
        console.log('一个函数');
    }
</script>
```

注意：
1. 需要引入类型 js 文件
2. 传递的如果是函数类型，取 PropTypes.func，因为 function 会和函数声明重名，string，number 就不会重名，因为原生的类型写法是大写
3. 是给 propTypes 设置类型，取类型是在 PropTypes 上面取
4. 不能在组件内部对 props 做修改

## props 的简写方式
可以看到，我们限制 props 的类型和默认值都是直接加在类上面的，所以其实就是添加了静态属性。所以我们直接按照类 class 静态属性来设置就好了。

``` js
class Person extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        sex: PropTypes.string,
        age: PropTypes.number,
        action: PropTypes.func,
    };

    static defaultProps = {
        sex: '男',
        age: 18
    }

    render() {
        const { name, age, sex } = this.props;
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>年龄：{age}</li>
                <li>性别：{sex}</li>
            </ul>
        );
    }
}
```

## React 中类组件的构造函数有什么用？
根据官方文档，有以下两个作用，可以看出，我们都可以用更简便的方式来进行编码，所以构造函数基本不需要写：
1. 通过给 this.state 赋值对象来初始化内部 state
2. 为事件处理函数绑定实例

## React 在构造函数中调用和不调用 super(props) 有什么区别？
在实际操作中可以发现，react 中即使不写 super 语句代码也不会报错，之所以要写 super，是因为如果不写 super(props)，不会调用父组件的构造函数，所以也不会在实例上挂载 props，导致我在构造函数中无法通过 this.props 来查看属性。
但是，构造函数的参数就是 props，所以如果我们真的需要在构造函数中获取 props 来判断什么东西，那我们直接使用参数 props 就好，没有必要 this.props, 这一点注意一下就好。

## 函数式组件中的 props
前面提到，函数式组件是没有自己的 this 的，所以我们无法去获取 this.state, this.props, this.refs，但是，我们其实可以在函数式组件中拿到 props，因为函数可以接收参数！

``` js
<script type="text/babel">
function Person(props) {
    const { name, age, sex } = props;

    return (
        <ul>
            <li>姓名：{name}</li>
            <li>年龄：{age}</li>
            <li>性别：{sex}</li>
        </ul>
    );
}

Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number,
    action: PropTypes.func,
};

Person.defaultProps = {
    sex: '中立',
    age: 18
}

ReactDOM.render(<Person name='xiaowang' age={18} sex="女" />, document.getElementById('test'));
</script>
```

注意：
1. 传递参数还是在标签上，以函数组件的参数接收
2. props 的限制只能写在函数外部