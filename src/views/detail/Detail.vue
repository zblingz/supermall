<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
      <detail-param-info ref="params" :param-info='paramInfo'/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods='recommends'/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart='addToCart'/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import emitter from 'tiny-emitter'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      itemInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0
    }
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh()
      this.refresh()
      this.getThemeTopYs()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      //普通做法
      // for( let i = 0; i< length; i++) {
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
      //    || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //      this.currentIndex = i
      //      this.$refs.nav.currentIndex = this.currentIndex 
      //    }
      // }

      //取巧做法
      for( let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.listenShowBackTop(position)
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.itemInfo.title
      product.desc = this.itemInfo.desc
      product.price = this.itemInfo.highNowPrice
      product.iid = this.iid  

      //2.将商品添加到购物车(1. Promise 2. mapActions)

      //分发Action
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      //使用mapActions辅助函数 actions可以返回一个Promise
      this.addCart(product).then(res => {
        console.log(res);
      })

    }
  },  
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    //保存请求来的iid
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      //获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages

      this.itemInfo = data.itemInfo
      
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //保存商品的详情数据
      this.detailInfo = data.detailInfo

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //获取评论信息
      if(data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //给getThemeTopYs赋值进行防抖操作
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [] 
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    }, 200)

    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
  },
  destroyed() {
    //取消全局事件的监听
    emitter.prototype.off('itemImageLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/* .content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 58px;
} */

.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>