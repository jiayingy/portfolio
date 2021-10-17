<template>
  <div class="game-timer">
    00:{{ displayTimer }}
  </div>
</template>

<script>
export default {
  props: {
    timer: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.startTimer();
  },
  computed: {
    displayTimer() {
      if (this.timer < 10) {
        return `0${this.timer}`;
      }
      return this.timer;
    },
  },
  methods: {
    startTimer() {
      const timerInstance = setInterval(() => {
        if (this.timer === 0) {
          clearInterval(timerInstance);
        } else {
          this.$emit('updateTimer', this.timer - 1);
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
