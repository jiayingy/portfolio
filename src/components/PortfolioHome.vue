<template>
  <div class="portfolio-home">
    <GameTimer
      :timer="timer"
      ref="timer"
      @updateTimer="updateTimer"
    />
    <PointSystem
      :totalPoints="totalPoints"
      :timer="timer"
      ref="pointSystem"
    />
    <CandyController
      :height="height"
      :width="width"
      :charPos="charPos"
      @scorePoint="scorePoint"
      ref="candyController"
      :timer="timer"
    />
    <CharacterController
      :width="width"
      @updateCharPos="updateCharPos"
      ref="characterController"
    />
  </div>
</template>

<script>
import PointSystem from './Home/PointSystem';
import CandyController from './Home/CandyController';
import CharacterController from './Home/CharacterController';
import GameTimer from './Home/GameTimer';
const TIMER = 30;

export default {
  components: {
    PointSystem,
    CandyController,
    CharacterController,
    GameTimer,
  },
  data() {
    return {
      prevTimestamp: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      charPos: {},
      totalPoints: 0,
      timer: TIMER,
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
    scorePoint() {
      this.totalPoints += 1;
    },
    updateTimer(timer) {
      this.timer = timer;
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
