import emitter from 'tiny-emitter'
import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    //接受图片监听事件
    this.refresh = debounce(this.$refs.scroll.refresh, 100)

    //保存监听的事件
    this.itemImgListener = () => { this.refresh() }
    emitter.prototype.on('itemImageLoad', this.itemImgListener)
    // console.log('我是mixin的内容');
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    listenShowBackTop(position) {
      //监听回到顶部
      this.isShowBackTop = (-position.y) > 1000
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  },
}