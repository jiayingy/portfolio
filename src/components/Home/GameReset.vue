<template>
  <button class="button" @click="reset">
    reset
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
  font-size: 20px;

}
</style>
