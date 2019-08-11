const Book = require("../../models/book");
const User = require("../../models/user");

const books = async bookIds => {
  try {
    const books = await Book.find({ _id: { $in: bookIds } });
    return books.map(book => {
      return transformBook(book);
    });
  } catch (err) {
    throw err;
  }
};

const singleBook = async bookId => {
  try {
    const book = await Book.findById(bookId);
    return transformBook(book);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdBooks: books.bind(this, user._doc.createBooks)
    };
  } catch (err) {
    throw err;
  }
};

const transformBook = book => {
  return {
    ...book._doc,
    _id: book.id,
    creator: user.bind(this, book.creator)
  };
};

exports.transformBook = transformBook;
