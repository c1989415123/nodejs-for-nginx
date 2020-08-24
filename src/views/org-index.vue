<template>
  <div>
    <org ref="orgChart"></org>
    <div>
      <div @click="enlarge">变大</div>
      <div @click="reduce">变小</div>
    </div>
  </div>
</template>

<script>
  import Org from './org'
  export default {
    name: "org-index",
    components: {
      Org
    },
    methods:{
      enlarge() {
        this.$refs.orgChart.diagram.scale += 0.1
      },
      reduce() {
        this.$refs.orgChart.diagram.scale -= 0.1
      },
    }
  }
</script>

<style scoped>

</style>
