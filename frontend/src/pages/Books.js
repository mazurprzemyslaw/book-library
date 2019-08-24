import React, { Component } from "react";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import BooksList from "../components/Books/BooksList/BooksList";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";

class BooksPage extends Component {
  state = {
    creating: false,
    books: [],
    isLoading: false,
    selectedBook: null
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.authorElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.pagesElRef = React.createRef();
    this.isbnElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchBooks();
  }

  startCreateBookHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const author = this.authorElRef.current.value;
    const description = this.descriptionElRef.current.value;
    const pages = this.pagesElRef.current.value;
    const isbn = this.isbnElRef.current.value;

    if (
      (title.trim().length === 0 || author.trim().length === 0,
      description.trim().length === 0)
    ) {
      return;
    }

    const event = { title, author, description, pages, isbn };
    console.log(event);

    const requestBody = {
      query: `
        mutation {
          createBook(bookInput: {title: "${title}", author: "${author}", description: "${description}", pages: ${pages}, isbn: ${isbn}}) {
            _id
            title
            author
            description
            pages
            isbn
          }
        }
      `
    };

    let token = this.context.token;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBooks = [...prevState.books];
          updatedBooks.push({
            _id: resData.data.createBook._id,
            title: resData.data.createBook.title,
            author: resData.data.createBook.author,
            description: resData.data.createBook.description,
            pages: resData.data.createBook.pages,
            isbn: resData.data.createBook.isbn,
            creator: {
              _id: this.context.userId
            }
          });
          return { books: updatedBooks };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedBook: null });
  };

  fetchBooks() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            books {
              _id
              title
              author
              description
              pages
              isbn
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const books = resData.data.books;
        this.setState({ books: books, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  showDetailHandler = bookId => {
    this.setState(prevState => {
      const selectedBook = prevState.books.find(e => e._id === bookId);
      return { selectedBook: selectedBook };
    });
  };

  bookUpdateHandler = () => {};

  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Book"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div>
                <label htmlFor="author">Author</label>
                <input type="text" id="author" ref={this.authorElRef} />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pages">Pages</label>
                <input type="number" id="pages" ref={this.pagesElRef} />
              </div>
              <div>
                <label htmlFor="isbn">ISBN</label>
                <input type="number" id="isbn" ref={this.isbnElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedBook && (
          <Modal
            title={this.state.selectedBook.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookUpdateHandler}
          >
            <form>
              <div>
                <label htmlFor="title">{this.state.selectedBook.title}</label>
                <input type="text" id="title" ref={this.titleElRef}></input>
              </div>
              <div>
                <label htmlFor="author">{this.state.selectedBook.author}</label>
                <input type="text" id="author" ref={this.authorElRef} />
              </div>
              <div>
                <label htmlFor="description">
                  {this.state.selectedBook.description}
                </label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                ></textarea>
              </div>
              <div>
                <label htmlFor="pages">{this.state.selectedBook.pages}</label>
                <input type="number" id="pages" ref={this.pagesElRef} />
              </div>
              <div>
                <label htmlFor="isbn">{this.state.selectedBook.isbn}</label>
                <input type="number" id="isbn" ref={this.isbnElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Create your own book!</p>
            <button className="btn" onClick={this.startCreateBookHandler}>
              Create Book
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <BooksList
            books={this.state.books}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default BooksPage;
