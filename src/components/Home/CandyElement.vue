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
    charPos: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      speed: 0,
      top: 0,
      stop: false,
      candyPos: {},
    };
  },
  watch: {
    tick({ delta }) {
      this.drop(delta);
    },
    stop(val) {
      if (val) {
        this.top = 0;
        this.speed = 0;
        this.stop = false;
        this.setDelay();
      }
    },
    isHit(val) {
      if (val) {
        this.stop = true;
      }
    },
  },
  created() {
    this.setDelay();
  },
  computed: {
    isHit() {
      const candyPosBottom = this.candyPos.bottom;
      const candyPosLeft = this.candyPos.left;
      const candyPosRight = this.candyPos.right;

      const charPosTop = this.charPos.top;
      const charPosLeft = this.charPos.left;
      const charPosRight = this.charPos.right;

      return (candyPosLeft >= charPosLeft
        && candyPosRight <= charPosRight
        && candyPosBottom >= charPosTop
      );
    },
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
        this.stop = true;
      } else {
        this.top = candyNewDist;
      }
      this.setCandyPos();
    },
    setCandyPos() {
      const { candy } = this.$refs;
      if (candy) {
        const {
          top, bottom, left, right,
        } = candy.getBoundingClientRect();
        this.candyPos = {
          top, bottom, left, right,
        };
      } else {
        this.candyPos = {};
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
