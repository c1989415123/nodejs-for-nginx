<template>
  <div>
    <div v-for="(item,index) in list" style="margin-bottom: 10px">
      <e-input v-model="newList[index].id" :key="item.id"></e-input>
      <button @click="openPop(item.name)">按钮</button>
    </div>
    <div v-if="show" style="padding-top: 30px">
      <input type="text" v-model="txt">
      <button @click="selectVal(txt)">另外一个按钮</button>
    </div>
  </div>
</template>

<script>
  import eInput from '@/components/e-input'

  export default {
    data() {
      return {
        txt: '1231231',
        show: false,
        list: [
          {
            name: 'zhang',
            id: 1
          },
          {
            name: 'wang',
            id: 2
          },
          {
            name: 'li',
            id: 3
          },
          {
            name: 'zhao',
            id: 4
          }
        ],
        tplName: ''
      }
    },
    components: {
      eInput
    },
    computed: {
      newList() {
        let newL = this.list;
        return newL
      }
    },
    methods: {
      openPop(data) {
        this.show = true;
        this.tplName = data
      },
      selectVal(data) {
        this.newList.forEach(item => {
          if (item.name === this.tplName) {
            console.log(item);
            item.id = data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
