<template>
  <div class="portfolio-home-bg" :style="{ color: toHideTexts ? '#cccccc' : null }">
    <GameIntro
      v-if="introTimer >= 0"
      :introTimer="introTimer"
    />
    <template v-else>
      <GameTimer
        :gameTimer="gameTimer"
        ref="gameTimer"
        @updateGameTimer="updateGameTimer"
        v-if="gameTimer > 0"
      />
      <GameReset @reset="reset"
        v-else
      />
      <PointSystem
        :totalPoints="totalPoints"
        :gameTimer="gameTimer"
        ref="pointSystem"
      />
    </template>
  </div>
</template>

<script>
import GameTimer from './GameTimer';
import GameReset from './GameReset';
import PointSystem from './PointSystem';
import GameIntro from './GameIntro';

export default {
  components: {
    GameTimer,
    GameReset,
    PointSystem,
    GameIntro,
  },
  props: {
    totalPoints: {
      type: Number,
      default: 0,
    },
    gameTimer: {
      type: Number,
      default: 0,
    },
    introTimer: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    toHideTexts() {
      return this.introTimer < 0 && this.gameTimer > 0;
    },
  },
  methods: {
    updateGameTimer(timer) {
      this.$emit('updateGameTimer', timer);
    },
    reset() {
      this.$refs.pointSystem.updateHighscore();
      this.$emit('reset');
    },
  },
};
</script>

<style lang="scss" scoped>
.portfolio-home-bg {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: $color-black;
  user-select: none;
  text-transform: uppercase;
  transition: color 1s;
}
</style>
