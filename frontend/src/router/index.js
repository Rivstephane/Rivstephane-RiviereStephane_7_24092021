import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) next({ path: '/Posts' })
      else next()
    }
  },
  {
    path: '/deconnect',
    name: 'Deconnexion',
    component: () => import(/* webpackChunkName: "deconnect" */ '../views/Deconnexion.vue')
  },
  {
    path: '/Posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue')
  },
  {
    path: '/Profil',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "profil" */ '../views/Profil.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) next({ path: '/' })
      else next()
    }
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../components/users/SignUp.vue')
  },
  {
    path: '/OnePost',
    name: 'OnePost',
    component: () => import(/* webpackChunkName: "OnePost" */ '../views/OnePost.vue')
  },
  {
    path: '/OnePost/:id',
    name: 'OnePost/:id',
    component: () => import(/* webpackChunkName: "OnePost" */ '../views/OnePost.vue')
  },
  {
    path: '/findPostsByUser/:id',
    name: 'findPostsByUser/:id',
    component: () => import(/* webpackChunkName: "findPostsByUser" */ '../components/posts/findPostsByUser.vue')
  },
  {
    path: '/CommentsByPost/:id',
    name: 'CommentsByPost/:id',
    component: () => import(/* webpackChunkName: "CommentsByPost" */ '../views/CommentsByPost.vue')
  },
  {
    path: '/CommentsByPost',
    name: 'CommentsByPost',
    component: () => import(/* webpackChunkName: "CommentsByPost" */ '../views/CommentsByPost.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
