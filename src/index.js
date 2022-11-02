const express = require('express')
const { router: bookController } = require('book.js')
const { router: userController } = require('user.js')

const app = express()
const port = 3000

app.use('/api/books', bookController)
app.use('/api/user', userController)

app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`)
})
