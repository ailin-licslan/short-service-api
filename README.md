## 设计短链接服务 API 过程

### 技术栈： Express TypeScript Node Mongodb

### 简单在 B 站学习了 TypeScript 语法

### Win10 安装 node 环境 npm npx yarn mongodb 等环境都提前安装好

### 0.先打通 本地的 CRUD 功能

### 1.开发长链接的输入返回短链接路径

### 2.在浏览器输入 1 中返回的路径 可以直接（重定向）打开原始长连接的需要访问的内容

### 代码拉下来后 npm install 安装依赖的包

### yarn dev 启动本地服务就可以调试

### schema 设计

const schemaShortPath = Joi.object({
shortCode: Joi.string().trim(), //短链接
longUrl: Joi.string().trim().required(), //原始长链接
})

### 需要添加的基本依赖

#### import express from 'express' ==> express 依赖

#### import monk from 'monk' ==> 连接 mongodb 或者 mongoose 也行

#### import Joi from '@hapi/joi' ==> 校验 schema 规则 传参是否规范满足要求

#### import shortId from 'shortid' ==> 生成 shortId

#### import validUrl from 'valid-url' ==> 校验 Url

#### import config from 'config' ==> 读取配置

### 效果演示 在项目目录 image 结构中可以看到演示效果

图片  
![test-database-connection](https://github.com/ailin-licslan/short-service-api/blob/main/image/test-database.png)
