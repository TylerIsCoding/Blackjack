// Get elements

const dealButton = document.getElementById('btn--deal');

// Global variables

// Contructors

// Game class

class Game {
    constructor() {
        this.deal = function () {};
    }
}

// Player class
class Player {
    constructor(name, cash, hand) {
        this.name;
        this.cash;
        this.hand;
    }
}

// Card class
class Card {
    constructor(suit, value, imgURL) {
        this.suit;
        this.value;
        this.imgURL;
    }
}

// Deck class
class Deck {
    constructor(cards) {}
}

Card.suits = ['spades', 'diamonds', 'clubs', 'hearts'];
Card.values = [
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

// TEST //

dealButton.addEventListener('click', startGame);
