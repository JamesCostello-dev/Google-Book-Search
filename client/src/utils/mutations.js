import gql from 'graphql-tag'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
}
`;

export const CREATE_USER = gql` 
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: bookId!) {
  savedBooks(input: $input) {
    _id
    username
    email
    savedBooks {
        bookId
        title
        description
        authors
        image
        link
    }
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      image
      description
      title
      link
    }
  }
}
`;