<template>
  <div class="candy-wrapper">
    <div
      v-if="top !== 0"
      class="candy" ref="candy"
      :style="{ transform: `translate(0px, ${top}px)` }"
    >
    </div>
  </div>
</template>

<script>
import stylesVariables from '@/assets/styles/exports.scss';

const CANDY_SIZE = parseInt(stylesVariables.candySize, 10);
const MAX_SPEED = CANDY_SIZE * 0.8;
const MIN_SPEED = CANDY_SIZE * 0.1;

const MAX_DELAY = 5000; // seconds
const MIN_DELAY = 1000; // seconds

export default {
  props: {
    totalDistance: {
      type: Number,
      default: 400,
    },
    index: {
      type: Number,
      default: 0,
    },
    tick: {
      type: Object,
      default: () => ({ delta: 0, prevTimestamp: 0 }),
    },
  },
  data() {
    return {
      speed: 0,
      top: 0,
    };
  },
  watch: {
    tick({ delta }) {
      this.drop(delta);
    },
  },
  created() {
    this.setSpeed();
  },
  methods: {
    getSpeed() {
      return Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    },
    setSpeed() {
      this.speed = this.getSpeed();
    },
    getDelay() {
      return Math.random() * (MAX_DELAY + MIN_DELAY) - MIN_DELAY;
    },
    setDelay() {
      setTimeout(() => {
        this.speed = this.getSpeed();
      }, this.getDelay());
    },
    drop(delta) {
      const candyCurrDist = this.top;
      const candyNewDist = candyCurrDist + (this.speed * delta * 0.01);
      if (candyNewDist > this.totalDistance) {
        this.top = 0;
        this.setSpeed();
        // this.stop = true;
      } else {
        this.top = candyNewDist;
        // this.stop = fal/se;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.candy-wrapper {
  width: 200px;
}
.candy {
  position: relative;
  width: $candy-size;
  height: $candy-size;
  border-radius: 50%;
  background-color: purple;
  top: 0;
  margin: auto;
}
</style>
