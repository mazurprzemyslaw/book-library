import React from "react";

import BookItem from "./BookItem/BookItem";

import "./BooksList.scss";

const booksList = props => {
  const books = props.books.map(book => {
    return <BookItem key={book._id} bookId={book._id} title={book.title} />;
  });

  return <ul className="books__list">{books}</ul>;
};

export default booksList;
