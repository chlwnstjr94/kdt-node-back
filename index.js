const express = require('express')
const cors = require('cors')

global.appRoot = __dirname

const app = express()
app.use(express.json())
app.use(cors())
// http://localhost:1234/api/todos
app.use('/api/todos', require('./routes/api/todos.js'))


// http://localhost:1234/api/todos?a=1&b=heropy
// https://abc.com
const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log('서버 동작~!')
})