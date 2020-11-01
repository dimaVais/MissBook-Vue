<template>
    <section>
        <form class="search-box flex column align-center">
            <label class="add-mgs" >Add New Book To your List: </label>
            <input autocomplete="off"  type="text" name="search" class="search" v-model="search"
                @input.prevent="searchBooks" placeholder="Search Here"  />
                <div class="add-list" v-show="search" v-for="(book,idx) in booksFromApi" :key="idx" >   
                        <li class="add-item">{{book.title}} <button @click.prevent="addBook(book)"> + </button></li>
                </div>
        </form>
    </section>
</template>

<script>
import { bookService } from "@/services/bookService.js";
import eventBus from "@/services/eventBusService.js";

export default {
  name: "AddBook",
  data() {
    return {
      search: "",
      booksFromApi:''
    };
  },
  methods: {
    async searchBooks() {
      await this.$store.dispatch({type:'searchBooks', search: this.search});
      const booksFromApi = this.$store.getters.booksFromApi;
      this.booksFromApi = booksFromApi;
    },
    async addBook(book) {
        await this.$store.dispatch({type:'addBook', book: book});
        eventBus.$emit("showMsg", {txt: `Book was ${book.title} added well!`,status: "success",});;
    },
  },
};
</script>