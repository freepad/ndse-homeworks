const express = require('express')
const multer = require('multer')
const { repository: bookRepository } = require('./bookRepository.js')
const { model: Book } = require('./bookModel.js')
const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/api/books/', (req, res) => {
  res.json(bookRepository.getAll())
})

router.get('/api/books/:id', (req, res) => {
  const { id } = req.params
  if (bookRepository.has(id)) {
    res.json(bookRepository.getById(id))
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.post('/api/books/', upload.single('fileBook'), (req, res) => {
  delete req.body.id
  const book = new Book({
    ...req.body,
    file: req.file
  })
  res.json(book)
})

router.put('/api/books/:id', upload.single('fileBook'), (req, res) => {
  const { id } = req.params
  if (bookRepository.has(id)) {
    const book = new Book({
      ...req.body,
      file: req.file
    })
    bookRepository.update(book)
    res.json(book)
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.delete('/api/books/:id', (req, res) => {
  const { id } = req.params
  if (bookRepository.has(id)) {
    bookRepository.remove(id)
    res.json('ok')
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.get('/api/books/:id/download', (req, res) => {
  const { id } = req.params
  if (bookRepository.has(id)) {
    const book = bookRepository.getById(id)
    res.sendFile(book.fileBook)
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.get('/books', (req, res) => {
  res.render('book/index', {
    books: bookRepository.getAll()
  })
})

router.get('/books/create', (req, res) => {
  res.render('book/create')
})

router.get('/books/:id', (req, res) => {
  const { id } = req.params
  if (bookRepository.has(id)) {
    const book = bookRepository.getById(id)
    res.render('book/view', {
      book
    })
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.get('/books/update/:id', (req, res) => {
  const { id } = req.params
  if (bookRepository.has(id)) {
    const book = bookRepository.getById(id)
    res.render('book/update', {
      book
    })
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

module.exports = {
  router
}
