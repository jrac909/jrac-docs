## 字符串形式的 ref
``` js
<script type="text/babel">
class Person extends React.Component {
    showData1 = () => {
        const { input1 } = this.refs;
        console.log(input1.value);
    }

    showData2 = () => {
        const { input2 } = this.refs;
        console.log(input2.value);
    }


    render() {
        return (
            <div>
                <input ref="input1" placeholder="点击弹框" />&nbsp;
                <button onClick={ this.showData1 }>点击按钮弹出左侧输入内容</button>&nbsp;
                <input ref="input2" onBlur={ this.showData2 } placeholder="失焦事件" />
            </div>
        );
    }
}


ReactDOM.render(<Person />, document.getElementById('test'));
</script>
```

注意：
1. 官方现在已经不推荐字符串 ref 这种写法了
2. 字符串 ref 存在效率问题，官方给了一个 git pull 链接，里面有讨论

## 回调形式的 ref
``` js
<script type="text/babel">
    class Person extends React.Component {
        showData1 = () => {
            console.log(this.input1.value);
        }

        showData2 = () => {
            console.log(this.input2.value);
        }


        render() {
            return (
                <div>
                    <input ref={ currentNode => this.input1 = currentNode } placeholder="点击弹框" />&nbsp;
                    <button onClick={ this.showData1 }>点击按钮弹出左侧输入内容</button>&nbsp;
                    <input ref={ currentNode => this.input2 = currentNode } onBlur={ this.showData2 } placeholder="失焦事件" />
                </div>
            );
        }
    }


    ReactDOM.render(<Person />, document.getElementById('test'));
</script>
```

注意：
1. ref 接收的是一个回调函数，这个回调函数的参数其实就是这个真实节点，并且在解析这个节点的时候就会执行这个回调函数，所以我们可以直接将这个真实节点存放在实例对象上，也就是给 this 赋值，我们要用的时候，也直接在 this 上拿就好

### 回调形式的 ref 中回调函数会被执行多少次？
如果 ref 回调函数是以内联函数的方式定义的，在`更新`过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 dom 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 react 清空旧的 ref 并且设置新的。

注意：
1. 标签上写 ref={() => {}} 就是内联形式
2. 定义中说的是在更新的过程中才会被执行两次，什么时候是更新呢？就是重新调用 render 函数的时候，通过前面我们知道 render 函数会被调用 1+n 次，n 就是更新的次数。
3. 怎么解决问题 2？直接把匿名函数抽出来写成一个单独的实例属性函数，ref={ this.func }  func = （c）=> { this.refname = c }；这种方式来写，只有初始化的时候会调用一次这个回调函数，即使后面更新了页面，也不会重新调用这个回调函数
4. 一般实际项目中，用内联函数的更多，调用两次这个问题是完全可以忽略的。

补充：
1. jsx 中写注释：{/* 内容 */}

## createRef 形式（目前 react 官方最推荐的方式）
``` js
<script type="text/babel">
    class Person extends React.Component {
        input1Ref = React.createRef();
        input2Ref = React.createRef();

        showData1 = () => {
            console.log(this.input1Ref.current.value);
        }

        showData2 = () => {
            console.log(this.input2Ref.current.value);
        }


        render() {
            return (
                <div>
                    <input ref={ this.input1Ref } placeholder="点击弹框" />&nbsp;
                    <button onClick={ this.showData1 }>点击按钮弹出左侧输入内容</button>&nbsp;
                    <input ref={ this.input2Ref } onBlur={ this.showData2 } placeholder="失焦事件" />
                </div>
            );
        }
    }


    ReactDOM.render(<Person />, document.getElementById('test'));
</script>
```

注意：
1. React.createRef() 调用后可以返回一个容器，该容器可以存储被 ref 所标识的节点，该容器是一个只能装一个 ref，比如给两个 ref 设置了相同的容器，后者会覆盖前者
2. 在标签上直接传入这个容器就好
3. 使用的时候是从 ref 的 current 属性上拿值，这个是一个固定的属性
4. 最后总体提醒一下，不管是哪一种 ref，都应该尽可能的少用，比如我们可以通过 blur 事件的 event.target 去拿到值，就不要用 ref 去取