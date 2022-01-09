<template>
  <div class="icon-selector" :class="{'active': checked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.icon-selector {
  position: relative;
  width: 18px;
  height: 18px;
  border: 2px solid rgb(80, 79, 79);
  border-radius: 50%;
}

.active {
  background-color: rgb(194, 33, 33);
  border: rgb(194, 33, 33);
}
</style>