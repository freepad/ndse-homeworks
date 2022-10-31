const express = require('express')
const { v4: uuid } = require('uuid')
const multer = require('multer')

class Book {
  constructor ({
    id = uuid(),
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    fileBook = ''
  }) {
    this.id = id
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.fileBook = fileBook
  }
}

class BookStore {
  books = new Map()

  add (book) {
    this.books.add(book.id, book)
  }

  has (id) {
    return this.books.has(id)
  }

  getById (id) {
    return this.books.get(id)
  }

  getAll () {
    return Array.from(this.books)
  }

  update (book) {
    this.books.set(book.id, book)
  }

  remove (id) {
    this.books.remove(id)
  }
}

const bookStore = new BookStore()

const router = express.Router()
const upload = multer({ dest: 'uploads/' })
router.get('/', (req, res) => {
  res.json(bookStore.getAll())
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  if (bookStore.has(id)) {
    res.json(bookStore.getById(id))
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.post('/', upload.single('file'), (req, res) => {
  delete req.body.id
  const book = new Book({
    ...req.body,
    file: req.file
  })
  res.json(book)
})

router.put('/:id', upload.single('file'), (req, res) => {
  const { id } = req.params
  if (bookStore.has(id)) {
    const book = new Book({
      ...req.body,
      file: req.file
    })
    bookStore.update(book)
    res.json(book)
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  if (bookStore.has(id)) {
    bookStore.remove(id)
    res.json('ok')
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

router.get('/:id/download', (req, res) => {
  const { id } = req.params
  if (bookStore.has(id)) {
    const book = bookStore.getById(id)
    res.sendFile(book.fileBook)
  } else {
    res.status(404)
    res.json({ status: 404, message: '404 | страница не найдена' })
  }
})

module.exports = {
  router
}
