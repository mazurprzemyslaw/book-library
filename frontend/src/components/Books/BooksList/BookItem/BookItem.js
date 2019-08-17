import React from "react";

import "./BookItem.scss";

const bookItem = props => (
  <li key={props.bookId} className="books__list--item">
    {props.userId === props.creatorId ? (
      <div>
        <div>
          <h2>{props.title}</h2>
          <h2>{props.author}</h2>
          <h2>{props.description}</h2>
          <h2>{props.isbn}</h2>
          <h2>{props.pages}</h2>
        </div>
        <div>
          <button>View Details</button>
        </div>
      </div>
    ) : (
      <div>
        <div>
          <h2>{props.title}</h2>
          <h2>{props.author}</h2>
          <h2>{props.description}</h2>
          <h2>{props.isbn}</h2>
          <h2>{props.pages}</h2>
        </div>
      </div>
    )}
  </li>
);

export default bookItem;
