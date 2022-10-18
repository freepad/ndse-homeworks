const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
  constructor ({
    id = uuid(),
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = ''
  }) {
    this.id = id
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
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

const app = express()
app.use(express.json())

app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' })
})

app.get('/api/books', (req, res) => {
  res.json(bookStore.getAll())
})

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params
  if (bookStore.has(id)) {
    res.json(bookStore.getById(id))
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

app.post('/api/books', (req, res) => {
  delete req.body.id
  const book = new Book(req.body)
  res.json(book)
})

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params
  if (bookStore.has(id)) {
    const book = new Book(req.body)
    bookStore.update(book)
    res.json(book)
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params
  if (bookStore.has(id)) {
    bookStore.remove(id)
    res.json('ok')
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})
