<template>
  <div
    v-bind:class="{
      success: msg.status === 'success',
      fail: msg.status === 'fail',
    }"
    class="msg-box flex space-around"
    v-if="msg.isShown"
  >
    <div class="icon-box flex align-center">
      {{ msgIcon }}
    </div>
    <div class="data-box">
      <h2>{{ msgStatus }}</h2>
      <p>{{ msg.txt }}</p>
    </div>
  </div>
</template>

<script>
import eventBus from "@/services/eventBusService.js";

export default {
  name: "UserMsg",
  data() {
    return {
      msg: {
        txt: "",
        status: "",
        isShown: false,
      },
    };
  },
  created() {
    eventBus.$on('showMsg', (res)=>{
      this.msg.txt = res.txt;
      this.msg.status = res.status;
      this.msg.isShown = !this.msg.isShown;
      setTimeout(() => {
        this.msg.txt = "";
        this.msg.status = "";
        this.msg.isShown = !this.msg.isShown;
      }, 2000);
    });
  },
  destroyed() {
    eventBus.off('showMsg');
  },
  computed: {
    msgStatus() {
      return this.msg.status === "success" ? "Success" : "Fail";
    },
    msgIcon() {
      return this.msg.status === "success" ? "✔️" : "❌";
    },
    msgClass() {
      return this.msg.status === "success" ? "success" : "fail";
    },
  },
  methods: {

  },
};
</script>