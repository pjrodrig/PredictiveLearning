"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observation_1 = require("../../Domain/Observation/Observation");
const Detail_1 = require("../../Domain/Detail/Detail");
const Tag_1 = require("../../Domain/Tag/Tag");
const Action_1 = require("../../Domain/Action/Action");
class Game {
    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }
    getBoardObservation(player) {
        const actions = [];
        const details = [new Detail_1.Detail(player, [new Tag_1.Tag('player')])];
        for (let x = 0; x < this.board.length; x++) {
            for (let y = 0; y < this.board[x].length; y++) {
                details.push(new Detail_1.Detail(this.board[x][y], [new Tag_1.Tag(`(${x},${y})`)]));
                if (!this.board[x][y]) {
                    actions.push(new Action_1.Action([new Tag_1.Tag(`(${x},${y})`)]));
                }
            }
        }
        return new Observation_1.Observation(details, actions);
    }
    move(player, action) {
        const coordString = action.getTags()[0].getName();
        this.board[Number.parseFloat(coordString[1])][Number.parseFloat(coordString[3])] = player;
    }
    checkForWin(player) {
        return this.checkRowsForWin(player)
            || this.checkColumnsForWin(player)
            || this.checkDiagsForWin(player);
    }
    checkRowsForWin(player) {
        let matches;
        for (let x = 0; x < 3; x++) {
            matches = true;
            for (let y = 0; matches && y < 3; y++) {
                matches = this.board[x][y] === player;
            }
            if (matches) {
                break;
            }
        }
        return matches;
    }
    checkColumnsForWin(player) {
        let matches;
        for (let y = 0; y < 3; y++) {
            matches = true;
            for (let x = 0; matches && x < 3; x++) {
                matches = this.board[x][y] === player;
            }
            if (matches) {
                break;
            }
        }
        return matches;
    }
    checkDiagsForWin(player) {
        return this.checkLeftDiagForWin(player)
            || this.checkRightDiagForWin(player);
    }
    checkLeftDiagForWin(player) {
        let matches = true;
        for (let i = 0; matches && i < 3; i++) {
            matches = this.board[i][2 - i] === player;
        }
        return matches;
    }
    checkRightDiagForWin(player) {
        let matches = true;
        for (let i = 0; matches && i < 3; i++) {
            matches = this.board[i][i] === player;
        }
        return matches;
    }
    getBoard() {
        return this.board;
    }
}
exports.Game = Game;
