<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>

    <!-- 商品列表展示 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'

import {mapGetters} from 'vuex'
import CartBottomBar from './childComps/CartBottomBar.vue'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>