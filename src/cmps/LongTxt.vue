<template>
  <p>
     {{ getText }}
    <button v-if="initText.length>=100" @click="toggleTxt()">{{ btnTxt }}</button>
  </p>
</template>

<script>
export default {
  name: "LongTxt",
  props: ["initText"],
  data() {
    return {
      isFull: false,
      btnTxt: "more"
    };
  },
  computed: {
    getText() {
      const txt = (this.isFull) ? this.initText : this.initText.substring(0, 100);
      return (txt.length < 100)? txt : txt+".....";
    },
  },
  methods: {
    toggleTxt() {
      this.isFull = !this.isFull;
      this.btnTxt = (this.isFull) ? "less" : "more";
    },
  },
};
</script>