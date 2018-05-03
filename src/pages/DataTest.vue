<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{list.data.list[0].songs[0].url}}</p>
  </div>
</template>

<script>
import {albumlib} from '@/data/songData'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: []
    }
  },
  created () {
    this.getAlbumList()
  },
  methods: {
    getAlbumList () {
      console.log(albumlib)
      this.list = albumlib
    }
  }
}
</script>
<style scoped>

</style>
