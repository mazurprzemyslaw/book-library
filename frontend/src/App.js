import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import BookPage from "./pages/Books";
import MainNavigation from "./components/Navigation/MainNavigation";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to auth="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/books" component={BookPage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
