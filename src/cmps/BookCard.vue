<template>
  <div class="card flex column space-between align-center">
    <div v-if="book.listPrice.isOnSale" class="on-sale">ON SALE</div>
    <div class="title-box">
      <h2>{{ title }}</h2>
    </div>
    <!-- <h3>{{ book.subtitle }}</h3> -->
    <h2><currency :class="getPriceColor" :price="book.listPrice" /></h2>
    <img :src="book.thumbnail" alt="Thumbnail" />
    <button class="del-btn" @click.prevent="removeBook(book._id)">❌</button>
  </div>
</template>

<script>
import Currency from "@/cmps/Currency.vue";

export default {
  name: "BookCard",
  props: ["book"],
  components: {
    Currency,
  },
  computed: {
    getPriceColor() {
      if (this.book.listPrice.amount > 150) return "expensive";
      else if (this.book.listPrice.amount < 20) return "cheep";
      else return "";
    },
    title(){
      return (this.book.title.length<40)?this.book.title : this.book.title.substring(0,40)+'...';
    }
  },
  methods:{
    removeBook(id){
      this.$emit('removeBook',id)
    }
  }
};
</script>