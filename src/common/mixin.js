import emitter from 'tiny-emitter'
import {debounce} from './utils'

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