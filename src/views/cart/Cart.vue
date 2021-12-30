<template>
  <div class="wrapper" ref="mm">
    <ul class="content">
      <button @click="btnClick">点击</button>
      <li>购物车1</li>
      <li>购物车2</li>
      <li>购物车3</li>
      <li>购物车4</li>
      <li>购物车5</li>
      <li>购物车6</li>
      <li>购物车7</li>
      <li>购物车8</li>
      <li>购物车9</li>
      <li>购物车10</li>
      <li>购物车11</li>
      <li>购物车12</li>
      <li>购物车13</li>
      <li>购物车14</li>
      <li>购物车15</li>
      <li>购物车16</li>
      <li>购物车17</li>
      <li>购物车18</li>
      <li>购物车19</li>
      <li>购物车20</li>
      <li>购物车21</li>
      <li>购物车22</li>
      <li>购物车23</li>
      <li>购物车24</li>
      <li>购物车25</li>
      <li>购物车26</li>
      <li>购物车27</li>
      <li>购物车28</li>
      <li>购物车29</li>
      <li>购物车30</li>
      <li>购物车31</li>
      <li>购物车32</li>
      <li>购物车33</li>
      <li>购物车34</li>
      <li>购物车35</li>
      <li>购物车36</li>
      <li>购物车37</li>
      <li>购物车38</li>
      <li>购物车39</li>
      <li>购物车40</li>
      <li>购物车41</li>
      <li>购物车42</li>
      <li>购物车43</li>
      <li>购物车44</li>
      <li>购物车45</li>
      <li>购物车46</li>
      <li>购物车47</li>
      <li>购物车48</li>
      <li>购物车49</li>
      <li>购物车50</li>
      <li>购物车51</li>
      <li>购物车52</li>
      <li>购物车53</li>
      <li>购物车54</li>
      <li>购物车55</li>
      <li>购物车56</li>
      <li>购物车57</li>
      <li>购物车58</li>
      <li>购物车59</li>
      <li>购物车60</li>
      <li>购物车61</li>
      <li>购物车62</li>
      <li>购物车63</li>
      <li>购物车64</li>
      <li>购物车65</li>
      <li>购物车66</li>
      <li>购物车67</li>
      <li>购物车68</li>
      <li>购物车69</li>
      <li>购物车70</li>
      <li>购物车71</li>
      <li>购物车72</li>
      <li>购物车73</li>
      <li>购物车74</li>
      <li>购物车75</li>
      <li>购物车76</li>
      <li>购物车77</li>
      <li>购物车78</li>
      <li>购物车79</li>
      <li>购物车80</li>
      <li>购物车81</li>
      <li>购物车82</li>
      <li>购物车83</li>
      <li>购物车84</li>
      <li>购物车85</li>
      <li>购物车86</li>
      <li>购物车87</li>
      <li>购物车88</li>
      <li>购物车89</li>
      <li>购物车90</li>
      <li>购物车91</li>
      <li>购物车92</li>
      <li>购物车93</li>
      <li>购物车94</li>
      <li>购物车95</li>
      <li>购物车96</li>
      <li>购物车97</li>
      <li>购物车98</li>
      <li>购物车99</li>
      <li>购物车100</li>
    </ul>  
  </div>  
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Cart',
  mounted() {
    /* probeType
       0，1 不侦测实时位置
       1 在手指滚动时侦测，手指离开的惯性滚动过程不侦测
       3 只要是滚动都侦测 
    */
    //点击滑动才会生效，不是鼠标滚轮滑动
    this.bs = new BScroll('.wrapper', {
      probeType: 3,
      //上拉加载更多
      pullUpLoad: true
    }),
    this.bs.on('scroll', position => {
      // console.log(position);
    }),
    this.bs.on('pullingUp', () => {
     console.log('上拉加载更多');
     this.bs.finishPullUp() 
    })
  },
  methods: {
    btnClick() {
      console.log('点点');
    }
  },
}
</script>

<style scoped>
  .wrapper {
    height: 200px;
    background-color: rgb(23, 170, 228);
    overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>