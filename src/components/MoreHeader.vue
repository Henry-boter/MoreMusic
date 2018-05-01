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
.more-header
  font-size 26px
  text-align center
  line-height 2
</style>
