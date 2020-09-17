<template>
  <sudokuNav />

  <sudokuGrid />
</template>

<script>
import sudokuGrid from './components/sudokuGrid.vue'
import sudokuNav from './components/sudokuNav.vue'

export default {
  name: 'App',
  components: {
    sudokuGrid,
    sudokuNav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
