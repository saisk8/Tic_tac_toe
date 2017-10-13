class Game { //eslint-disable-line (no-unused-vars)
	constructor(player) {
		this.winner = null;
		this.humanPlayer = player;
		this.gameOver = false;
		this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		if (this.humanPlayer === "X") {
			this.aiPlayer = "O";
		} else {
			this.aiPlayer = "X";
		}
		this.winPattern = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[6, 4, 2]
		];

		this.humanTurn = function(cell) {
			if (typeof cell.target.id == "string" && (typeof this.board[cell.target.id] === "number")) {
				this.updateBoard(cell.target.id, this.humanPlayer);
				this.aiTurn();
			}
		};

		this.aiTurn = function() {
			if (!this.checkTie()) {
				var move = this.aiMove();
				this.updateBoard(move, this.aiPlayer);
				return move;
			} else {
				this.declareWinner("Tie");
			}
		};

		this.updateBoard = function(square, player) {
			this.board[square] = player;
			this.winner = this.checkWin(this.board, player);
			if (this.winner) {
				this.declareWinner(this.winner);
			}
		};

		this.checkTie = function() {
			return (this.getAvailableMoves(this.board)
				.length === 0);
		};

		this.checkWin = function(board, player) {
			let plays = board.reduce((a, e, i) =>
				(e === player) ? a.concat(i) : a, []);
			let gameWon = null;
			for (let [index, win] of this.winPattern.entries()) {
				if (win.every(elem => plays.indexOf(elem) > -1)) {
					gameWon = {
						index: this.winPattern[index],
						player: player
					};
					break;
				}
			}
			return gameWon;
		};

		this.aiMove = function() {
			var best = -1000;
			var move;
			var availSpots = this.getAvailableMoves(this.board);
			for (var i = 0; i < availSpots.length; i++) {
				this.board[availSpots[i]] = this.aiPlayer;
				var value = this.minimax(this.board, 0, false);
				this.board[availSpots[i]] = availSpots[i];
				if (value > best) {
					move = availSpots[i];
					best = value;
				}
			}
			this.updateBoard(move, this.aiPlayer);
			return move;
		};

		this.getAvailableMoves = function(newBoard) {
			return newBoard.filter(s => typeof s == "number");
		};

		this.minimax = function(newBoard, depth, isAiTurn) {
			if (this.checkWin(newBoard, this.humanPlayer)) {
				return -10 + depth;
			} else if (this.checkWin(newBoard, this.aiPlayer)) {
				return 10 - depth;
			} else if (this.getAvailableMoves(newBoard)
				.length === 0) {
				return 0;
			}

			if (isAiTurn) {
				let best = -1000;
				let availSpots = this.getAvailableMoves(newBoard);
				for (let i = 0; i < availSpots.length; i++) {
					newBoard[availSpots[i]] = this.aiPlayer;
					best = Math.max(this.minimax(newBoard, depth + 1, !isAiTurn), best);
					this.board[availSpots[i]] = availSpots[i];
				}
				return best;
			} else {
				let best = 1000;
				let availSpots = this.getAvailableMoves(newBoard);
				for (let i = 0; i < availSpots.length; i++) {
					newBoard[availSpots[i]] = this.humanPlayer;
					best = Math.min(this.minimax(newBoard, depth + 1, !isAiTurn), best);
					this.board[availSpots[i]] = availSpots[i];
				}
				return best;
			}
		};

		this.declareWinner = function(s) {
			this.winner = s;
			this.gameOver = true;
		};
	}
}
