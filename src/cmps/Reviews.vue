<template>
    <div class="review-box flex column align-center" v-if="book">
        <h1>Book Reviews</h1>
        <form class="review-form flex column space-between align-center" @submit.prevent="addReview">
            <h2>Tell us what you think:</h2>
            <label>What is your name:
              <input v-model="review.name" placeholder="Insert Your Name" type="text" name="name"/>
            </label>
            <label for="rate">How was the book:
              <select v-model="review.rate" type="text" name="rate" >
                  <option value="5" selected>5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
              </select>
              </label>
              <label>When did you read the book:
                <input v-model="review.date" :defaultvalue="Date.now()" type="date" name="name"/>
            </label>
              <label>What do you think about the book:
                <textarea v-model="review.txt" placeholder="Write your review here"  type="text" name="name"/>
            </label>
              <button>Add Review</button>
          </form>
        <div class="reviews" v-for="(currReview, idx) in book.reviews" :key="idx">
          <div class="review">
            <h3>By: {{ currReview.name }}</h3>
            <h3>Rate: {{ currReview.rate }}</h3>
            <h3>Given On Date: {{ currReview.date }}</h3>
            <!-- <p> Review: {{review.txt}} </p> -->
            <p>Review: <LongTxt :initText="currReview.txt" /></p>
            <button @click.prevent="removeReview(currReview._id)">❌</button>
          </div>
        </div>
      </div>
</template>

<script>
import LongTxt from "@/cmps/LongTxt.vue";

export default {
    name:'Reviews',
    props:['book'],
    components:{
        LongTxt
    },
      data() {
    return {
      review:{
        name:'',
        rate:'',
        date:'',
        txt:''
      }
    };
  },
    methods:{
        addReview(){
            this.$emit('addReview',this.review);
            this.review={name:'', rate:'', date:'',txt:''};
        },
        removeReview(id){
            this.$emit('removeReview', id)
        }
    }
}
</script>