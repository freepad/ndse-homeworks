const { router } = require('./bookController.js')
const { repository: bookRepository } = require('./bookRepository.js')
const { model: Book } = require('./bookModel.js')
const { books } = require('./bookFixture')

for (const book of books) { // eslint-disable-line no-unused-vars
  const bookModel = new Book(book)
  bookRepository.add(bookModel)
}

module.exports = {
  router
}
