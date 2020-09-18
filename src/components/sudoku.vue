<template>
	<div class="sudoku">
		<div>
			
			<!-- <strong>{{ formattedTime }}</strong> -->
			<button class="navbtn" @click="generatePuzzle()">Abother one</button>

			<button  class="navbtn" @click="help(activeRow,activeCol)" :disabled="activeRow === -1 || activeCol === -1">help?</button> 
        
		</div>

		<table>
			<tr  v-for="(row, rowIndex) in puzzle" :key="rowIndex">
				<td class="cell" :class="{
            'border-right': colIndex === 2 || colIndex === 5,
            'border-bottom': rowIndex === 2 || rowIndex === 5,
            'original': cell.original,
            'active': activeRow === rowIndex && activeCol === colIndex,
            'invalid': cell.value && isCellInvalid(rowIndex, colIndex, cell.value)
          }" v-for="(cell, colIndex) in row" :key="colIndex" @click="setCellActive(rowIndex, colIndex, cell.original)">
							{{cell.value}}
				</td>
			</tr>
		</table>

		<div class="row">
		<button
				type="button"
				class="btn"
				v-for="value in Array(9).keys()" :key="value"
				:disabled="activeRow === -1 || activeCol === -1"
				@click="setCellValue(value + 1)">
			{{ value + 1 }}
		</button>
		<button
				type="button"
				class="btn"
				:disabled="(activeRow === -1 || activeCol === -1)"
				@click="resetCell(activeRow,activeCol)">
			-
		</button>



    </div>

	</div>
</template>

<script>
	let sudoku = require('sudoku');

	function generateGrid(raw) {

		const grid = [];
		let c = 0;
		for (let i = 0; i < 9; i++) {
			const row = [];
			for (let j = 0; j < 9; j++) {
				const cell = {
					value: raw[c] == null ? null : raw[c] + 1,
					original: raw[c] !== null ? true : false
				}
				row.push(cell);
				c++;
			}
			grid.push(row);
		}
		return grid;
	}
	export default {
		name: 'Sudoku',
		data() {
			return {
				puzzle: [],
				difficulty: 'easy',
				activeRow: -1,
				activeCol: -1,
				solution : [],
				
			}
		},
		mounted() {
			this.generatePuzzle()
		},
		
		methods: {
			generatePuzzle() {
				const rawGrid = sudoku.makepuzzle();
				
				const rawSolution = sudoku.solvepuzzle(rawGrid);

				this.puzzle = generateGrid(rawGrid);
				this.solution = generateGrid(rawSolution);
				this.default = this.puzzle 
				this.activeRow = -1
				this.activeCol = -1
				return

			},
			
			help(r,c){
				this.puzzle[r][c] = this.solution[r][c]
				this.activeRow = -1
				this.activeCol = -1
				return
			},
			resetCell(r,c) {
				this.puzzle[r][c].value = '' 
				this.activeRow = -1
				this.activeCol = -1
				return
			},
			setCellActive(row, col, original) {
				if (original) {
					return
				}

				if (this.activeRow === row && this.activeCol === col) {
					this.activeRow = -1
					this.activeCol = -1
					return
				}

				this.activeRow = row
				this.activeCol = col
			},
			setCellValue(value) {
				this.puzzle[this.activeRow][this.activeCol].value = value
				this.activeRow = -1
				this.activeCol = -1

				if (this.isGameComplete()) {
					const msg = [
						'Success!',
						'',
						`Difficulty: ${ this.levels[ this.difficulty ] }`,
						`Time: ${ this.formattedTime }`
					]

					alert(msg.join('\n'))
					this.generatePuzzle()
				}
			},
			isCellInvalid(row, col, value) {
				if (!value) {
					return true
				}

				for (let c = 0; c < 9; c += 1) {
					if (this.puzzle[row][c].value === value && c !== col) {
						return true
					}
				}

				for (let r = 0; r < 9; r += 1) {
					if (this.puzzle[r][col].value === value && r !== row) {
						return true
					}
				}

				const rowStart = Math.floor(row / 3) * 3
				const colStart = Math.floor(col / 3) * 3
				for (let r = rowStart; r < rowStart + 3; r += 1) {
					for (let c = colStart; c < colStart + 3; c += 1) {
						if (this.puzzle[r][c].value === value && !(r === row && c === col)) {
							return true
						}
					}
				}

				return false
			},
			isGameComplete() {
				for (let r = 0; r < 9; r += 1) {
					for (let c = 0; c < 9; c += 1) {
						if (this.isCellInvalid(r, c, this.puzzle[r][c].value)) {
							return false
						}
					}
				}

				return true
			}
		}
	}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.sudoku {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}

	.cell {
		width: 35px;
		height: 35px;
		box-sizing: border-box;
		
		font-size: 24px;
		text-align: center;

		cursor: default;
		border-radius: 2px;
		box-shadow: 0 0 1px #00c;
	}

	
	.cell.original {
		font-weight: bold;
		background-color: beige ;
	}

	.cell:not(.original) {
		cursor: pointer;
	}

	.cell.active {
		background-color: #7ba3c9 !important;
		color: #fff;
	}

	.cell.invalid {
		background-color: #c00;
		color: #fff;
	}

	.btn {
		width: 30px;
		height: 30px;
		font-size: 24px;
		color: #fff;
		background-color: #343a40;
		cursor: pointer;
		margin: 5px 2px;
		border-radius: 8px;
	}
	
	.btn:disabled {
		cursor: not-allowed;
		opacity: 0.3;
		
	}
	.btn:hover {
		background-color: #343a60;
		border-color: #343a60;
	}


	/* with css reset */
	* {
		box-sizing: border-box;
	}

	table {
		margin: 10px;
		width: 100%;
		max-width: 400px;
		margin: 0.5rem auto;
		box-shadow: 0 0 3px rgb(73, 73, 192);

		font-family: Arial, Helvetica, sans-serif;
	}

	tr:first-child td {
		border-top-color: black;
	}

	tr:nth-child(3n) td {
		border-bottom-color: black;
	}

	td {
		border: 1px solid lightgrey;
		height: 40px;
		width: 40px;
	}

	td:first-child {
		border-left-color: black;
	}

	td:nth-child(3n) {
		border-right-color: black;
	}

	input {
		padding: 0;
		text-align: center;
		border: 0;
		height: 40px;
		width: 40px;
		text-align: center;
	}

	input:hover {
		background: #eee;
	}
	.navbtn {

		cursor: pointer;
		padding: 5px  10px;
		background-color: #343a60;
		color: white;
		border-radius: 10px ;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 14px;
		margin: 0 10px;
	}
	.navbtn:disabled {
		cursor: not-allowed;

		opacity: 0.3;
	}
</style>