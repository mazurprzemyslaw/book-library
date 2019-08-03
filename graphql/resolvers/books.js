const Book = require("../../models/book");
const User = require("../../models/user");

const { transformBook } = require("./merge");

module.exports = {
  books: async () => {
    try {
      const books = await Book.find();
      return books.map(book => {
        return transformBook(book);
      });
    } catch (err) {
      throw err;
    }
  },
  createBook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const book = new Book({
      title: args.bookInput.title,
      author: args.bookInput.author,
      description: args.bookInput.description,
      pages: +args.bookInput.pages,
      isbn: +args.bookInput.isbn,
      creator: req.userId
    });
    let createdBook;
    try {
      const result = await book.save();
      createdBook = transformBook(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found");
      }
      creator.createdBooks.push(book);
      await creator.save();

      return createdBook;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteBook: async args => {
    try {
      const bookRemove = await Book.findById(args.bookId).populate("book");
      await Book.deleteOne(bookRemove);
      return bookRemove;
    } catch (err) {
      throw err;
    }
  }
};
