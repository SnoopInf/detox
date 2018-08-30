<template>
  <div class="circle-wrapper">
    <div class="circle red"></div>
    <div class="circle orange"></div>
    <div class="circle yellow"></div>
  </div>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'cirlces',
  props: [],

  data: () => ({
  }),

}
</script>

<style lang="stylus">
   .circle-wrapper
      margin-left auto
      margin-right auto
      height 100px
      width 400px

      .circle
        width 100px
        height 100px
        display inline-block
        border-radius 50px
        margin-right 25px
        opacity 0.7

      .red
        background-color red

      .orange
        background-color orange

      .yellow
        background-color yellow
</style>
