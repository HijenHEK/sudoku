<template>
  <div id="app">
    <nav>
      <h2>Sudoku mini-project</h2>
		<img src="./assets/logo.png" alt="" srcset="">
    </nav>
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


<style scoped >
  * {
		box-sizing: border-box;
	}

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }


  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px ;
    margin-right: 40px ;  

  }
  img {
    height: 30px;
  }
</style>