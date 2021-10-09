<template>
  <div class="character-wrapper">
    <CharacterElement
      :tick="{ delta, prevTimestamp }"
      :moving="moving"
      :direction="direction"
      :charWidth="charWidth"
      :maxTranslation="maxTranslation"
      @updateCharPos="updateCharPos"
    />
  </div>
</template>

<script>
import CharacterElement from './CharacterElement';

const CHARACTER_WIDTH = 100;

export default {
  components: {
    CharacterElement,
  },
  created() {
    window.addEventListener('keydown', this.keyPressHandler);
    window.addEventListener('keyup', this.keyUpHandler);
  },
  data() {
    return {
      moving: false,
      direction: '',
      charWidth: CHARACTER_WIDTH,
    };
  },
  props: {
    delta: {
      type: Number,
      default: 0,
    },
    prevTimestamp: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    maxTranslation() {
      return ((this.width / 2) - (this.charWidth / 2));
    },
  },
  methods: {
    keyPressHandler(event) {
      if (event.keyCode === 37) {
        this.moving = true;
        this.direction = 'left';
      } else if (event.keyCode === 39) {
        this.moving = true;
        this.direction = 'right';
      }
    },
    keyUpHandler() {
      this.moving = false;
    },
    updateCharPos(payload) {
      this.$emit('updateCharPos', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.character-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
