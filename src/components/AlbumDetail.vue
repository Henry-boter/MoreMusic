<template>
  <transition name="slide">
    <div class="album">
      <moreheader :showBack="true" @onBack="back">{{albumDetail.album_name}}</moreheader>
      <div class="album-img" :style="{backgroundImage: 'url(' +albumDetail.album_img+')'}">
        <img width="100%" src="" alt="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
      </div>
      <div class="desc-wrapper">
        <p class="vol">vol.{{albumDetail.album_id}} #{{albumDetail.genre}}</p>
        <h1 class="title">{{albumDetail.album_name}}</h1>
        <p class="desc-text" :class="{ cut: more }" v-html="albumDetail.desc"></p>
        <svg class="icon" aria-hidden="true" v-if="more" @click="more=false">
          <use xlink:href="#icon-zhankai"></use>
        </svg>
        <p class="hr"></p>
        <div class="song-item" v-for="(item, index) in albumDetail.songs"
             :key="item.songid"
             @click="selectItem(item, index)">
          <div class="left">{{index + 1}}.</div>
          <div class="right">
            <h1>{{item.songname}}  <span>{{item.albumdesc}}</span></h1>
            <p>{{item.singer}}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Moreheader from '@/components/MoreHeader'
import {mapActions} from 'vuex'
export default {
  name: 'AlbumDetail',
  components: {
    Moreheader
  },
  data () {
    return {
      more: true
    }
  },
  filters: {},
  created () {
    this.albumDetail = this.$route.query.item
    if (!this.$route.query.item.album_id) {
      this.$router.push('/')
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    back () {
      this.$router.push({
        path: '/'
      })
    },
    selectItem (item, index) {
      console.log(item)
      this.selectPlay({
        list: this.albumDetail.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
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
    padding 20px 20px 60px 20px
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
      &.cut
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp: 3
        overflow hidden
    .icon
      width 20px
      height 20px
      margin 0 auto
      fill currentColor
      color $color-text-p
      display block
      padding-top 15px
    .hr
      background-color $color-line
      width 100%
      height 1px
      transform scaleY(0.5)
      margin-top 24px
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
          span
            font-size $font-size-small
        p
          color $color-text-d
          font-size $font-size-medium
          line-height 2
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
