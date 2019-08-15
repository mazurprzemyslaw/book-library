import React from "react";

import "./BookItem.scss";

const bookItem = props => (
  <li key={props.bookId} className="books__list--item">
    {props.title}
  </li>
);

export default bookItem;
