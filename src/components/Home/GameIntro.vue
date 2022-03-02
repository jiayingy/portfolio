<template>
  <div class="intro-text">
    Move with your left and right arrow keys
    <div class="intro-timer" ref="introTimerEl">
      <div class="intro-timer-countdown" v-if="introTimer > 0">{{ introTimer }}</div>
      <div v-else>Start!</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    introTimer: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>

@keyframes countdown {
  0% {
    transform: none;
  }

  20% {
    transform: scale(1.3);
  }

  30% {
    transform: none;
  }
}
.intro-text {
  text-transform: initial;
}

.intro-timer {
  font-size: 120px;
  font-weight: bold;
  opacity: 1;
  min-height: 144px;

  .intro-timer-countdown {
    animation: countdown 1s infinite;
  }
}
</style>
