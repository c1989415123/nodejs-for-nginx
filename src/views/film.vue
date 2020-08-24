<template>
  <div class="container">
    <Header ref="header">
      <div slot="left">返回</div>
      <div slot="middle" class="title">首页</div>
      <div slot="right" @click="moreBtn">更多</div>
    </Header>
    <div class="ctrl-btn" :class="[isUp?'kbup':'']">
      <button @click="getInTheaters">按钮1</button>
      <button @click="getComingSoon">按钮2</button>
    </div>
    <input type="text" class="search">
    <div style="height: 400px">

    </div>
    <input type="text" class="search" @focus="bdcolor">
    <div class="main">
      <div class="film-item" v-for="item in list">
        <h4>{{item.title}}</h4>
        <img :src="item.images.small | getImages" alt="pic" height="260">
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '@/components/header'
  import api from '@/api/axiosConfig'
  import {kbEvt,removeKbEvt,platform,browser} from '@/utils'

  export default {
    name: "film",
    data() {
      return {
        list: [],
        isUp: false
      }
    },
    components: {
      Header
    },
    methods: {
      getInTheaters() {
        this.$http['filmList/in_theaters']({
          name: 'aaa',
          age: 12
        }).then(res => {
          this.list = res.data.subjects
        }).catch(err => {

        })
      },
      getComingSoon() {
        api['filmList/coming_soon']().then(res => {
          this.list = res.data.subjects
        }).catch(err => {
          console.log(err)
        })
      },
      bdcolor() {
        console.log(11113)
      },
      moreBtn() {
        this.$router.push({
          path:'/org'
        })
      }
    },
    mounted() {
      let evtObj = kbEvt(() => {
        this.isUp = true
      }, () => {
        this.isUp = false
      })
      removeKbEvt(evtObj)

      console.log('platform',platform)
      console.log('browser.version',browser.version)
      console.log(navigator.userAgent)
    },
    filters: {
      getImages(url) {
        if (url !== undefined) {
          return 'https://images.weserv.nl/?url=' + url.substring(7)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    padding-top: 60px;
  }

  .ctrl-btn {
    margin: 20px 0;
    text-align: center;

    &.kbup {
      background-color: red;
    }

    button {
      padding: 6px 10px;
      border: none;
      outline: none;
      background-color: @main-color;
      color: #fff;
      cursor: pointer;
    }
  }

  .main {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .film-item {
      text-align: center;
    }
  }

  .title {
    font-size: 20px;
  }

  .search {
    width: 300px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #07AEB2;
  }
</style>
