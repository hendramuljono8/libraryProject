function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = [];
  const returnedBooks = [];

  books.forEach((book) => {
    const firstTransaction = book.borrows[0];
    if (firstTransaction.returned) {
      returnedBooks.push(book);
    } else {
      checkedOutBooks.push(book);
    }
  });

  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrow) => {
    const account = accounts.find((acc) => acc.id === borrow.id);
    return { ...account, returned: borrow.returned };
  });

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
