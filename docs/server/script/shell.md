[[toc]]

## 基础
### 资料
1. [shell 在线工具](https://www.runoob.com/try/runcode.php?filename=helloworld&type=bash)

### 概念
#### Shell
是一个用 C 语言编写的程序, 这个应用程序提供了一个界面, 用户可以通过这个界面访问操作系统服务。

#### Shell 脚本
为 shell 编写的脚本程序。

#### Shell 环境
首先明确, Shell 脚本在哪里都能编写, 只要有一个能编写代码的文本编辑器就好, 但是要执行脚本, 就需要一个脚本解释器。Linux 的 Shell 种类很多, 也就是 Shell 应用程序种类很多。常见的有：
- Bourne Shell (/usr/bin/sh 或 /bin/sh)
- Bourne Again Shell (/bin/bash)
- C Shell (/usr/bin/csh)
- K Shell (/usr/binksh)
- Shell for Root (/sbin/sh)

::: warning 注意
- Bash 用的比较多, 因为它易用且免费, 它也是大多数 Linux 系统默认的 Shell。
- 一般情况, Bourne Shell 和 Bourne Again Shell不做区分, 想 #!/bin/sh 可以改为 #!/bin/bash
#! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序
- shell 脚本的扩展名并不一定为 sh, 扩展名并不影响脚本执行, 用 #! 指定即可
:::

### 运行 shell 脚本
1. 作为可执行程序
``` shell
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```
<font color=red>注意: </font><font size=2>一定要写成 ./test.sh，而不是 test.sh，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。</font>

2. 作为解释器参数
直接运行解释器，其参数就是 shell 脚本的文件名，如：
``` shell
/bin/sh test.sh
/bin/php test.php
```
<font size=2>这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。</font>

### Shell 变量
#### 定义变量
``` shell
变量名=值
```

<font color=red>注意: </font>
- 变量名和等号之间不能有空格
- 命名只能用英文、数字、下划线, 变量名不能以数字开头
- 不能使用 bash 里的关键字

#### 使用变量
``` shell
your_name="qinjx"
echo $your_name
echo ${your_name}
```
变量名外面的花括号是可选的，加不加都行, 推荐给所有变量加上花括号，这是个好的编程习惯。

#### 只读变量
使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。
``` shell
#!/bin/bash

myUrl="https://www.google.com"
readonly myUrl
myUrl="https://www.runoob.com"
```

#### 删除变量
使用 unset 命令可以删除变量。变量被删除后不能再次使用。unset 命令不能删除只读变量。语法：
``` shell
#!/bin/sh

myUrl="https://www.runoob.com"
unset myUrl
```

#### 变量类型
1. 局部变量 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
2. 环境变量 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
3. shell变量 shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

### Shell 字符串
字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。

#### 单引号
- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

#### 双引号
``` shell
your_name="runoob"
str="Hello, I know you are \"$your_name\"! \n"
echo -e $str
```

- 双引号里可以有变量
- 双引号里可以出现转义字符

#### 拼接字符串
``` shell
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1

# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
```

输出结果：
``` shell
hello, runoob ! hello, runoob !
hello, runoob ! hello, ${your_name} !
```

#### 获取字符串长度
``` shell
string="abcd"
echo ${#string}   # 输出 4
```
变量为数组时，${#string} 等价于 ${#string[0]}:

#### 提取子字符串
以下实例从字符串第 2 个字符开始截取 4 个字符：
``` shell
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo
```
注意：第一个字符的索引值为 0。

#### 查找子字符串
查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)：
``` shell
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
```

### Shell 数组
bash支持一维数组（不支持多维数组），并且没有限定数组的大小。
类似于 C 语言，数组元素的下标由 0 开始编号。获取数组中的元素要利用下标，下标可以是整数或算术表达式，其值应大于或等于 0。

#### 定义数组
``` shell
array_name=(value0 value1 value2 value3)

array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
```
可以不使用连续的下标，而且下标的范围没有限制。

