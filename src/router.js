import Vue from 'vue'
import Router from 'vue-router'
import Vendors from './components/Vendors.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vendors',
      component: Vendors
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})