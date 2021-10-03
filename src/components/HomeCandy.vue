<template>
  <div ref="candy" class="candy" style="top: 0px;"></div>
</template>

<script>
import stylesVariables from '@/assets/styles/exports.scss';

export default {
  data() { 
    return {
      displacement: 0,
      distance: document.documentElement.clientHeight - parseInt(stylesVariables.candySize, 10),
    }
  },
  mounted() {
    this.getDisplacement();
    this.dropCandy();
  },
  methods: {
    getDisplacement() {
      this.displacement = (Math.random() * 8 + 1);
    },
    dropCandy() {
      const candy = this.$refs.candy;
      // let timer = setInterval(() => {
        const candyTop = parseInt(candy.style.top, 10);
        const candyNewTop = candyTop + this.displacement;
        if (candyNewTop > this.distance) {
          // clearInterval(timer);
        }
        candy.style.top = `${candyNewTop}px`;
      // }, 20);
    },
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