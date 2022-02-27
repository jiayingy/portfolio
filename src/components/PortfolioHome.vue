<template>
  <div class="portfolio-home">
    <div class="portfolio-home-bg">
      <GameTimer
        :timer="timer"
        ref="timer"
        @updateTimer="updateTimer"
        v-if="timer > 0"
      />
      <GameReset @reset="reset"
        v-else
      />
      <PointSystem
        :totalPoints="totalPoints"
        :timer="timer"
        ref="pointSystem"
      />
    </div>
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
import GameReset from './Home/GameReset';

const TIMER = 30;

export default {
  components: {
    PointSystem,
    CandyController,
    CharacterController,
    GameTimer,
    GameReset,
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
    reset() {
      this.$refs.pointSystem.updateHighscore();
      this.totalPoints = 0;
      this.timer = TIMER;
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

  * {
    user-select: none;
  }
}

.portfolio-home-bg {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #cccccc;
  user-select: none;
  text-transform: uppercase;
}
</style>
