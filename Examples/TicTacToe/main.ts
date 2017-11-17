import { Game } from "./Game";
import { Thought } from "../../Worker/Thought";
import { Goal } from "../../Domain/index";

const gameCount: number = 10000;


let network = new Thought(),
    network2 = new Thought();

network.addGoals([
    new Goal({player: 'X', gameOver: 'X'}, 1, "Win as X"),
    new Goal({player: 'O', gameOver: 'O'}, 1, "Win as O"),
    new Goal({gameOver: 'Draw'}, 0.6, "Draw"),
    new Goal({player: 'X', gameOver: 'O'}, 0, "Lose as X"),
    new Goal({player: 'O', gameOver: 'X'}, 0, "Lose as O")
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

let oldDraw = 0,
    oldP1 = 0,
    oldP2 = 0;

let roles: Array<string> = ['X', 'O'];
let drawCount: number = 0;
for(let i = 0; i < gameCount; i++) {
    playGame();
     if(i%20 === 0) {
         //displayResults(i);
         displayLines();
     }
}
displayResults();
let json = network.printJSON();
//console.log(json);
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

function displayLines() {
    let p1 = observers[0].winCount - oldP1,
        p2 = observers[1].winCount - oldP2,
        draw = drawCount - oldDraw,
        max = Math.max(p1, p2, draw),
        arr = Array(max);
    arr[p1] = 'X';
    arr[p2] = 'O';
    arr[draw] = '-';
    console.log(arr.join(' '));
    oldP1 = observers[0].winCount;
    oldP2 = observers[1].winCount;
    oldDraw = drawCount;
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
                delete boardObservation.actions;
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
