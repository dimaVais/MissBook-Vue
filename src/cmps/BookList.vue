<template>
  <section class="book-list flex space-around align-center wrap">
      <div v-for="currBook in books" :key="currBook._id">
         <router-link class="card-router" :to="{ name: 'BookDetails', params: { id: currBook._id}}">
           <book-card :book="currBook" @removeBook="removeBook"/>  </router-link>
      </div>
  </section>
</template>

<script>
import BookCard from '@/cmps/BookCard.vue';

export default {
  name: "BookList",
  props:['books'],
  components:{
      BookCard
  },
  methods:{
    removeBook(id){
      console.log('id is',id);
      this.$emit('removeBook',id)
    }
  }
};
</script>
