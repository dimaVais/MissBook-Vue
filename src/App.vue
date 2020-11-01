<template>
  <div id="app" class="main-container">
    <navBar/>
    <UserMsg/>
    <router-view />
    <footer>@coffeerights 2020</footer>
  </div>
</template>

<script>
import NavBar from '@/cmps/NavBar.vue';
import UserMsg from '@/cmps/UserMsg.vue';
export default {
  components:{
    NavBar,
    UserMsg
  }
}
</script>