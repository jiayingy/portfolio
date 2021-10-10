<template>
  <div class="portfolio-home">
    <CandyController
      :delta="delta"
      :prevTimestamp="prevTimestamp"
      :height="height"
      :width="width"
      :charPos="charPos"
    />
    <CharacterController
      :delta="delta"
      :prevTimestamp="prevTimestamp"
      :width="width"
      @updateCharPos="updateCharPos"
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
      delta: 0,
      prevTimestamp: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      charPos: {},
    };
  },
  created() {
    window.addEventListener('resize', this.getWindowSize);
    this.tick(0);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize);
  },
  methods: {
    tick(timestamp) {
      this.delta = timestamp - this.prevTimestamp;
      this.prevTimestamp = timestamp;
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
