## 部署到 github
主要流程如下：
1. build 打包生成打包后文件, 默认配置输出到 dist 文件夹下
``` bash
yarn docs:build
```
2. 进入 dist 文件夹，将 dist 中打包后的代码提交到已经创建好的 git 仓库
``` bash
git init
git add .
git commit -m 'deploy'

git push -f git@github.com:jrac909/blog.git master
```

执行上面几步就可以完成部署了，只是每一次都要执行这么多相同的命令，比较繁琐，我们可以写一个脚本文件自动执行。
1. 在项目代码下创建 scripts/deploy.sh (文件路径、脚本文件的名字都可以自定义，这个是没有任何影响的)
2. deploy.sh 中写入如下内容：
``` bash
#!/usr/bin/env sh

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 提交代码到仓库，提交信息自定义
git init
git add .
git commit -m 'deploy'

# 替换为自己的仓库地址
git push -f git@github.com:jrac909/blog.git master

cd -
```
3. 通过 npm scripts 执行这个脚本，即在 package.json 的 scripts 添加：
``` json
"scripts": {
    "docs:deploy": "powershell scripts/deploy.sh"
  },
```
4. 运行 `yarn docs:deploy` 就可以自动部署了