<template>
  <div id="app">
    <sudoku />
  </div>
</template>

<script>
import sudoku from './components/sudoku.vue'
export default {
  name: 'app',
  components: {
    sudoku
  }
}
</script>


<style scope>
  * {
		box-sizing: border-box;
	}

  #app {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>