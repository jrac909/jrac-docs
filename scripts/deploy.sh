#!/usr/bin/env sh

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 提交代码到仓库
git init
git add .
git commit -m 'deploy'

git push -f git@github.com:jrac909/blog.git master

# 退出目录
cd -