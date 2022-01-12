<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    //普通方式
    // message: {
    //   type: String,
    //   default: ''
    // },
    // isShow: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    //插件方式
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
}
</style>