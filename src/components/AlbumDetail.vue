<template>
  <transition name="slide">
    <div class="album">
      <moreheader :showBack="true" @onBack="back">青春纪念碑</moreheader>
      <div class="album-img" style="background-image: url('http://p.qpic.cn/music_cover/WQluEbVjuA26qnfdbicpYcOeXnJI8TjJuKIlibYt1Mp8VMiaTSVYlibZyg/600?n=1')">
        <img width="100%" src="" alt="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
      </div>
      <div class="desc-wrapper">
        <p class="vol">vol.985 #独立民主</p>
        <h1 class="title">那片海</h1>
        <p class="desc-text">从带上面具的《丑八怪》到摘下礼帽的《绅士》↵这，都是薛之谦↵这，都是用优雅到极限来诠释伤悲的爱情寓言↵3首全唱作谦谦情歌↵令每一个爱过的人都痛到慰藉 让每一个爱着的人也为之黯然↵↵出道10年，2015年正式签约海蝶音乐，首次担当制作人的薛之谦，包揽了这张概念EP的所有词曲，仅3首唱作曲目，但是100%的薛之谦。从上一张专辑到《绅士》经历了19个月，往返北京、上海、台北……好好做“音乐”是薛之谦最认真的梦想，不遗余力，甚至有些强迫症。↵从《认真的雪》到《你还要我怎样》，薛之谦的情歌，听着总是让人不由的纠结和悲伤。“相对于作曲，我更加喜欢填词。”这一次作为EP总制作人的他，是这样评价自己的。↵“在爱情面前，我不是一位《演员》，但愿成为一名《绅士》。”↵翻开歌词本，带上耳机，听完这三首歌，你会发现，这里住着一位“心里下着雨”的薛之谦。↵</p>
        <p></p>
        <div class="song-item">
          <div class="left">1.</div>
          <div class="right">
            <h1>Too Far</h1>
            <p>plasi</p>
          </div>
        </div>
      </div>
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
  @import "../assets/stylus/theme.styl"
.album
  background-color #fff
  position: fixed
  z-index: 2
  top: 0
  left: 0
  bottom: 0
  right: 0
  overflow auto
  .album-img
    padding-top 300px
    background-size cover
    position relative
    .icon
      width 50px
      height 50px
      fill: currentColor
      color $color-text-r
      position absolute
      bottom -25px
      right 20px
      background-color #fff
      border-radius 50%
  .desc-wrapper
    padding 15px
    .vol
      color $color-text-d
      font-size $font-size-medium
      line-height 2
    .title
      font-size $font-size-large-xxl
      color $color-text
      line-height 3
    .desc-text
      font-size $font-size-medium-x
      color $color-text-p
      line-height 1.5
      border-bottom 1px solid $color-line
    .song-item
      display flex
      align-items center
      padding 10px 0
      .left
        width 40px
        color $color-text-d
      .right
        h1
          color $color-text-p
          font-size $font-size-large
        p
          color $color-text-d
          font-size $font-size-medium
          line-height 2
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
