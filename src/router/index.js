import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Todo from '@/components/Todo'
import auth from '@/auth/auth.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (auth.checkAuth()) {
          next({
            path: '/dashboard'
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'Todo',
      component: Todo,
      meta: {requiresAuth: true}
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (auth.checkAuth()) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router

