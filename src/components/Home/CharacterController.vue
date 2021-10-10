<template>
  <div class="character-wrapper">
    <CharacterElement
      :moving="moving"
      :direction="direction"
      :charWidth="charWidth"
      :maxTranslation="maxTranslation"
      @updateCharPos="updateCharPos"
      ref="character"
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
      isLeftDown: false,
      isRightDown: false,
      charWidth: CHARACTER_WIDTH,
    };
  },
  props: {
    width: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    maxTranslation() {
      return ((this.width / 2) - (this.charWidth / 2));
    },
    direction() {
      let d = 0;
      if (this.isLeftDown) d -= 1;
      if (this.isRightDown) d += 1;

      return d > 0 ? 'right' : 'left';
    },
    moving() {
      return this.isLeftDown || this.isRightDown;
    },
  },
  methods: {
    keyPressHandler(event) {
      if (event.keyCode === 37) {
        this.isLeftDown = true;
        this.isRightDown = false;
      } else if (event.keyCode === 39) {
        this.isRightDown = true;
        this.isLeftDown = false;
      }
    },
    keyUpHandler(event) {
      if (event.keyCode === 37) {
        this.isLeftDown = false;
      } else if (event.keyCode === 39) {
        this.isRightDown = false;
      }
    },
    updateCharPos(payload) {
      this.$emit('updateCharPos', payload);
    },
    render(delta) {
      this.$refs.character.render(delta);
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
