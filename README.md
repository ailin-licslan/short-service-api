## 设计短链接服务 API 过程 请先阅读该引导内容

#### 0.技术栈： Express TypeScript Node Mongodb

#### 1.简单在 B 站学习了 TypeScript 语法

#### 2.Win10 安装 node 环境 npm npx yarn mongodb 等环境都提前安装好

#### 3.先打通 本地的 CRUD 功能

#### 4.开发长链接的输入返回短链接路径

#### 5.在浏览器输入 4 中返回的路径 可以直接（重定向）打开原始长连接的需要访问的内容

#### 6.代码拉下来后 npm install 安装依赖的包

#### 7.yarn dev 启动本地服务就可以调试

#### 8.schema 设计

const schemaShortPath = Joi.object({
shortCode: Joi.string().trim(), //短链接
longUrl: Joi.string().trim().required(), //原始长链接
})

#### 9.需要添加的基本依赖

##### import express from 'express' ==> express 依赖

##### import monk from 'monk' ==> 连接 mongodb 或者 mongoose 也行

##### import Joi from '@hapi/joi' ==> 校验 schema 规则 传参是否规范满足要求

##### import shortId from 'shortid' ==> 生成 shortId

##### import validUrl from 'valid-url' ==> 校验 Url

##### import config from 'config' ==> 读取配置

#### 10.项目测试接口地址

localhost:8000/test 测试所有数据 可以参考步骤 11 中的截图格式 test-database-connection
[
{
"_id": "63b66e34df3aa6a2d3cab8cf",
"name": "HWL"
},
{
"_id": "63b66f74df3aa6a2d3cab8d0",
"age": "30"
},
{
"_id": "63b6905f6dc01c32e0e96792",
"question": "hi Where are from?",
"answer": "china wuhan"
},
{
"_id": "63b6abfa7285ab403c916d17",
"shortCode": "7bPcceS3a",
"longUrl": "https://www.bilibili.com/video/BV12t411j7Un/?p=4&spm_id_from=pageDriver"
},
{
"_id": "63b6b1f61917f74010637b02",
"shortCode": "yAb8R98ob",
"longUrl": "https://www.bilibili.com/video/BV12t411j7Un?p=1&vd_source=bbb985ceadc8e3199d1d5a091b58155b"
},
{
"_id": "63b6bd0a482fa10c0424fb65",
"shortCode": "_6IFePlEl",
"longUrl": "https://www.bilibili.com/video/BV12t411j7Un?p=5&spm_id_from=pageDriver&vd_source=bbb985ceadc8e3199d1d5a091b58155b"
}
]

localhost:8000/shorten/save 长连接生成短链接接口地址 可以参考步骤 11 中的截图格式 test-short-link-maker
localhost:8000/\_6IFePlEl 短链接接口地址 可以参考步骤 11 中的截图格式 test-redirct

#### 11.效果演示 在项目目录 image 结构中可以看到演示效果

mongodb 连接测试
![test-database-connection](https://github.com/ailin-licslan/short-service-api/blob/main/image/test-database.png)

生成短链接
![test-short-link-maker](https://github.com/ailin-licslan/short-service-api/blob/main/image/test-short-link-maker.png)

短链接跳转
![test-redirct](https://github.com/ailin-licslan/short-service-api/blob/main/image/test-redirct.png)
