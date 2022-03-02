<template>
  <div class="game-timer">
    00:{{ displayTimer }}
  </div>
</template>

<script>
export default {
  props: {
    gameTimer: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.startTimer();
  },
  computed: {
    displayTimer() {
      if (this.gameTimer < 10) {
        return `0${this.gameTimer}`;
      }
      return this.gameTimer;
    },
  },
  methods: {
    startTimer() {
      const timerInstance = setInterval(() => {
        if (this.gameTimer < 0) {
          clearInterval(timerInstance);
        } else {
          this.$emit('updateGameTimer', this.gameTimer - 1);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.game-timer {
  font-size: 20px;
}
</style>
