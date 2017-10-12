const cells = document.querySelectorAll(".cell");
var newGame;

function startGame() {
	document.getElementById("text")
		.innerText = "";
	addEventListener();
	newGame = new Game("X"); //eslint-disable-line
}

function addEventListener() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].addEventListener("click", play, false);
	}
}

function play(e) {
	if (!newGame.gameOver) {
		newGame.humanTurn(e);
		showBoard();
		if (newGame.gameOver) {
			showWinner();
		}
	} else {
		showBoard();
		showWinner();
	}

}


function showWinner() {
	document.getElementById("text")
		.innerHTML = newGame.winner;
	clearBoard();
}

function showBoard() {
	for (let i = 0; i < newGame.board.length; i++) {
		let cell = document.getElementById(i);
		//console.log(newGame.board);
		if (!(typeof newGame.board[i] == "number")) {
			cell.innerText = newGame.board[i];
		} else {
			cell.innerText = "";
		}
	}
}

function clearBoard() {
	for (var i = 0; i < 9; i++) {
		document.getElementById(i)
			.removeEventListener("click", play, false);
	}
}

startGame();
