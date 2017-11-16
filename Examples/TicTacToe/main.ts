import { Game } from "./Game";
import { Thought } from "../../Worker/Thought";
import { Goal } from "../../Domain/index";

const gameCount: number = 1000;


let network = new Thought();

network.addGoals([
    new Goal({player: 'X', gameOver: 'X'}, 1, "Win as X"),
    new Goal({player: 'O', gameOver: 'O'}, 1, "Win as O"),
    new Goal({gameOver: 'Draw'}, -0.1, "Draw"),
    new Goal({player: 'X', gameOver: 'O'}, -1, "Lose as X"),
    new Goal({player: 'O', gameOver: 'X'}, -1, "Lose as O")
]);

let observers: Array<any> = [
    {
        observe: network.observe,
        winCount: 0,
        name: 'Network'
    },
    {
        observe: randomPlayerObserver,
        winCount: 0,
        name: 'Random'
    }
];

let roles: Array<string> = ['X', 'O'];
let drawCount: number = 0;
for(let i = 0; i < gameCount; i++) {
    playGame();
    // if(i%10 === 0) {
    //     displayResults(i);
    // }
}
displayResults();
console.log(network.printTree());

function displayResults(count?: number) {
    console.log('-------------------------');
    console.log(observers[0].name + ' wins: ' + observers[0].winCount);
    console.log(observers[1].name + ' wins: ' + observers[1].winCount);
    console.log('Draws: ' + drawCount);
    if(count) {
        console.log('Current Count:' + count);
    } else {
        console.log('Total Games: ' + gameCount);
    }
    console.log('-------------------------');
}

function playGame() {
    const game = new Game();
    let gameOver = false,
        player = getFirstPlayer();
    while(!gameOver) {
        let boardObservation = game.getBoardObservation(player.role);
        if(boardObservation.actions.length) {
            boardObservation.inputs.player = player.role;
            player.observer.observe(boardObservation.inputs, boardObservation.actions);
            boardObservation.inputs.player = player.next.role;
            player.next.observer.observe(boardObservation.inputs);
            if(game.checkForWin(player.role)) {
                gameOver = true;
                player.observer.winCount++;
                boardObservation.inputs.gameOver = player.role;
                boardObservation.inputs.player = player.role;
                player.observer.observe(boardObservation.inputs, boardObservation.actions);
                boardObservation.inputs.player = player.next.role;
                player.next.observer.observe(boardObservation.inputs);
            } else {
                player = player.next;
            }
        } else {
            boardObservation.inputs.gameOver = 'Draw';
            boardObservation.inputs.player = player.role;
            player.observer.observe(boardObservation.inputs);
            boardObservation.inputs.player = player.next.role;
            player.next.observer.observe(boardObservation.inputs);
            drawCount++;
            gameOver = true;
        }
    }
}

function getFirstPlayer() {
    let randomPlayer = Math.floor(Math.random() * 2),
        randomRole = Math.floor(Math.random() * 2),
        player1: any = {
            observer: observers[randomPlayer],
            role: roles[randomRole],
        },
        player2: any = {
            observer: observers[1 - randomPlayer],
            role: roles[1 - randomRole]
        };
    player1.next = player2;
    player2.next = player1;
    return player1;
}

function randomPlayerObserver(inputs: any, actions?: Array<any>) {
    if(actions) {
        actions[Math.floor(Math.random() * actions.length)].callback();
    }
}
