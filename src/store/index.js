import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);
import {
    bookService
} from "@/services/bookService.js";

export default new Vuex.Store({
    strict: true,
    state: {
        books: '',
        booksFromApi:'',
        filterBy: {
            text: "",
            max: 0,
            min: 0,
        },
    },
    getters: {
        books(state) {
            return state.books;
        },
        booksFromApi(state) {
            return state.booksFromApi;
        },
        filterBy(state) {
            return state.filterBy;
        }
    },
    mutations: {
        setBooks(state, {books}) {
            state.books = books;
        },
        setBooksFromApi(state, {booksFromApi}) {
            state.booksFromApi = booksFromApi;
        },
        setFilterBy(state, {filterBy}) {
            state.filterBy = filterBy;
        },
       
    },
    actions: {
        async loadBooks(context) {
            const books = await bookService.query();
            context.commit({type: 'setBooks',  books: books })
        },
        async removeBook(context,{id}){
            await bookService.removeBook(id);
            const books = await bookService.query();
            context.commit({type: 'setBooks',  books: books })
        },
        async searchBooks(context,{search}) {
            bookService.setCurrSearch(search);
            if (search) {
                var booksFromApi = await bookService.searchBooks();
            }
            context.commit({type: 'setBooksFromApi',  booksFromApi: booksFromApi })
        },
        async addBook(context,{book}){
            await bookService.addBook(book);
            const books = await bookService.query();
            context.commit({type: 'setBooks',  books: books })
        }
    },
    modules: {

    }
})