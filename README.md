设计短链接服务 API 过程
技术栈： Express TypeScript Node Mongodb
简单学习了 TypeScript 语法
Win10 安装 node 环境 npm npx yarn mongodb 等环境都提前安装好

0.先打通 本地的 CRUD 功能

1.开发长链接的输入返回短链接路径

2.在浏览器输入 1 中返回的路径 可以直接（重定向）打开原始长连接的需要访问的内容

在项目目录 image 结构中可以看到演示效果
代码拉下来后 npm install 安装依赖的包
yarn dev 启动本地服务就可以调试

schema 设计
const schemaShortPath = Joi.object({
shortCode: Joi.string().trim(), //短链接
longUrl: Joi.string().trim().required(), //原始长链接
})
