<template>
  <div
    class="character"
    ref="character"
    :style="{
      transform: `translateX(${translation}px)`,
      width: `${charWidth}px`,
      backgroundImage: `url(${require('@/assets/images/character/walking.svg')})`,
      animationPlayState: moving ? 'running' : 'paused'
    }"
  >
  </div>
</template>

<script>
const SPEED = 0.5;

export default {
  props: {
    tick: {
      type: Object,
      default: () => ({ delta: 0, prevTimestamp: 0 }),
    },
    moving: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: '',
    },
    charWidth: {
      type: Number,
      default: 0,
    },
    maxTranslation: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      translation: 0,
      stop: false,
    };
  },
  watch: {
    tick({ delta }) {
      if (this.moving) {
        this.getTranslation(delta);
      }
    },
    maxTranslation(val) {
      if (this.translation > val) {
        this.translation = val;
      }
    },
    translation() {
      const element = this.$refs.character;
      const {
        top, bottom, left, right,
      } = element.getBoundingClientRect();
      this.$emit('updateCharPos', {
        top, bottom, left, right,
      });
    },
  },
  methods: {
    getTranslation(delta) {
      if (this.direction === 'left') {
        this.moveLeft(delta);
      } else {
        this.moveRight(delta);
      }
    },
    moveLeft(delta) {
      const newTranslation = this.translation - SPEED * delta;
      const canMove = Math.abs(newTranslation) <= this.maxTranslation;
      if (canMove) {
        this.translation = newTranslation;
      }
    },
    moveRight(delta) {
      const newTranslation = this.translation + SPEED * delta;
      const canMove = Math.abs(newTranslation) <= this.maxTranslation;
      if (canMove) {
        this.translation = newTranslation;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes walking {
  from {
    background-position-x: 0px;
  }
  to {
    background-position-x: -400px;
  }
}

.character {
  text-align: center;
  margin: auto;
  overflow: hidden;
  animation: walking 0.8s steps(4) infinite;
  width: 100px;
  height: 140px;
  background-size: cover;
}
</style>
