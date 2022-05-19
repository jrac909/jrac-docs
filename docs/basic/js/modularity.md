## 背景
&emsp;&emsp;最初的前端页面是简单的、功能单一的，js 也只用来处理一些类似表单验证的简单操作，所以前期的 js 版本并不存在模块化这个概念。但是，前端页面一直在进化，js 也被更广泛的应用，一个前端应用包含着复杂的业务逻辑、复杂的渲染效果、庞大的功能，这些都依赖于大量的 js 操作。所以，为了更好的开发和维护，js 开始了模块化的探索。

## 非模块化有什么问题？
- 命名的冲突，特别是现在的应用，很多都是使用第三方库进行开发，如果所有变量都保存在全局，一定会有冲突的情况。
- 需要手动控制库的依赖关系还有依赖顺序，记得之前的项目，在开发时候使用一个依赖 jQ 的库，还必须先去加载 jQ，然后版本不匹配也会造成一系列问题。


## 在真正的模块化前，我们尝试过哪些方法解决上述问题？