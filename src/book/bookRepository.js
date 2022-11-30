class BookStore {
  books = new Map()

  add (book) {
    this.books.set(book.id, book)
  }

  has (id) {
    return this.books.has(id)
  }

  getById (id) {
    return this.books.get(id)
  }

  getAll () {
    return Array.from(this.books).map(([_, book]) => book)
  }

  update (book) {
    this.books.set(book.id, book)
  }

  remove (id) {
    this.books.remove(id)
  }
}

const bookStore = new BookStore()

module.exports = {
  repository: bookStore
}
