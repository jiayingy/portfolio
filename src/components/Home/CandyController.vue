<template>
  <div class="candy-controller" ref="candyController">
      <CandyElement
        v-for="i in maxRow"
        :key="i"
        :index="i"
        :totalDistance="height"
        :tick="{ delta, prevTimestamp }"
      />
  </div>
</template>

<script>
import CandyElement from './CandyElement';

const MAX_ROW = 8;

export default {
  components: { CandyElement },
  props: {
    rows: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
      prevTimestamp: 0,
      delta: 0,
    };
  },
  created() {
    window.addEventListener('resize', this.getWindowSize);
    this.tick(0);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize);
  },
  computed: {
    maxRow() {
      return Math.min(Math.ceil(this.width / 200), MAX_ROW);
    },
  },
  methods: {
    getWindowSize() {
      this.height = window.innerHeight;
      this.width = window.innerWidth;
    },
    tick(timestamp) {
      this.delta = timestamp - this.prevTimestamp;
      this.prevTimestamp = timestamp;
      requestAnimationFrame(this.tick);
    },
  },
};
</script>

<style lang="scss" scoped>
.candy-controller {
  display: flex;
  overflow: hidden;
  height: 100%;
}
</style>
