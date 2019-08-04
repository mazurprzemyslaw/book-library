import React from "react";
import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const mainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>Book</h1>
    </div>
    <div className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/auth">Authentication</NavLink>
        </li>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
      </ul>
    </div>
  </header>
);

export default mainNavigation;
