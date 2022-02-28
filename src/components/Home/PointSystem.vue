<template>
  <div>
    <p class="total-points">{{totalPoints}}</p>
    <p class="highest-point">Highscore: {{Math.max(highscore, totalPoints)}}</p>
  </div>
</template>

<script>
const HIGHSCORE_KEY = 'jiayingPortfolio.highscore';

export default {
  props: {
    totalPoints: {
      type: Number,
      default: 0,
    },
    gameTimer: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      highscore: this.getHighscore(),
    };
  },
  beforeDestroy() {
    this.updateHighscore();
  },
  watch: {
    gameTimer(val) {
      if (val <= 0) {
        this.updateHighscore();
      }
    },
  },
  created() {
    window.addEventListener('beforeunload', this.updateHighscore);
  },
  methods: {
    updateHighscore() {
      if (this.validateHighscore()) {
        window.localStorage.setItem(HIGHSCORE_KEY, this.totalPoints);
      }
      this.highscore = this.getHighscore();
    },
    validateHighscore() {
      const currHighscore = this.getHighscore() || 0;
      return this.totalPoints > currHighscore;
    },
    getHighscore() {
      return window.localStorage.getItem(HIGHSCORE_KEY) || 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.total-points {
  font-size: 120px;
  font-weight: bold;
  margin: 0;
}
</style>
