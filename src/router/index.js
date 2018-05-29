import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'
import Table from '@/components/Table'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
