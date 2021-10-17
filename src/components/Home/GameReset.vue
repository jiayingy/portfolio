<template>
  <button class="button" @click="reset">
    <span class="material-icons md-18">
      replay
    </span>
    <span>
      Restart
    </span>
  </button>
</template>

<script>
export default {
  methods: {
    reset() {
      this.$emit('reset');
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background-color: transparent;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: inherit;
  transition: 0.5s color;

  &:hover {
    color: #9d7dcf;
  }
}
</style>
