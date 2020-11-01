<template>
  <nav class="full flex">
    <div class="upper-box flex space-around align-center">
      <h1 class="main-header">Miss Book</h1>
      <div class="flex">
        <router-link to="/">Home <span> | </span></router-link>
        <router-link to="/book"> Books <span> | </span></router-link>
        <router-link to="/about"> About</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name:'NavBar'
}
</script>