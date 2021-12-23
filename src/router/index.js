import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('views/home/Home')
const Cate = () => import('views/cate/Cate')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cate',
    component: Cate
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
