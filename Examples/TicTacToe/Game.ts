import { Observation } from "../../Domain/Observation/Observation";
import { Detail } from "../../Domain/Detail/Detail";
import { Tag } from "../../Domain/Tag/Tag";
import { Action } from "../../Domain/Action/Action";

export class Game {
    private board: Array<Array<any>>;

    constructor() {
        this.board = [
            [{player: null}, {player: null}, {player: null}],
            [{player: null}, {player: null}, {player: null}],
            [{player: null}, {player: null}, {player: null}]
        ];
    }

    public getBoardObservation(player: string): Observation {
        const actions: Array<Action> = [];
        const details: Array<Detail> = [new Detail(player, [new Tag('player')])];
        for(let x = 0; x < this.board.length; x++) {
            for(let y = 0; y < this.board[x].length; y++) {
                details.push(new Detail(this.board[x][y].player, [new Tag(`(${x},${y})`)]));
                if(!this.board[x][y].player) {
                    actions.push(new Action([new Tag(`(${x},${y})`)]));
                }
            }
        }
        return new Observation(details, actions);
    }

    public move(player: string, action: Action): void {
        const coordString = action.getTags()[0].getName();
        this.board[Number.parseFloat(coordString[1])][Number.parseFloat(coordString[3])].player = player;
    }

    public checkForWin(player: string): boolean {
        return this.checkRowsForWin(player)
            || this.checkColumnsForWin(player)
            || this.checkDiagsForWin(player);
    }

    private checkRowsForWin(player: string): boolean {
        let matches;
        for(let x = 0; x < 3; x++) {
            matches = true;
            for(let y = 0; matches && y < 3; y++) {
                matches = this.board[x][y].player === player;
            }
            if(matches) {
                break;
            }
        }
        return matches;
    }

    private checkColumnsForWin(player: string): boolean {
        let matches;
        for(let y = 0; y < 3; y++) {
            matches = true;
            for(let x = 0; matches && x < 3; x++) {
                matches = this.board[x][y].player === player;
            }
            if(matches) {
                break;
            }
        }
        return matches;
    }

    private checkDiagsForWin(player: string): boolean {
        return this.checkLeftDiagForWin(player)
            || this.checkRightDiagForWin(player);
    }

    private checkLeftDiagForWin(player: string): boolean {
        let matches = true;
        for(let i = 0; matches && i < 3; i++) {
            matches = this.board[i][2-i].player === player;
        }
        console.log('check left diag for win', matches);
        return matches;
    }

    private checkRightDiagForWin(player: string): boolean {
        let matches = true;
        for(let i = 0; matches && i < 3; i++) {
            console.log(i, this.board[i][i].player, player);
            matches = this.board[i][i].player === player;
        }
        console.log('check right diag for win', matches);
        return matches;
    }

    public getBoard(): any {
        return this.board;
    }

}
