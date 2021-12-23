<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
#tab-bar{
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #fafafa;
}
</style>