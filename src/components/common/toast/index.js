import Toast from './Toast.vue'
import { createApp} from "vue"
const obj = {}

obj.install = function (Vue) {
  //将组件对象，手动挂载到某一个元素上
  const instance = createApp(Toast).mount(
    document.createElement('div')
  )
  //instance.$el对应的就是div
  document.body.appendChild(instance.$el)
  Vue.config.globalProperties.$toast = instance
}

export default obj 