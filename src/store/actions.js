import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'
export default {
  addCart({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      //查找之前数组中是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      //判断oldProduct
      if(oldProduct) {
        commit(ADD_COUNTER, oldProduct)
        resolve('当前商品的数量+1')
      } else {
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve('成功加入购物车')
      }  
    })
  }
}