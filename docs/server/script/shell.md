[[toc]]

## 基础
### 资料
1. [shell 在线工具](https://www.runoob.com/try/runcode.php?filename=helloworld&type=bash)
2. [菜鸟教程](https://www.runoob.com/linux/linux-shell-variable.html)

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

<font color=red>注意: </font><font size=2>写一个 test.sh 文件, 在 mac 终端执行 ./test.sh, 这时候会提示没有权限，然后执行 vim ./test.sh, 这时候发现是可以查看的, 其实是没有赋予执行权限，这时候执行 chmod 777 ./test.sh 就可以了</font>

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
<font color=red>注意: </font>第一个字符的索引值为 0。

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

#### 读取数组
``` shell
${数组名[下标]}
```
使用 @ 符号可以获取数组中的所有元素，例如：
``` shell
echo ${array_name[@]}
```

#### 获取数组的长度
获取数组长度的方法与获取字符串长度的方法相同，例如：
``` shell
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```

### Shell 注释
#### 单行注释
以 # 开头的行就是注释，会被解释器忽略。

#### 多行注释
``` shell
:<<EOF
注释内容...
注释内容...
注释内容...
EOF
```

EOF 也可以使用其他符号:

``` shell
:<<'
注释内容...
注释内容...
注释内容...
'

:<<!
注释内容...
注释内容...
注释内容...
!
```

### 传递参数
我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……

以下实例我们向脚本传递三个参数，并分别输出，其中 $0 为执行的文件名（包含文件路径）：

``` shell
#!/bin/bash

echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

为脚本设置可执行权限，并执行脚本，输出结果如下所示：

``` shell
$ ./test.sh 1 2 3
Shell 传递参数实例！
执行的文件名：./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
```

另外，还有几个特殊字符用来处理参数:

| 参数处理        | 说明           |
| ------------- |:-------------:|
| $#      | 传递到脚本的参数个数 |
| $*      | 以一个单字符串显示所有向脚本传递的参数。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。      |
| $$ | 脚本运行的当前进程ID号      |
| $! | 后台运行的最后一个进程的ID号      |
| $@ | 与$*相同，但是使用时加引号，并在引号中返回每个参数。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。      |
| $- | 显示Shell使用的当前选项，与set命令功能相同。      |
| $? | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误      |

**$\* 与 $@ 区别**
- 相同点：都是引用所有参数。
- 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）。

### Shell 运算符
原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。
expr 是一款表达式计算工具，使用它能完成表达式的求值操作。
例如，两个数相加：
``` shell
#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为 : $val"
```

::: warning 注意
- 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
- 完整的表达式要被 ` ` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。
:::

#### 算术运算符
下表列出了常用的算术运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符        | 说明           | 举例 |
| ------------- |:-------------:|:----:|
| +      | 加法 | `expr $a + $b` 结果为 30。 |
| -      | 减法 | `expr $a - $b` 结果为 -10。 |
| *      | 乘法 | `expr $a \* $b` 结果为 200。 |
| /      | 除法 | `expr $b / $a` 结果为 2。 |
| %      | 取余 | `expr $b % $a` 结果为 0。 |
| =      | 赋值 | a=$b 把变量 b 的值赋给 a。 |
| ==      | 相等。用于比较两个数字，相同则返回 true。 | [ $a == $b ] 返回 false |
| !=      | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ] 返回 true |

::: warning 注意
- 条件表达式要放在方括号之间，并且要有空格，例如: [$a==$b] 是错误的，必须写成 [ $a == $b ]。
- 乘号(*)前边必须加反斜杠(\)才能实现乘法运算
- 在 MAC 中 shell 的 expr 语法是：$((表达式))，此处表达式中的 "*" 不需要转义符号 "\" 
:::

#### 关系运算符
关系运算符只支持数字，不支持字符串，除非字符串的值是数字。
下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符        | 说明           | 举例 |
| ------------- |:-------------:|:----:|
| -eq      | 检测两个数是否相等，相等返回 true。 | [ $a -eq $b ] 返回 false。 |
| -ne      | 检测两个数是否不相等，不相等返回 true。 | [ $a -ne $b ] 返回 true。 |
| -gt      | 检测左边的数是否大于右边的，如果是，则返回 true。 | [ $a -gt $b ] 返回 false |
| -lt      | 检测左边的数是否小于右边的，如果是，则返回 true。 | [ $a -lt $b ] 返回 true。 |
| -ge      | 检测左边的数是否大于等于右边的，如果是，则返回 true。 | [ $a -ge $b ] 返回 false。 |
| -le      | 检测左边的数是否小于等于右边的，如果是，则返回 true。 | [ $a -le $b ] 返回 true。 |

#### 布尔运算符
下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20

| 运算符        | 说明           | 举例 |
| ------------- |:-------------:|:----:|
| !      | 非运算，表达式为 true 则返回 false，否则返回 true。 | [ ! false ] 返回 true。 |
| -o      | 或运算，有一个表达式为 true 则返回 true。 | [ $a -lt 20 -o $b -gt 100 ] 返回 true。 |
| -a      | 与运算，两个表达式都为 true 才返回 true。 | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |

#### 逻辑运算符
以下介绍 Shell 的逻辑运算符，假定变量 a 为 10，变量 b 为 20:

| 运算符        | 说明           | 举例 |
| ------------- |:-------------:|:----:|
| &&      | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false |
| \|\|      | 逻辑的 OR | [[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |

#### 字符串运算符
下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：

| 运算符        | 说明           | 举例 |
| ------------- |:-------------:|:----:|
| =      | 检测两个字符串是否相等，相等返回 true。 | [ $a = $b ] 返回 false。 |
| !=      | 检测两个字符串是否不相等，不相等返回 true。 | [ $a != $b ] 返回 true。 |
| -z      | 检测字符串长度是否为0，为0返回 true。 | [ -z $a ] 返回 false。 |
| -n      | 检测字符串长度是否不为 0，不为 0 返回 true。 | [ -n "$a" ] 返回 true。 |
| $      | 检测字符串是否为空，不为空返回 true。 | [ $a ] 返回 true。 |

#### 文件测试运算符
文件测试运算符用于检测 Unix 文件的各种属性。

| 运算符        | 说明           | 举例 |
| ------------- |:-------------:|:----:|
| -b file      | 检测文件是否是块设备文件，如果是，则返回 true。 | [ -b $file ] 返回 false |
| -c file      | 检测文件是否是字符设备文件，如果是，则返回 true。 | [ -c $file ] 返回 false |
| -d file      | 检测文件是否是目录，如果是，则返回 true。 | [ -d $file ] 返回 false |
| -f file      | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true | [ -f $file ] 返回 true |
| -g file      | 检测文件是否设置了 SGID 位，如果是，则返回 true | [ -g $file ] 返回 false |
| -k file      | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。 | [ -k $file ] 返回 false |
| -p file      | 检测文件是否是有名管道，如果是，则返回 true | [ -g $file ] 返回 false |
| -u file      | 检测文件是否设置了 SUID 位，如果是，则返回 true。 | [ -u $file ] 返回 false |
| -r file      | 检测文件是否可读，如果是，则返回 true | [ -r $file ] 返回 false |
| -w file      | 检测文件是否可写，如果是，则返回 true | [ -w $file ] 返回 false |
| -x file      | 检测文件是否可执行，如果是，则返回 true | [ -x $file ] 返回 false |
| -s file      | 检测文件是否为空（文件大小是否大于0），不为空返回 true | [ -s $file ] 返回 false |
| -e file      | 检测文件（包括目录）是否存在，如果是，则返回 true | [ -e $file ] 返回 false |
| -S file      | 判断某文件是否 socket | [ -S $file ] 返回 false |
| -L file      | 检测文件是否存在并且是一个符号链接。 | [ -L $file ] 返回 false |


### Shell echo
#### 显示普通字符串
``` shell
echo "It is a test" // 双引号可以省略
```

#### 显示转义字符
``` shell
echo "\"It is a test\""
```

#### 显示变量
``` shell
echo "$name It is a test"
```

#### 显示换行
``` shell
echo -e "OK! \n" # -e 开启转义
```

#### 显示不换行
``` shell
echo -e "OK! \c" # -e 开启转义 \c 不换行
```

#### 显示结果定向至文件
``` shell
echo "It is a test" > myfile
```

#### 原样输出字符串，不进行转义或取变量(用单引号)
``` shell
echo '$name\"'
```

#### 显示命令执行结果
``` shell
echo `date`
```

### Shell printf

### Shell 流程控制
#### if 没有 else
``` shell
if 判断条件; then
   执行内容
fi
```

#### case ... esac
case ... esac 为多选择语句，与其他语言中的 switch ... case 语句类似，是一种多分支选择结构，每个 case 分支用右圆括号开始，用两个分号 ;; 表示 break，即执行结束，跳出整个 case ... esac 语句，esac（就是 case 反过来）作为结束标记。
可以用 case 语句匹配一个值与一个模式，如果匹配成功，执行相匹配的命令。
case ... esac 语法格式如下：

``` shell
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2)
    command1
    command2
    ...
    commandN
    ;;
esac
```

### Shell 输入/输出重定向
大多数 UNIX 系统命令从你的终端接受输入并将所产生的输出发送回​​到您的终端。一个命令通常从一个叫标准输入的地方读取输入，默认情况下，这恰好是你的终端。同样，一个命令通常将其输出写入到标准输出，默认情况下，这也是你的终端。

#### 重定向命令列表

| 命令        | 说明           |
| ------------- |:-------------:|
| command > file      | 将输出重定向到 file |
| command < file      | 将输入重定向到 file |
| command >> file      | 将输出以追加的方式重定向到 file |
| n > file      | 将文件描述符为 n 的文件重定向到 file |
| n >> file      | 将文件描述符为 n 的文件以追加的方式重定向到 file |
| n >& m      | 将输出文件 m 和 n 合并 |
| n <& m      | 将输入文件 m 和 n 合并 |
| << tag      | 将开始标记 tag 和结束标记 tag 之间的内容作为输入 |

::: tip 文件描述符
- 0 是标准输入（STDIN）
- 1 是标准输出（STDOUT）
- 2 是标准错误输出（STDERR）
:::

#### /dev/null 文件

``` shell
$ command > /dev/null
```

::: tip 注意
- 如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null
- /dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果。
:::

## 其他
### exit
- exit 0 : 正常运行程序并退出程序
- exit 1 : 非正常运行导致退出程序

::: tip $?
通过 exit 退出程序后, 可以通过 $? 拿到退出的 code
:::