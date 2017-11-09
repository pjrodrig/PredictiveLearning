"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
let game = new Game_1.Game();
let winner = null;
let player = 'X';
while (!winner) {
    player = player === 'X' ? 'O' : 'X';
    let actions = game.getBoardObservation(player).getActions();
    if (actions.length) {
        game.move(player, actions[Math.floor(Math.random() * actions.length)]);
        if (game.checkForWin(player)) {
            winner = player;
        }
    }
    else {
        winner = 'draw';
    }
    let board = game.getBoard();
    console.log('');
    console.log((board[0][0].player || '-') + ' | ' + (board[0][1].player || '-') + ' | ' + (board[0][2].player || '-'));
    console.log((board[1][0].player || '-') + ' | ' + (board[1][1].player || '-') + ' | ' + (board[1][2].player || '-'));
    console.log((board[2][0].player || '-') + ' | ' + (board[2][1].player || '-') + ' | ' + (board[1][2].player || '-'));
}
console.log('-----------------------------------------');
console.log('WINNER: ' + winner);
console.log('-----------------------------------------');
let board = game.getBoard();
console.log((board[0][0].player || '-') + ' | ' + (board[0][1].player || '-') + ' | ' + (board[0][2].player || '-'));
console.log((board[1][0].player || '-') + ' | ' + (board[1][1].player || '-') + ' | ' + (board[1][2].player || '-'));
console.log((board[2][0].player || '-') + ' | ' + (board[2][1].player || '-') + ' | ' + (board[1][2].player || '-'));
