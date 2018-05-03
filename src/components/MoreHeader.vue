<template>
  <div class="more-header">
    <div class="left">
      <svg class="icon" aria-hidden="true" v-if="showBack" @click="back">
        <use xlink:href="#icon-fanhui2"></use>
      </svg>
    </div>
    <div class="middle"><slot></slot></div>
    <div class="right">
      <i v-if="showMore">更多</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreHeader',
  props: {
    showBack: {
      type: Boolean,
      default: false
    },
    showMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    back () {
      this.$emit('onBack')
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/theme.styl"
  @import "../assets/stylus/mixin.styl"
.more-header
  display flex
  align-items center
  justify-content space-between
  .left
    width 50px
    height 50px
    .icon
      width 26px
      height 26px
      padding-top 12px
      padding-left 12px
  .middle
    font-size $font-size-large-x
    color $color-head-title
    no-wrap()
  .right
    width 50px
    height 50px
</style>
