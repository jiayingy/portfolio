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

<style>

</style>
