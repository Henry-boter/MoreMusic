<template>
  <div style="width: 100vw;overflow: hidden">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in listImg" :key="index">
          <div style="width: 94%;height: 94%; margin-top: 4%;margin-left: 3%;box-shadow: 0px 0px 5px #d9d9d9;border-radius: 3px">
            <div style="padding: 10px">
              <img :src="item.url" alt="">
              <p>fsdfh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
      listImg: [
        {id: 1, url: 'http://p.qpic.cn/music_cover/WQluEbVjuA26qnfdbicpYcOeXnJI8TjJuKIlibYt1Mp8VMiaTSVYlibZyg/600?n=1'},
        {id: 2, url: 'http://p.qpic.cn/music_cover/y0Elj3m25QhKsCrLguvkxz3cuKjtUMdOD8RQIK1gza46Wkfrq8oiaEA/600?n=1'},
        {id: 3, url: 'http://p.qpic.cn/music_cover/s6ib7KHLTqdrU3UxaGALxNZk97uK8w7nHPAHr22ggibZnE1H9cvhO7Cw/600?n=1'},
        {id: 4, url: 'http://p.qpic.cn/music_cover/OxYJ3e12Q1MiaibkTa8iaSjoKTaj1NtVA1RlDe0A3yGjwCmbaKaIElczw/600?n=1'}
      ]
    }
  },
  mounted () {
    console.log('mounted', this)
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: false,
      slidesPerView: 3,
      onTouchEnd: function () {
        swiper.startAutoplay()
      }
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.swiper-container
  width 240%
  margin-left -70%
  height 80vh
  .swiper-waapper
    width 100%
    height 100%
  .swiper-slide
    background-position center
    background-size cover
    width 100%
    height 100%
    img
      width 100%
  .swiper-pagination-bullet
    width 0.833rem
    height 0.833rem
    background: #7c5e53
</style>
