<template>
  <div style="display: inline-block">
    <input type="text" :value="someProp">
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['someProp'],
    model: {
      prop: 'someProp'
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
