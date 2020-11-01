
<template>
  <section class="home inner-box flex column align-center">
    <h1 class="page-header">Book Collection</h1>
    <add-Book @changedBooks="loadBooks" />
    <book-filter @filtered="this.onSetFilter" />
    <book-list :books="booksToShow" @removeBook="onRemoveBook"></book-list>
  </section>
</template>

<script>
import { bookService } from "@/services/bookService.js";
import BookList from "@/cmps/BookList.vue";
import BookFilter from "@/cmps/BookFilter.vue";
import AddBook from "@/cmps/AddBook.vue";

export default {
  name: "Home",
  components: {
    BookList,
    BookFilter,
    AddBook,
  },
  data() {
    return {

    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadBooks" });
  },
  computed: {
    booksToShow() {
      let books = this.$store.getters.books;
      const filterBy = this.$store.getters.filterBy;
      if (books) {
        if (filterBy.text) {
          books = books.filter((book) => {
            return book.title
              .toLowerCase()
              .includes(filterBy.text.toLowerCase());
          });
        }

        if (filterBy.max > 0) {
          books = books.filter((book) => {
            return book.listPrice.amount <= filterBy.max;
          });
        }

        if (parseInt(filterBy.min) >= 0) {
          books = books.filter((book) => {
            return book.listPrice.amount >= filterBy.min;
          });
        }
      }
      return books;
    },
  },
  methods: {
    async loadBooks() {
      await this.$store.dispatch({ type: "loadBooks" });
    },
    onSetFilter(filter) {
      this.$store.commit({type:'setFilterBy', filterBy:filter});
    },
    async onRemoveBook(id) {
      await this.$store.dispatch({ type: "removeBook", id: id });
    },
  },
};
</script>
