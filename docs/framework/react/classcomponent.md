## 创建一个基础 Person 类

``` js
class Person {

}

const p1 = new Person();

console.log(p1); // 这里输出 Person{}, {} 表示输出的是一个实例对象，前面表示这个实例对象是由 Person new 出来的
```

## 类初始化一些信息

``` js
class Person {
    // 构造器方法
    constructor(name, age) {
        // 构造器中的 this 是类的实例对象
        this.name = name;
        this.age = age;
    }

    // 一般方法
    speak() {
        // speak 方法放在类的原型对象上，供实例使用
        // 通过 Person 实例调用 speak 时，speak 中的 this 就是 Person 实例（call、apply 等除外）
        console.log(`我叫${this.name}, 我年龄是${this.age}`);
    }
}

const p1 = new Person('tom', 18);
const p2 = new Person('jerry', 19);

p1.speak();
p2.speak();
```

## 继承 Person 类

``` js
// 这样不用写 constructor，会继承父类的构造函数
class Student extend Person {
}

const s1 = new Student('小张', 15);

// 如果子类有自己独有的属性
class Student extend Person {
    // 这时候 constructor 可以理解为覆盖了父类的构造函数，但是，子类又不能完全自己写属性赋值，必须要写 super()，调用父类的构造器，一方面少些代码，另一方面保证了继承
    // 注意：super 必须在最前面调用
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    // 注意：子类可以调用父类的实例方法，所以，实例方法是供实例对象及其后代实例对象调用的，只是说直接实例化的对象，方法在__proto__上，后代的实例对象，方法在 __proto__.__proto__..... 原型链上

    // 重写方法
    speak() {
        // 这时候在第一个 __proto__ 就能找到 speak 方法了，就不会顺着原型链往下找了
        console.log(`我叫${this.name}, 我年龄是${this.age}，我读的是${this.grade}年级`);
    }
}

const s1 = new Student('小张', 15, '高一');
```

## 创建类式组件
``` js
<script type="text/babel">
// 1. 创建类组件
class MyComponent extends React.Component {
    render() {
        return (
            <h1>我是用类定义的组件（适用于复杂组件）</h1>
        );
    }
}


// 2. 渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById('test'));
</script>
```

### 类中的 render 方法是放在哪里的？因为这也是一个实例方法
这个值挂在类的原型上，即 MyComponent.prototype

### ReactDOM.render 执行的过程
1. react 解析组件标签，找到对应组件
2. react 发现组件是使用类定义的，随后 new 出来该类的实例，并通过该实例调用到原型上的 render 方法
3. 将 render 方法的虚拟 dom 转为真实 dom，随后呈现在页面上

### render 方法中的 this 是什么？
根据上面写的所有内容可以清楚的知道，render 中的 this，指向 react 帮我们 new 出来的 MyComponent 实例对象

## 什么是简单组件什么是复杂组件？
如果你的组件是有状态的，那么就是复杂组件；如果组件没有状态，那么就是简单组件。