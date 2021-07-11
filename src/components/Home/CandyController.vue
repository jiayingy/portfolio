<template>
  <div ref="candyController">
  </div>
</template>

<script>
import Vue from 'vue';
import stylesVariables from '@/assets/styles/exports.scss';
import CandyElement from './CandyElement.vue';

const MAX_ROW = 12;
const CANDY_SIZE = parseInt(stylesVariables.candySize, 10);

export default {
  props: {
    rows: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      maxSpeed: CANDY_SIZE * 0.8,
      minSpeed: CANDY_SIZE * 0.1,
      maxOffset: CANDY_SIZE * 5,
      maxRow: MAX_ROW
    }
  },
  mounted() {
    const candyComponent = Vue.extend(CandyElement);

    // setInterval(() => {
      const candyComponentInstance = new candyComponent({
        propsData: { 
          speed: this.getSpeed(), 
          offset: this.getOffset(), 
          row: this.getRow() 
        }
      });
      candyComponentInstance.$mount();
      this.$refs.candyController.appendChild(candyComponentInstance.$el);
    // }, 5000);
  },
  methods: {
    getSpeed() {
      return Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
    },
    getOffset() {
      return Math.random() * this.maxOffset;
    },
    getRow() {
      return Math.random() * this.maxRow;
    }
  }
}
</script>

<style>

</style>