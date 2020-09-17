import App from './App.vue'
import { createStore } from 'vuex';
import { createApp } from 'vue';

var sudoku = require('sudoku');




/* puzzle => object contains an array of 81 digits 
   null if there is no value 
*/
    
let puzzle     = sudoku.makepuzzle();
let solution   = sudoku.solvepuzzle(puzzle);
let difficulty = sudoku.ratepuzzle(puzzle, 4);



/* generateGrid generates the Grid of sudoku as a row of colums in wich each element is an object 
    of col number row number as coordinate , a value and and filled boolean .
    stuct : col[row[{col : j , row : i , value : n , filled : false} , {} , {} , {}] , col[] , [] , [] ];
*/

function generateGrid(puzzle) {
  let element = {}
  let grid = [];
  let c = 0 ;
  for(let i = 0 ; i < 8 ;i++){
    let row = [] ;
    for(let j = 0 ; j < 8 ; j++) {
      element.col = j ;
      element.row = i ;
      element.value = puzzle[c];
      element.filled = (puzzle[c] != null ) ;
      row.push(element);
      element = {} ;
      c = c + 1 ;
      if(c > 81) {
        console.log('out bounds in generateGrid(puzzle) ');
        break ;
      
      }
    }
    grid.push(row);
    row = [] ;
  }
  return grid;
}


let sudokuGrid = generateGrid(puzzle) ;
let sudokuGridSol = generateGrid(solution) ;

console.log(sudokuGrid);



const store = createStore({   
    state : {
        grid : sudokuGrid ,
        sol : sudokuGridSol ,
        diff : difficulty ,
    }
})




const app = createApp(App)

app.use(store)

app.mount('#app')
