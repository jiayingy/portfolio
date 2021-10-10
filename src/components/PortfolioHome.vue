<template>
  <div class="portfolio-home">
    <CandyController
      :height="height"
      :width="width"
      :charPos="charPos"
      ref="candyController"
    />
    <CharacterController
      :width="width"
      @updateCharPos="updateCharPos"
      ref="characterController"
    />
  </div>
</template>

<script>
import CandyController from './Home/CandyController';
import CharacterController from './Home/CharacterController';

export default {
  components: {
    CandyController,
    CharacterController,
  },
  data() {
    return {
      prevTimestamp: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      charPos: {},
    };
  },
  created() {
    window.addEventListener('resize', this.getWindowSize);
  },
  mounted() {
    this.tick(0);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize);
  },
  methods: {
    tick(timestamp) {
      const delta = timestamp - this.prevTimestamp;
      this.prevTimestamp = timestamp;
      this.$refs.characterController.render(delta);
      this.$refs.candyController.render(delta);
      requestAnimationFrame(this.tick);
    },
    getWindowSize() {
      this.height = window.innerHeight;
      this.width = window.innerWidth;
    },
    updateCharPos(payload) {
      this.charPos = payload;
    },
  },
};
</script>

<style lang="scss" scoped>
.portfolio-home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
