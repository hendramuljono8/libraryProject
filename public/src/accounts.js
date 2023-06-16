function findAccountById(accounts, id) {
 return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => {
    const lastNameA = a.name.last.toLowerCase();
    const lastNameB = b.name.last.toLowerCase();

    if (lastNameA < lastNameB) {
      return -1;
    } else if (lastNameA > lastNameB) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((totalBorrows, book) => {
    const isBorrowedByAccount = book.borrows.some((borrow) => borrow.id === account.id);
    return isBorrowedByAccount ? totalBorrows + 1 : totalBorrows;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // Helper function to find an author by their ID
  function findAuthorById(id) {
    return authors.find((author) => author.id === id);
  }

  const checkedOutBooks = [];
  
  books.forEach((book) => {
    const isBookCheckedOut = book.borrows.some((borrow) => borrow.returned === false);
    
    if (isBookCheckedOut && book.borrows[0].id === account.id) {
      const author = findAuthorById(book.authorId);  // Use the helper function here
const checkedOutBook = {
        ...book,
        author,
      };

      checkedOutBooks.push(checkedOutBook);
    }
  });

  return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
