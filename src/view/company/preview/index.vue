<template>
  <div>
  <div class="main-canvas">
    <Pie></Pie>
    <Lines></Lines>
  </div>
  <Bar></Bar>
  </div>
</template>
<script>
  import Pie from './pie'
  import Lines from './line'
  import Bar from './bar'

  export default {
    data () {
      return {}
    },
    components: {
      Pie,
      Lines,
      Bar
    },
  }
</script>
<style scoped lang="scss">
  .main-canvas {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
</style>
