<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.song_img" alt="">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhankai"></use>
            </svg>
          </div>
          <h1 class="title">{{currentSong.songname}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="Cls">
                <img class="image" :src="currentSong.song_img" alt="">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">这里是歌词</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon-operators i-left">
              <svg class="icon i-small" aria-hidden="true" @click="prev">
                <use xlink:href="#icon-shangyishou"></use>
              </svg>
            </div>
            <div class="icon-operators i-center">
              <svg class="icon" aria-hidden="true" @click="togglePlaying">
                <use xlink:href="#icon-zanting" v-if="playing"></use>
                <use xlink:href="#icon-bofang" v-else></use>
              </svg>
            </div>
            <div class="icon-operators i-right">
              <svg class="icon i-small" aria-hidden="true" @click="next">
                <use xlink:href="#icon-kuaijin"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini"></transition>
    <div class="mini-player" v-show="!fullScreen">
      <div class="icon-player" @click="open" >
        <img :class="Cls" :src="currentSong.song_img"/>
      </div>
      <div class="text" @click="open">
        <h2 class="name">{{currentSong.songname}}</h2>
        <p class="desc">{{currentSong.singer}}</p>
      </div>
      <div class="control" @click="togglePlaying">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-zanting" v-if="playing"></use>
          <use xlink:href="#icon-bofang" v-else></use>
        </svg>
      </div>
      <div class="control">
        <svg class="icon icon-small" aria-hidden="true">
          <use xlink:href="#icon-kuaijin"></use>
        </svg>
      </div>
    </div>
    <audio ref="audio"
           :src="currentSong.url"
           @canplay="ready"
           @error="error"
           @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import progressBar from '@/common/progress-bar.vue'
import animations from 'create-keyframe-animation'
export default {
  name: 'Player',
  components: {
    progressBar
  },
  data () {
    return {
      songReady: false,
      currentTime: 0,
      duration: 0,
      percent: 0
    }
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  computed: {
    Cls () {
      return this.playing ? 'play ' : 'play pause'
    },
    disableCls () {
      return this.songReady ? '' : 'disabled'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    enter (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}, ${y}, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.2)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave () {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style.transform = ''
    },
    // 获取元素位置和缩放尺寸
    _getPosAndScale () {
      // 小圆
      const targetWidth = 40
      const paddingLeft = 20
      const paddingBottom = 10
      // 大圆
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      // 缩放比例
      const scale = targetWidth / width
      // 坐标
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {x, y, scale}
    },
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    next () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    prev () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
      this.duration = e.target.duration
      this.percent = e.target.currentTime / e.target.duration
    },
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    // 缺位补零
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    onProgressBarChange (percent) {
      this.$refs.audio.currentTime = this.$refs.audio.duration * percent
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/theme.styl"
  @import "../assets/stylus/mixin.styl"
.normal-player
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 3
  background $color-background
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    opacity 0.6
    filter blur(20px)
  .top
    position relative
    margin-bottom 25px
    .back
      position absolute
      top 0
      left 6px
      z-index 1
      .icon
        width 22px
        height 22px
        display block
        padding 9px
        fill: currentColor
        color $color-text
    .title
      width 70%
      margin 0 auto
      line-height 40px
      text-align center
      no-wrap()
      font-size $font-size-large
      color $color-text
    .subtitle
      line-height 20px
      text-align center
      font-size $font-size-medium
      color $color-text
  .middle
    position fixed
    width 100%
    top 80px
    bottom 170px
    white-space nowrap
    font-size 0
    .middle-l
      display inline-block
      vertical-align top
      position relative
      width 100%
      height 0
      padding-top 80%
      .cd-wrapper
        position absolute
        left 10%
        top 0
        width 80%
        height 100%
        .cd
          width 100%
          height 100%
          box-sizing border-box
          border 10px solid rgba(255,255,255,0.2)
          border-radius 50%
          &.play
            animation rotate 20s linear infinite
          &.pause
            animation-play-state paused
          .image
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            border-radius 50%
      .playing-lyric-wrapper
        width 80%
        margin 30px auto 0 auto
        overflow hidden
        text-align center
        .playing-lyric
          height 20px
          line-height 20px
          font-size $font-size-medium
          color $color-text-l
  .bottom
    position absolute
    bottom 50px
    width 100%
    .progress-wrapper
      display flex
      align-items center
      width 80%
      margin 0 auto
      padding 10px 0
      .time
        color $color-text
        font-size $font-size-small
        flex 0 0 30px
        line-height 30px
        width 30px
        &.time-l
          text-align left
        &.time-r
          text-align right
      .progress-bar-wrapper
        flex 1
    .operators
      display flex
      align-items center
      .icon-operators
        flex 1
        .icon
          width 36px
          height 36px
          fill currentColor
          color $color-text-w
          &.disabled
            color $color-text-d
          &.i-small
            width 28px
            height 28px
      .i-left
        text-align right
      .i-center
        padding 0 20px
        text-align center
        .icon:active
          color $color-text-r
      .i-right
        text-align left
  &.normal-enter-active, &.normal-leave-active
    transition all 0.4s
    .top, .bottom
      transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  &.normal-enter, &.normal-leave-to
    opacity: 0
    .top
      transform: translate3d(0, -100px, 0)
    .bottom
      transform: translate3d(0, 100px, 0)
.mini-player
  display flex
  align-items center
  position fixed
  left 0px
  bottom 0px
  z-index 3
  width 100%
  height 60px
  border-top 1px solid $color-line
  background $color-background
  &.mini-enter-active, &.mini-leave-attive
    transition all .4s
  &.mini-enter, &.mini-leave-to
    opacity 0
  .icon-player
    flex 0 0 40px
    width 40px
    padding 0 10px 0 20px
    img
      width 40px
      height 40px
      border-radius 50%
      &.play
        animation: rotate 10s linear infinite
      &.pause
        animation-play-state: paused
  .text
    display flex
    flex-direction column
    justify-content center
    flex 1
    line-height 20px
    overflow hidden
    .name
      margin-bottom 2px
      no-wrap()
      font-size $font-size-medium-x
      color #555
    .desc
      no-wrap()
      font-size $font-size-medium
      color #777
  .control
    flex 0 0 30px
    width 30px
    padding 0 10px
    .icon
      width 28px
      height 28px
      fill currentColor
      color $color-text-l
      &.icon-small
        width 20px
      &:active
        color $color-text-r
  @keyframes rotate
    0%
      transform : rotate(0)
    100%
      transform rotate(360deg)
</style>
