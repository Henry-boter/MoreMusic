<template>
  <div id="app">
    <more-header :title="headTitle">{{headTitle}}</more-header>
    <router-view/>
    <player></player>
  </div>
</template>

<script>
import MoreHeader from './components/MoreHeader.vue'
import Player from './components/Player.vue'
export default {
  name: 'App',
  components: {
    MoreHeader,
    Player
  },
  data () {
    return {
      headTitle: 'MORE MUSIC'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "assets/stylus/reset.styl"
</style>
