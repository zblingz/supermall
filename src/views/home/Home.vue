<template>
  <div id="home">
    <nav-bar class="home-nav">
    <template v-slot:center>
      <div>购物街</div>
    </template>
  </nav-bar>
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childcomps/HomeSwiper.vue'
import RecommendView from './childcomps/RecommendView.vue'
//通过getHomeMultidata() 请求数据 
import {getHomeMultidata} from 'network/home'
export default {
  name: 'Home',
  data() {
    return {
      // result: null
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      //使用result 来接受 res(请求到的数据)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>