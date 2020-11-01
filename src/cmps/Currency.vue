<template>
  <h3 class="currency">{{getCurrency}}</h3>
</template>

<script>
export default {
  name: "Currency",
  props: ["price"],
  computed: {
    getCurrency() {
      if (this.price) {
        return new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: this.price.currencyCode,
        }).format(this.price.amount);
      } else {
        return "";
      }
    },
  },
};
</script>
