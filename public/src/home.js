function getTotalBooksCount(books) {
 
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(book => book.borrows[0].returned === false).length;
}

function getMostCommonGenres(books) {
  const genreCounts = {};

  books.forEach((book) => {
    if (genreCounts[book.genre]) {
      genreCounts[book.genre]++;
    } else {
      genreCounts[book.genre] = 1;
    }
  });

  const sortedGenres = Object.keys(genreCounts)
    .map((name) => ({ name, count: genreCounts[name] }))
    .sort((a, b) => b.count - a.count);

  return sortedGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularityCounts = books.map(book => ({
    name: book.title,
    count: book.borrows.length
  }));

  popularityCounts.sort((bookA, bookB) => bookB.count - bookA.count);

  return popularityCounts.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // Map each author to an object containing their name and total borrow count
  const authorPopularity = authors.map(author => {
    const totalBorrows = books
      .filter(book => book.authorId === author.id)
      .reduce((total, book) => total + book.borrows.length, 0);
      
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: totalBorrows
    };
  });

  // Sort the authors by borrow count in descending order and return the top 5
  return authorPopularity.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
