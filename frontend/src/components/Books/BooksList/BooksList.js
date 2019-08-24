import React from "react";

import BookItem from "./BookItem/BookItem";

import "./BooksList.scss";

const booksList = props => {
  const books = props.books.map(book => {
    return (
      <BookItem
        key={book._id}
        bookId={book._id}
        title={book.title}
        author={book.author}
        description={book.description}
        pages={book.pages}
        isbn={book.isbn}
        userId={props.authUserId}
        creatorId={book.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="books__list">{books}</ul>;
};

export default booksList;
