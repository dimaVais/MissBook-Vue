    import {
        storageService
    } from './storageService.js'
    import {
        utilSrvice
    } from './utilsService.js'
    import axios from 'axios';


    export const bookService = {
        query,
        searchBooks,
        getBookById,
        addBook,
        removeBook,
        setCurrSearch,
        addReview,
        deleteReview
    }

    const BOOKS_KEY = 'BOOKS';
    var currSearch = 'effective javascript';
    var books = storageService.loadFromStorage(BOOKS_KEY) || [];

    async function _getBooks() {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${currSearch}`)
        return res.data;
    }

    async function searchBooks() {
        const booksFromApi = await _getBooks();
        const booksFound = booksFromApi.items.map(book => {
            return _parseBook(book)
        });
        return booksFound;
    }

    async function query() {
        if (!books.length) {
            books = await searchBooks();
            storageService.saveToStorage(BOOKS_KEY, books);
        }
        return books;
    }

    function _parseBook(book) {
        return {
            _id: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle || '',
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            thumbnail: (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : "http://coding-academy.org/books-photos/1.jpg",
            language: book.volumeInfo.language,
            listPrice: {
                amount: (book.saleInfo.listPrice) ? book.saleInfo.listPrice.amount : 19,
                currencyCode: (book.saleInfo.listPrice) ? book.saleInfo.listPrice.currencyCode : 'ILS',
                isOnSale: book.saleInfo.saleability,
            },
            reviews: [{
                "_id": utilSrvice.makeId(),
                "name": "Good Critic",
                "rate": "5",
                "date": "2020-01-01",
                "txt": "Very Good Book!"
            }]
        }
    }


    function getBookById(id) {
        const bookToFind = books.find(book => book._id === id);
        return bookToFind;
    }

    function setCurrSearch(newSearch) {
        currSearch = newSearch;
    }

    function addBook(book) {
        console.log('Added book is',book);
        book = {
            _id: utilSrvice.makeId(),
            ...book
        }
        books.unshift(book);
        storageService.saveToStorage(BOOKS_KEY, books);
    }

    function removeBook(bookId) {
        books = books.filter(book => {
            return book._id !== bookId
        });
        storageService.saveToStorage(BOOKS_KEY, books);
    }

    function addReview(review, bookToSave) {
        review._id = utilSrvice.makeId();
        bookToSave.reviews.unshift(review);
        books = books.map(book => (book._id === bookToSave._id) ? bookToSave : book);
        storageService.saveToStorage(BOOKS_KEY, books);
        return bookToSave;
    }

    function deleteReview(book, id) {
        const revDeleteIdx = book.reviews.findIndex(rev => rev._id === id);
        book.reviews.splice(revDeleteIdx, 1);
        storageService.saveToStorage(BOOKS_KEY, books);
    }
