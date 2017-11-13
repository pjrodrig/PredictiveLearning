export class Game {
    private board: Array<Array<any>>;

    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    public getBoardObservation(player: string): any {
        const actions: Array<any> = [];
        const inputs: any = {};
        const self = this;
        for(let x = 0; x < this.board.length; x++) {
            for(let y = 0; y < this.board[x].length; y++) {
                inputs[`(${x},${y})`] = this.board[x][y];
                if(!this.board[x][y]) {
                    let action = {
                        name: `(${x},${y})`,
                        callback: () => {
                            self.move.apply(self, [player, action.name]);
                        }
                    };
                    actions.push(action);
                }
            }
        }
        return {inputs: inputs, actions: actions};
    }

    public move(player: string, action: string): void {
        this.board[Number.parseFloat(action[1])][Number.parseFloat(action[3])] = player;
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
                matches = this.board[x][y] === player;
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
                matches = this.board[x][y] === player;
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
            matches = this.board[i][2-i] === player;
        }
        return matches;
    }

    private checkRightDiagForWin(player: string): boolean {
        let matches = true;
        for(let i = 0; matches && i < 3; i++) {
            matches = this.board[i][i] === player;
        }
        return matches;
    }

    public getBoard(): any {
        return this.board;
    }

}
