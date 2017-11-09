"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
let winCount = { 'X': 0, 'O': 0, 'draw': 0 };
for (let i = 0; i < 10000; i++) {
    let game = new Game_1.Game();
    let winner = null;
    let player = Math.floor(Math.random() * 2) ? 'X' : 'O';
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
    }
    winCount[winner]++;
}
console.log(winCount);
