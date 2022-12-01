const express = require('express')
const { router: bookController } = require('./book/book')
const { router: userController } = require('./user/user')
const app = express()
const port = 3000

app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.use('/', bookController)
app.use('/api/user', userController)

app.use('*', (req, res) => {
  res.json({ status: 404, message: '404 | страница не найдена' })
})

app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`)
})
