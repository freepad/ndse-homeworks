const { router } = require('./bookController.js')
const { repository: bookRepository } = require('./bookRepository.js')
const { model: Book } = require('./bookModel.js')
const { faker } = require('@faker-js/faker')

for (const _ of Array.from({ length: 10 })) { // eslint-disable-line no-unused-vars
  const book = new Book({
    title: faker.random.words(2),
    authors: faker.name.fullName(),
    description: faker.random.words(10)
  })
  bookRepository.add(book)
}

module.exports = {
  router
}
