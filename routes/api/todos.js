const fs = require('fs')
const { nanoid } = require('nanoid')
const express = require('express')
const router = express.Router()

const todosDir = `${global.appRoot}/todos`
const todosFile = `${global.appRoot}/todos/index.json`

// 작업!
// Read
router.get('/', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))

  res.status(200).json(todos)
})

// Create
router.post('/', (req, res) => {
  const { title } = req.body

  let todos = {}
  try {
    // 파일 불러오기(읽기)
    // fs.readFileSync(`${global.appRoot}/todos/index.json`, { encoding: 'utf8' })
    todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  } catch (error) {
    fs.mkdirSync(todosDir)
    fs.writeFileSync(todosFile, '{}')
  }
  
  todos[nanoid()] = { title }
  // JSON.stringify(todos, null, 2) = json 파일을 보기 좋게
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json({ title })
})

// Update
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  todos[id].title = title

  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json(todos[id])
})

// Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params

  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  delete todos[id]

  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json(true)
})

// router.get('/', (req, res) => {
//   // get에서는 body를 쓰지 못한다.
//   // console.log('req.body::', req.body)
//   const { apikey } = req.query
//   const validApiKeies = [123456, 123457, 851216]

//   if (!validApiKeies.includes(Number(apikey, 10))) {
//     return res.status(401).json('유요한 정보가 아닙니다!')
//   }
//   // json() = JSON.stringify()
//   return res.status(200).json({
//     name: 'First Todos API'
//   })
// })

// router.post('/', (req, res) => {
//   console.log('req.body::', req.body)
//   res.status(200).json(true)
// })

// // https://abc.com/api/todos/:id
// router.put('/:id', (req, res) => {
//   console.log('req.params::', req.params)
//   res.status(200).json(true)
// })

// router.delete('/:id', (req, res) => {
//   console.log('req.params::', req.params)
//   res.status(200).json(true)
// })
// VS
// router.delete('/', (req, res) => {
//   console.log('req.body::', req.body)
//   const { id } = req.body
//   res.status(200).json(true)
// })
// VS
// router.put('/delete', (req, res) => {
//   console.log('req.body::', req.body)
//   const { id } = req.body
//   res.status(200).json(true)
// })

// 반환!
module.exports = router