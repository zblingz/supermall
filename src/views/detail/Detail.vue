<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info='detailInfo'/>
      <detail-param-info :param-info='paramInfo'/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods='recommends'/>
    </scroll>
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

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import emitter from 'tiny-emitter'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin} from 'common/mixin'

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
      recommends: []
    }
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    }
  },
  mixins: [itemListenerMixin],
  created() {
    //保存请求来的iid
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      //获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages

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
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>