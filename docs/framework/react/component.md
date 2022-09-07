## 受控组件和不受控组件
### 不受控组件
``` js
<script type="text/babel">
class Demo extends React.Component {
    inputRef = React.createRef();

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`你的用户名是${ this.inputRef.current.value }`);
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input ref={ this.inputRef } type="text" name="username" />
                <button>提交</button>
            </form>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('test'));
</script>
```

这里我们要取的是 input 的值，但是是在提交的时候，再去获取这个值，这个值不受 input 控制，这种我们就称为非受控组件。

### 受控组件
``` js
<script type="text/babel">
class Demo extends React.Component {
    state = {
        username: '',
    }

    changeName = (e) => {
        this.setState({ username: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`你的用户名是${ this.state.username }`);
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input onChange={ this.changeName } type="text" name="username" />
                <button>提交</button>
            </form>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('test'));
</script>
```

- input 的值只要发生改变，就触发事件修改，其他地方取 input 的值完全是由 input 自己控制的，所以我们称它为受控组件
- 最好还是用受控组件，官方也不推荐过度使用 ref