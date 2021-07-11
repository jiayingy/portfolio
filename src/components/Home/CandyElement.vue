<template>
  <div class="candy" ref="candy" style="top: 0"></div>
</template>

<script>
export default {
  props: {
    speed: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    totalDistance: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      interval: 20
    }
  },
  mounted() {
    this.dropCandy();
  },
  methods: {
    dropCandy() {
      const timer = setInterval(() => {
        const candyRef = this.$refs.candy;
        const candyCurrDist = parseInt(candyRef.style.top, 10);
        const candyNewDist = candyCurrDist + this.speed;

        if (candyNewDist > this.totalDistance) {
          clearInterval(timer);
        } else {
          candyRef.style.top = `${candyNewDist}px`;
        }
      }, this.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
.candy {
  position: relative;
  width: $candy-size;
  height: $candy-size;
  border-radius: 50%;
  background-color: purple;
  top: 0;
}
</style>