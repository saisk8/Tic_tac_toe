const cells = document.querySelectorAll(".cell");
var game;

function startGame(choice) {
	document.getElementById("select")
		.classList.add("hide");
	document.getElementById("board")
		.classList.remove("hide");
	clearBoard();
	document.getElementById("text")
		.innerText = "";
	addEventListener();
	game = new Game(choice); //eslint-disable-line
}

function addEventListener() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].addEventListener("click", play, false);
	}
}

function play(e) {
	if (!game.gameOver) {
		game.humanTurn(e);
		showBoard();
		if (game.gameOver) {
			showWinner();
		}
	} else {
		showBoard();
		showWinner();
	}
}


function showWinner() {
	var place = document.getElementById("text");
	if (game.winner === "Tie") {
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "#292e30";
		}
		place.innerText = "Tie game";
	} else if (game.winner.player === "X") {
		for (let c = 0; c < game.winner.index.length; c++) {
			cells[game.winner.index[c]].style.backgroundColor = "#2f7731";
		}
		place.innerText = "You win";
	} else {
		for (let c = 0; c < game.winner.index.length; c++) {
			cells[game.winner.index[c]].style.backgroundColor = "#bf3d09";
		}
		place.innerText = "You lose";
	}
}

function showBoard() {
	for (let i = 0; i < game.board.length; i++) {
		let cell = document.getElementById(i);
		//console.log(game.board);
		if (!(typeof game.board[i] == "number")) {
			if (game.board[i] === "X") {
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

function getChoice() {
	document.getElementById("board")
		.classList.add("hide");
	document.getElementById("select")
		.classList.remove("hide");
	document.getElementById("X")
		.addEventListener("click", setChoice, false);
	document.getElementById("O")
		.addEventListener("click", setChoice, false);

}

function setChoice(e) {
	document.getElementById("X")
		.removeEventListener("click", setChoice, false);
	document.getElementById("O")
		.removeEventListener("click", setChoice, false);
	startGame(e.target.id);
}

getChoice();
