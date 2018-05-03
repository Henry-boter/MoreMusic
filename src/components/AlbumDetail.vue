<template>
  <transition name="slide">
    <div class="album">
      <moreheader :showBack="true" @onBack="back">青春的纪念碑</moreheader>
    </div>
  </transition>
</template>
<script>
import Moreheader from '@/components/MoreHeader'
export default {
  name: 'AlbumDetail',
  components: {
    Moreheader
  },
  data () {
    return {}
  },
  filters: {},
  mounted () {

  },
  computed: {},
  methods: {
    back () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped="scoped" lang="stylus" rel="stylesheet/stylus">
.album
  background-color #fff
  position: fixed
  z-index: 2
  top: 0
  left: 0
  bottom: 0
  right: 0
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
