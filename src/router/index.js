import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookApp from '../views/BookApp.vue'
import About from '../views/About.vue'
import BookDetails from '../views/BookDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/book',
    name: 'BookApp',
    component: BookApp
  },
  {
    path: '/book/details/:id',
    name: 'BookDetails',
    component: BookDetails
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  routes
})

export default router
