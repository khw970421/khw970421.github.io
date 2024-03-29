// 외부 모듈 import
const express = require('express')
const db = require('./data/db.js')
const app = express()
// middle ware 등록
app.use(express.json())  // request body를 사용하기 위함
app.use(express.static('public')) // static file을 사용하기 위함
// index page
app.get('/', (req, res) => {
  res.render('index') // index.html render
})
// folder
app.route('https://khw970421.github.io/Node/api/folder')
  .get(async (req, res) => {
    const result = {success: true}
    try {
      const json = await db.getData()
      result.data = json.folder
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })
  .post(async (req, res) => {
    const result = {success: true}
    const folder = req.body.folder
    try {
      const json = await db.getData()
      json.folder = folder
      await db.setData(json)
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })
// task

app.route('https://khw970421.github.io/Node//api/task')
  .get(async (req, res) => {
  const result = {success: true}
  try {
    const json = await db.getData()
    result.data = json.task
  } catch (err) {
    result.success = false
    result.err = err
  }
  res.json(result)
})

app.route('https://khw970421.github.io/Node//api/task/:parent')
  .get(async (req, res) => {
    const result = {success: true}
    const parent = req.params.parent
    try {
      const json = await db.getData()
      list = []
      json.task.forEach((v, idx) => {
        if (v.parent === parent) {
          v.idx = idx
          list.push(v)
        }
      })
      result.data = list
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })
  .post(async (req, res) => {
    const result = {success: true}
    const task = req.body.task
    const parent = req.params.parent
    console.log('?')
    try {
      const json = await db.getData()
      task.parent = parent
      json.task.push(task)
      await db.setData(json)
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })
  .put(async (req, res) => {
    const result = {success: true}
    const task = req.body.task
    const idx = req.params.parent
    try {
      const json = await db.getData()
      json.task[idx] = task
      await db.setData(json)
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })
app.listen(3000)
