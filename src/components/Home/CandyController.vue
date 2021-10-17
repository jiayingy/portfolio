<template>
  <div class="candy-controller" ref="candyController">
      <CandyElement
        v-for="i in maxRow"
        :key="i"
        :index="i"
        :totalDistance="height"
        :charPos="charPos"
        @scorePoint="scorePoint"
        ref="candies"
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
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    charPos: {
      type: Object,
      default: () => ({}),
    },
    timer: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    maxRow() {
      return Math.min(Math.ceil(this.width / 200), MAX_ROW);
    },
  },
  methods: {
    scorePoint() {
      this.$emit('scorePoint');
    },
    render(delta) {
      if (this.timer > 0) {
        this.$refs.candies.forEach((candy) => candy.render(delta));
      } else {
        // eslint-disable-next-line no-param-reassign
        this.$refs.candies.forEach((candy) => { candy.top = 0; });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.candy-controller {
  display: flex;
  overflow: hidden;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
