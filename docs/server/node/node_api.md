## process.cwd()
返回 node 进程的当前工作目录。

## fs.existsSync(path)
存在 path 目录返回 true, 否则返回 false。

## fs.mkdirSync(path)
创建 path 目录。

## fs.readFileSync(path[, options])
读取文件内容，可以指定编码。

## path.resolve([pa, pb, pc])
从右往左执行，可以理解为目前在目录 pb, 去按照 pc 路径找文件，得到一个结果，再按照处于 pa 的目录，去找这个结果。找到最后都不是根目录，就返回当前工作目录的绝对路径，比如：
``` js
path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
/**
 * 1. 当前在 static_files/png/ 下面，去找 ../gif/image.gif，得到 static_files/gif/image.gif
 * 2. 当前在 wwwroot 下面，去找上一步的结果 static_files/gif/image.gif，得到 wwwroot/static_files/gif/image.gif'
 * 3. 这时候还没有到根目录，相当于在前面补充一个根目录，得到最终结果 /home/myself/node/wwwroot/static_files/gif/image.gif 
 */
```