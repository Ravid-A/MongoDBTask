const ObjectId = require("mongoose").Types.ObjectId;

const Book = require("../models/books");
const Author = require("../models/authors");

const authorExists = async (strId) =>
  ObjectId.isValid(strId) && !!(await Author.findOne({ _id: strId }));

const create = async (book_data) => {
  const { title, publishingYear, genres, authors, quantity, price } = book_data;

  for (author of authors) {
    if (!(await authorExists(author))) {
      throw new Error("Author does not exist");
    }
  }

  const book = new Book({
    title,
    publishingYear,
    genres,
    authors,
    quantity,
    price,
  });

  return await book.save();
};

const remove = async (strId) => {
  return await Book.findByIdAndDelete(strId);
};

const getAllBooks = async (pageNumber) => {
  return await Book.find()
    .populate("authors")
    .skip((pageNumber - 1) * 10)
    .limit(10);
};

const getBooksByStrInTitle = async (str, pageNumber) => {
  return await Book.find({ title: { $regex: str, $options: "i" } })
    .populate("authors")
    .skip((pageNumber - 1) * 10)
    .limit(10);
};

const getBooksByGenre = async (genre, pageNumber) => {
  return await Book.find({ genres: genre })
    .populate("authors")
    .skip((pageNumber - 1) * 10)
    .limit(10);
};

const getBooksByPublishedInRange = async (startYear, endYear, pageNumber) => {
  return await Book.find({ publishingYear: { $gte: startYear, $lte: endYear } })
    .populate("authors")
    .skip((pageNumber - 1) * 10)
    .limit(10);
};

const getBooksByAuthorCountry = async (country, pageNumber) => {
  return await Book.aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "authors",
        foreignField: "_id",
        as: "authors",
      },
    },
    {
      $match: {
        "authors.country": country,
      },
    },
  ])
    .skip((pageNumber - 1) * 10)
    .limit(10);
};

module.exports = {
  create,
  remove,
  getAllBooks,
  getBooksByStrInTitle,
  getBooksByGenre,
  getBooksByPublishedInRange,
  getBooksByAuthorCountry,
};
