<template>
  <div class="portfolio-home">
    <CandyController/>
  </div>
</template>

<script>
import CandyController from './Home/CandyController';

export default {
  components: {
    CandyController
  }
}
</script>

<style lang="scss" scoped>
.portfolio-home {
  width: 100%;
  height: 100%;
}
</style>