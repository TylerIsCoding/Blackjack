// Classes

class Game {
    constructor() {
        this.playing = false;
    }
    renderCardSingle(player, card, faceUp) {
        let img_card = document.createElement('img');
        if (faceUp) {
            img_card.src = card.imgURL;
        } else {
            img_card.src = '/imgs/card_back.png';
            img_card.id = 'card--down';
        }
        img_card.className = 'img--card';
        if (player.name === 'Dealer') {
            document.getElementById('dealer--area').appendChild(img_card);
        } else {
            document.getElementById('player--area').appendChild(img_card);
        }
    }
    renderCards(player) {
        for (let i = 0; i < player.hand.length; i++) {
            if (player.name === 'Dealer' && i === player.hand.length - 1) {
                this.renderCardSingle(player, player.hand[i], false);
            } else {
                this.renderCardSingle(player, player.hand[i], true);
            }
        }
    }
    isOver() {
        this.playing = false;
    }
}

class Player {
    constructor(name, bankroll, active) {
        this.name = name;
        this.bankroll = bankroll;
        this.active = active;
        this.points = 0;
        this.hand = [];
    }
    setDealer() {
        this.name = 'Dealer';
        this.bankroll = Infinity;
        this.active = false;
    }
    bet(wager, house) {
        this.bankroll -= wager;
        house.pot += wager;
    }
    calcPoints() {
        for (let i = 0; i < this.hand.length; i++) {
            this.points += this.hand[i].value;
        }
    }
    cardFlip() {
        let cardTwo = this.hand[1];
        const cardDown = document.getElementById('card--down');
        cardDown.src = cardTwo.imgURL;
    }
}

class Card {
    constructor(suit, face, value) {
        this.suit = suit;
        this.face = face;
        this.value = value;
        this.imgURL = `/imgs/${face}_of_${suit}.png`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        let suit = ['hearts', 'clubs', 'spades', 'diamonds'];
        let face = [
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
            'ace',
        ];
        for (let i = 0; i < suit.length; i++) {
            for (let x = 0; x < face.length; x++) {
                let value = parseInt(face[x]);
                if (
                    face[x] === 'jack' ||
                    face[x] === 'queen' ||
                    face[x] === 'king'
                ) {
                    value = 10;
                }
                if (face[x] === 'ace') {
                    value = 11;
                }
                let card = new Card(suit[i], face[x], value);
                this.cards.push(card);
            }
        }
    }
    shuffle() {
        for (let i = 0; i < 1000; i++) {
            let location1 = Math.floor(Math.random() * this.cards.length);
            let location2 = Math.floor(Math.random() * this.cards.length);
            let temp = this.cards[location1];

            this.cards[location1] = this.cards[location2];
            this.cards[location2] = temp;
        }
    }
    dealCards(playerArray) {
        for (let x = 0; x < playerArray.length; x++) {
            for (let i = 0; i < 2; i++) {
                playerArray[x].hand.push(this.cards.pop());
            }
        }
    }
}

class House {
    constructor(cash, cards) {
        this.pot = cash;
        this.deck = cards;
    }
}

// DOM Elements

let playerScore = document.getElementById('score--area--player');
let dealerScore = document.getElementById('score--area--dealer');
let nameInputBox = document.getElementById('input--name--box');
let closeButton = document.getElementById('btn--modal--close');
let submitButton = document.getElementById('btn--modal--submit');
let playArea = document.getElementById('play--area');
let modalArea = document.getElementById('modal--area');
let hitButton = document.getElementById('btn--hit');
let stayButton = document.getElementById('btn--stay');

// Game functions

hitFunc = function () {
    let newCard = deck.cards.pop();
    player1.hand.push(newCard);
    newGame.renderCardSingle(player1, newCard, true);
    player1.points += newCard.value;
    if (player1.points > 21) {
        playerWin(false);
        playerScore.textContent = `${player1.name}'s score: ${player1.points}`;
    } else {
        playerScore.textContent = `${player1.name}'s score: ${player1.points}`;
    }
};

stayFunc = function () {
    dealer.cardFlip();
    console.log(dealer.points);
    dealerHitFunc();
};

dealerHitFunc = function () {
    while (dealer.points <= player1.points) {
        let newCard = deck.cards.pop();
        dealer.hand.push(newCard);
        newGame.renderCardSingle(dealer, newCard, true);
        dealer.points += newCard.value;
        console.log(dealer.points);
        dealerScore.innerHTML = dealer.points;
        if (dealer.points >= 21) {
            break;
        }
    }
    dealerScore.textContent = `${dealer.name}'s score: ${dealer.points}`;
    if (dealer.points <= 21) {
        playerWin(false);
    } else {
        playerWin(true);
    }
};

playerWin = function (playerWins) {
    if (playerWins) {
        alert('you win!');
    } else {
        alert('you lose!');
    }
};

closeModal = function () {
    playArea.style.display = 'flex';
    modalArea.style.display = 'none';
};

// Event Listeners

hitButton.addEventListener('click', hitFunc);
stayButton.addEventListener('click', stayFunc);
closeButton.addEventListener('click', closeModal);
submitButton.addEventListener('click', closeModal);

// Game Start

let newGame = new Game();
const player1 = new Player('Player', 100, true);
const dealer = new Player();
const house = new House(0);
let players = [];
players.push(player1, dealer);

while (!newGame.isOver) {}
let deck = new Deck();
deck.shuffle();
dealer.setDealer();
player1.bet(50, house);
deck.dealCards(players);
newGame.renderCards(player1);
newGame.renderCards(dealer);
player1.calcPoints();
dealer.calcPoints();
playerScore.textContent = `${player1.name}'s score: ${player1.points}`;
dealerScore.textContent = `${dealer.name}'s score: ${dealer.hand[0].value}`;

console.log(house);
console.log(dealer);
console.log(player1);

// Console logs

// Event loops <-- Read about these

// Store the information from nameInput after clicking the submit button
// Add a text area for the Pot
// Add a sleep function to have a minor pause before revealing the dealer's cards for a little more suspense.
