import emitter from 'tiny-emitter'
import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //接受图片监听事件
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    //保存监听的事件
    this.itemImgListener = () => { refresh() }
    emitter.prototype.on('itemImageLoad', this.itemImgListener)
    // console.log('我是mixin的内容');
  },
}