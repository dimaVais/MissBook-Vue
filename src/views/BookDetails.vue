<template>
  <section class="inner-box flex space-between">
    <div class="detail-box flex space-around" v-if="book">
    <div class="book-box flex column align-center" v-if="book">
        <div v-if="book.listPrice.isOnSale" class="on-sale">ON SALE</div>
        <h1 class="details-header">{{ book.title }}</h1>
        <h2>{{ book.subtitle }}</h2>
        <img :src="book.thumbnail" alt="Thumbnail" />
        <p>Summary: <LongTxt :initText="book.description" /></p>
        <h2 :class="getPriceColor">
          Book Price: <currency :price="book.listPrice" />
        </h2>
        <h3>Book Language: {{ book.language }}</h3>
        <h3>Pages: {{ book.pageCount }}{{ getReading }}</h3>
        <h3>Published at: {{ book.publishedDate }}{{ getAgeState }}</h3>
        <div class="flex">
          <h3>Authors:</h3>
          <ul
            v-for="author in book.authors"
            :key="author"
            class="flex align-center">
            <li>{{ author }}</li>
          </ul>
        </div>
        <div class="flex">
          <h3>Categories:</h3>
          <ul
            v-for="category in book.categories"
            :key="category"
            class="flex align-center">
            <li>{{ category }}</li>
          </ul>
        </div>
      </div>
      <reviews :book="book" @addReview="addReview" @removeReview="removeReview" />
    </div>
    <h2 v-else>LOADING BOOK...</h2>
  </section>
</template>

<script>
import { bookService } from "@/services/bookService.js";
import  eventBus  from "@/services/eventBusService.js";
import LongTxt from "@/cmps/LongTxt.vue";
import Currency from "@/cmps/Currency.vue";
import Reviews from "@/cmps/Reviews.vue";

export default {
  name: "BookDetails",
  data() {
    return {
      book: ""
    };
  },
  components: {
    LongTxt,
    Currency,
    Reviews
  },
  async created() {
    const book = await bookService.getBookById(this.$route.params.id);
    console.log("this is book", book);
    this.book = book;
  },
  computed: {
    getReading() {
      if (this.book.pageCount > 500) return " – Long reading";
      else if (this.book.pageCount > 200) return " – Decent reading";
      else if (this.book.pageCount < 100) return " – Light reading";
      else return "";
    },
    getAgeState() {
      if (
        new Date(Date.now()).getFullYear() -
          new Date(this.book.publishedDate).getFullYear() >
        10
      )
        return " - Veteran Book";
      else if (
        new Date(Date.now()).getFullYear() -
          new Date(this.book.publishedDate).getFullYear() <=
        1
      )
        return " - New!";
      else return "";
    },
    getPriceColor() {
      if (this.book.listPrice.amount > 150) return "expensive";
      else if (this.book.listPrice.amount < 20) return "cheep";
      else return "";
    },
  },
  methods:{
       addReview(review){
            this.book = bookService.addReview(review, this.book);
            eventBus.$emit('showMsg',{txt:'Review was added well!', status:'success'});
        },
        removeReview(reviewId){
            bookService.deleteReview(this.book, reviewId);
             eventBus.$emit('showMsg',{txt:'Review was Deleted well!', status:'success'});
        }
  }
};
</script>

