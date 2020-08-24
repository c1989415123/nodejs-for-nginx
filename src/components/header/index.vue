<template>
  <div class="common-header">
    <div class="common-header-left">
      <slot name="left"></slot>
    </div>
    <div class="common-header-middle">
      <slot name="middle"></slot>
    </div>
    <div class="common-header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="less">
  .common-header {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background-color: @main-color;
    text-align: center;
    .common-header-left{
      /*background-color: greenyellow;*/
      flex: 1;
      padding: 0 10px 0 20px ;
      text-align: left;
    }
    .common-header-middle{
      /*background-color: darkorange;*/
      flex: 4;
    }
    .common-header-right{
      /*background-color: skyblue;*/
      flex: 1;
      padding: 0 10px 0 20px ;
      text-align: right;
    }
  }
</style>
