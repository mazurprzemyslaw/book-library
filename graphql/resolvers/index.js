const bcrypt = require("bcryptjs");

const Book = require("../../models/book");
const User = require("../../models/user");

const books = async bookId => {
  try {
    const books = await Book.find({ _id: { $in: bookId } });
    books.map(book => {
      return {
        ...book._doc,
        _id: book.id,
        creator: user.bind(this, book.creator)
      };
    });
    return books;
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

module.exports = {
  books: async () => {
    try {
      const books = await Book.find();
      return books.map(book => {
        return {
          ...book._doc,
          _id: book.id,
          creator: user.bind(this, book._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createBook: async args => {
    const book = new Book({
      title: args.bookInput.title,
      author: args.bookInput.author,
      description: args.bookInput.description,
      pages: +args.bookInput.pages,
      isbn: +args.bookInput.isbn,
      creator: "5d40b1659283862388e16396"
    });
    let createdBook;
    try {
      const result = await book.save();
      createdBook = {
        ...result._doc,
        _id: result._doc._id.toString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById("5d40b1659283862388e16396");

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
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("User exists already");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
