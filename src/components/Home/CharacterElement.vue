<template>
  <div
    class="character"
    :style="{
      transform: `translateX(${translation}px)`,
      width: `${charWidth}px`
    }"
  >
    <img src="@/assets/images/character/walk.png" alt="character">
  </div>
</template>

<script>
const SPEED = 3;

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
    tick() {
      if (this.moving) {
        this.getTranslation();
      }
    },
    maxTranslation(val) {
      if (this.translation > val) {
        this.translation = val;
      }
    },
  },
  methods: {
    getTranslation() {
      if (this.direction === 'left') {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    },
    moveLeft() {
      const newTranslation = this.translation - SPEED;
      const canMove = Math.abs(newTranslation) <= this.maxTranslation;
      if (canMove) {
        this.translation -= SPEED;
      }
    },
    moveRight() {
      const newTranslation = this.translation + SPEED;
      const canMove = Math.abs(newTranslation) <= this.maxTranslation;
      if (canMove) {
        this.translation += SPEED;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.character {
  text-align: center;
  margin: auto;

  img {
    width: 100%;
  }
}
</style>
