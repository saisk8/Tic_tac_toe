const cells = document.querySelectorAll(".cell");
var newGame;

function startGame() {
	clearBoard();
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
	var place = document.getElementById("text");
	if (newGame.winner === "Tie") {
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "#292e30";
		}
		place.innerText = "Tie game";
	} else if (newGame.winner.player === "X") {
		for (let c = 0; c < newGame.winner.index.length; c++) {
			cells[newGame.winner.index[c]].style.backgroundColor = "#2f7731";
		}
		place.innerText = "You win";
	} else {
		for (let c = 0; c < newGame.winner.index.length; c++) {
			cells[newGame.winner.index[c]].style.backgroundColor = "#bf3d09";
		}
		place.innerText = "You lose";
	}
}

function showBoard() {
	for (let i = 0; i < newGame.board.length; i++) {
		let cell = document.getElementById(i);
		//console.log(newGame.board);
		if (!(typeof newGame.board[i] == "number")) {
			if (newGame.board[i] === "X") {
				cell.innerHTML = "<i class='fa fa-times' aria-hidden='true' style='color:#bf3d09;'></i>";
			} else {
				cell.innerHTML = "<i class='fa fa-circle-o' aria-hidden='true' style='color:#2f7731;'></i>";
			}
		} else {
			cell.innerText = "";
		}
	}
}

function clearBoard() {
	for (var i = 0; i < 9; i++) {
		document.getElementById(i)
			.removeEventListener("click", play, false);
		document.getElementById(i)
			.style.backgroundColor = "";
	}
}

startGame();
