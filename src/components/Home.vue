<template>
  <div class="swiper-box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="selectItem(item)" v-for="(item, index) in albumlist" :key="index">
          <div class="swiper-slide-box">
            <div class="swiper-slide-wrapper" style="padding: 10px">
              <div class="image" :style="{ backgroundImage: 'url(' + item.album_img + ')' }"></div>
              <p class="vol">{{item.album_id}}</p>
              <h1 class="title">{{item.album_name}}</h1>
              <p class="from">#{{item.genre}} • 创建于{{item.aDate}}</p>
              <div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang1"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {albumlib} from '@/data/songData'
export default {
  data () {
    return {
      listImg: [
        {id: 1, url: 'http://p.qpic.cn/music_cover/WQluEbVjuA26qnfdbicpYcOeXnJI8TjJuKIlibYt1Mp8VMiaTSVYlibZyg/600?n=1'},
        {id: 2, url: 'http://p.qpic.cn/music_cover/y0Elj3m25QhKsCrLguvkxz3cuKjtUMdOD8RQIK1gza46Wkfrq8oiaEA/600?n=1'},
        {id: 3, url: 'http://p.qpic.cn/music_cover/s6ib7KHLTqdrU3UxaGALxNZk97uK8w7nHPAHr22ggibZnE1H9cvhO7Cw/600?n=1'},
        {id: 4, url: 'http://p.qpic.cn/music_cover/OxYJ3e12Q1MiaibkTa8iaSjoKTaj1NtVA1RlDe0A3yGjwCmbaKaIElczw/600?n=1'}
      ],
      albumlist: []
    }
  },
  created () {
    this.getAlbumList()
  },
  mounted () {
    // console.log('mounted', this)
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: false,
      slidesPerView: 3,
      onTouchEnd: function () {
        swiper.startAutoplay()
      }
    })
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: `/${item.album_id}`,
        query: {item}
      })
    },
    getAlbumList () {
      this.list = albumlib
      this.albumlist = albumlib.data.list
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/theme.styl"
  .swiper-box
    width: 100vw
    overflow: hidden
    margin-top: 50px
    .swiper-container
      width 260%
      margin-left -80%
      height 80vh
      .swiper-slide
        background-position center
        background-size cover
        width 100%
        .swiper-slide-box
          width: 96%
          height: 94%
          margin-top: 4%
          margin-left: 2%
          box-shadow: 0px 0px 5px #d9d9d9
          border-radius: 3px
          .swiper-slide-wrapper
            display flex
            flex-direction column
            align-items center
            padding 10px
            .image
              width: 100%
              padding-bottom: 80%
              background-size: cover
              background-position: center
            .vol
              color $color-text-d
              font-size $font-size-medium
              padding 10px 0
            .title
              font-size $font-size-large-xl
              color $color-text
              padding-top 10px
            .from
              color $color-text-d
              font-size $font-size-medium
              padding 10px 0
            .icon
              width 50px
              height 50px
              fill: currentColor
              color $color-text-r
              padding-top 20px
      .swiper-pagination-bullet
        width 0.833rem
        height 0.833rem
        background: #7c5e53
</style>
