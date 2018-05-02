<template>
  <div class="more-header">{{ title }}</div>
</template>

<script>
export default {
  name: 'MoreHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/stylus/theme.styl"
.more-header
  font-size $font-size-large-x
  text-align center
  line-height 2
  color $color-head-title
</style>
