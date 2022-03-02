<template>
  <div id="app">
    <div class="navbar-wrapper">
      <Navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar';

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>
