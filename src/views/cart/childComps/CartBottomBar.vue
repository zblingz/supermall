<template>
  <div class="bottom-bar">
    <div class="allCheck">
      <check-button :checked='isSelectAll'
       class="check-button"
       @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="totalPrice">
      合计: {{totalPrice}}
    </div>

    <div class="calculate">
      去计算: {{cartLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥'+ this.cartList.filter(item => {
        return item.checked 
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    cartLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false
      // !0 = true 
      // return !(this.cartList.filter(item => !item.checked).length)

      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {  //全选按钮的点击: 如果为全选，点击之后取消全选
      if(this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false);
      } else { //部分或全部不选中
        this.cartList.forEach(item => item.checked = true);
      }
    }
  },
}
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #eee;
    bottom: 49px;
  }

  .allCheck {
    display: flex;
    align-items: center;
    line-height: 40px;
    width: 90px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .totalPrice {
    line-height: 40px;
    margin-left: 10px;  
    width: 140px;
  }

  .calculate {
    width: 80px;
    line-height: 40px;
    background-color: skyblue;
    color: #fff;
    padding-left: 5px;
  }
</style>