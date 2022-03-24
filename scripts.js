// Global variables

const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
const values = [
    'ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'jack',
    'queen',
    'king',
];
let deck = new Array();
let players = new Array();

// Functions

function getDeck() {
    deck = new Array();
    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
            let weight = parseInt(values[x]);
            if (
                values[x] === 'jack' ||
                values[x] === 'queen' ||
                values[x] === 'king'
            ) {
                weight = 10;
            }
            if (values[x] === 'ace') {
                weight = 11;
            }
            let card = {
                Value: values[x],
                Suit: suits[i],
                Weight: weight,
            };
            deck.push(card);
        }
    }
}

function shuffle(deck) {
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor(Math.random() * deck.length);
        let location2 = Math.floor(Math.random() * deck.length);
        let temp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = temp;
    }
}

function createPlayer(num) {
    players = new Array();
    for (let i = 1; i <= num; i++) {
        let hand = new Array();
        let player = {
            Name: 'Player ' + i,
            ID: i,
            Points: 0,
            Hand: hand,
        };
        players.push(player);
    }
}

function startGame() {
    getDeck();
    shuffle();
}
