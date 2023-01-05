//The first code of this Api and learn how to build a TypeScript project
//console.log('licslan learn typescript! Are you ok with this? ')

import express from 'express'
import monk from 'monk'
import Joi from '@hapi/joi'
import shortId from 'shortid'
import validUrl from 'valid-url'
import config from 'config'

const app = express()
//In order to support postman send 'application/json' style request
app.use(express.json())

//=======================================PART1 测试schema设计 关于如何做一个CRUD的测试=====================================//

//测试schema 设计 使用 @hapi/joi 校验model
const schemaTest = Joi.object({
  question: Joi.string().trim().required(),
  answer: Joi.string().trim().required(),
})

//db connection  使用 monk 连接 mongodb
const db = monk(`${config.get('mongoURI')}`)
const licslan = db.get('licslan')

//GET  localhost:8000
app.get('/test/', async (_req, res, next) => {
  try {
    const items = await licslan.find({})
    console.log(items)
    res.json(items)
  } catch (error) {
    next(error)
  }
})

//GET BY ID  localhost:8000/63b688cd7c75540efc950b28
app.get('/test/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const item = await licslan.findOne({
      _id: id,
    })
    //if not exist return
    if (!item) return next()
    res.json(item)
  } catch (error) {
    next(error)
  }
})

//PUT update logic
app.put('/test/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const value = await schemaTest.validateAsync(req.body)
    const item = await licslan.findOne({
      _id: id,
    })
    //if not exist return
    if (!item) return next()
    await licslan.update(
      {
        _id: id,
      },
      {
        $set: value,
      }
    )

    res.json(value)
  } catch (error) {}
})

//POST save logic
app.post('/test/', async (req, res, next) => {
  try {
    console.log(req.body)
    const value = await schemaTest.validateAsync(req.body)
    const inserted = await licslan.insert(value)
    res.json(inserted)
  } catch (error) {
    next(error)
  }
})

//DEL delete logic
app.delete('/test/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await licslan.remove({ _id: id })
    res.json({
      message: 'success',
    })
  } catch (error) {
    next(error)
  }
})

//=================================================PART2 下面是正式的短链接服务Api的实现====================================================//

//短链接schema设计
const schemaShortPath = Joi.object({
  shortCode: Joi.string().trim(),
  longUrl: Joi.string().trim().required(),
})

//短链接生成API:Short Url maker
app.post('/shorten/save', async (req, res) => {
  try {
    //校验格式字符串格式 这里尝试去校验 后面如果设计其他schema 可以使用到 此处可以省去
    await schemaShortPath.validateAsync(req.body)
    const { longUrl } = req.body

    //校验链接
    if (!validUrl.isUri(longUrl)) {
      res.status(401).json('Invalid long url')
    }

    //get data from mongodb by longUrl
    const url = await licslan.findOne({ longUrl: longUrl })

    //信息存在
    if (url) {
      res.json({
        shortUrl: `${config.get('baseUrl')}/${url.shortCode}`,
      })
    }
    //信息不存在
    else {
      const urlCode = shortId.generate()
      const object = {
        shortCode: urlCode,
        longUrl: longUrl,
      }
      //写入新的链接
      await licslan.insert(object)
      res.json({
        shortUrl: `${config.get('baseUrl')}/${urlCode}`,
      })
    }
  } catch (error) {
    res.status(500).json('Server error')
  }
})

//短链接获取API:Get URL by shortUrl
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params
    const url = await licslan.findOne({ shortCode: shortCode })
    if (url) {
      // 重定向至原链接
      res.redirect(url.longUrl)
    } else {
      res.status(404).json('No url found')
    }
  } catch (error) {
    res.status(500).json('Server error')
  }
})

//=================================================PART0 Start the server and running on prot 8000====================================================//
const main = () => {
  //监听 8000 端口
  app.listen(`${config.get('port')}`, () => {
    console.log(`Running on ${config.get('baseUrl')}`)
  })
}
main()
