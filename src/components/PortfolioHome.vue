<template>
  <div class="portfolio-home">
    <HomeBackground
      :totalPoints="totalPoints"
      :gameTimer="gameTimer"
      :introTimer="introTimer"
      @updateGameTimer="updateGameTimer"
      @reset="reset"
    />
    <CandyController
      :height="height"
      :width="width"
      :charPos="charPos"
      @scorePoint="scorePoint"
      ref="candyController"
      :gameTimer="gameTimer"
    />
    <CharacterController
      :width="width"
      @updateCharPos="updateCharPos"
      ref="characterController"
    />
  </div>
</template>

<script>
import HomeBackground from './Home/HomeBackground';
import CandyController from './Home/CandyController';
import CharacterController from './Home/CharacterController';

const GAME_TIMER = 30;
const INTRO_TIMER = 5;

export default {
  components: {
    HomeBackground,
    CandyController,
    CharacterController,
  },
  data() {
    return {
      prevTimestamp: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      charPos: {},
      totalPoints: 0,
      gameTimer: GAME_TIMER,
      introTimer: INTRO_TIMER,
    };
  },
  created() {
    window.addEventListener('resize', this.getWindowSize);
    this.startIntroCountdown();
  },
  mounted() {
    this.tick(0);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize);
  },
  computed: {
    hasStarted() {
      return this.introTimer < 0 && this.gameTimer >= 0;
    },
  },
  methods: {
    tick(timestamp) {
      const delta = timestamp - this.prevTimestamp;
      this.prevTimestamp = timestamp;
      this.$refs.characterController.render(delta);
      this.$refs.candyController.render(delta);
      requestAnimationFrame(this.tick);
    },
    startIntroCountdown() {
      const intervalId = setInterval(() => {
        this.introTimer -= 1;

        if (this.introTimer < 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    },
    getWindowSize() {
      this.height = window.innerHeight;
      this.width = window.innerWidth;
    },
    updateCharPos(payload) {
      this.charPos = payload;
    },
    scorePoint() {
      if (this.hasStarted) {
        this.totalPoints += 1;
      }
    },
    updateGameTimer(timer) {
      this.gameTimer = timer;
    },
    reset() {
      this.totalPoints = 0;
      this.gameTimer = GAME_TIMER;
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
