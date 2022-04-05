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
    constructor(name, bankroll) {
        this.name = name;
        this.bankroll = bankroll;
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
        this.points = 0;
        for (let i = 0; i < this.hand.length; i++) {
            this.points += this.hand[i].value;
            if (this.hand[i].face === 'ace' && this.points < 12) {
                this.points += 10;
            }
        }
        return this.points;
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
                    value = 1;
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
let modalArea = document.getElementById('modal--area');
let bankrollArea = document.getElementById('bankroll');
let potArea = document.getElementById('pot');

// Buttons
let closeButton = document.getElementById('btn--modal--close');
let submitButton = document.getElementById('btn--modal--submit');
let playArea = document.getElementById('play--area');
let hitButton = document.getElementById('btn--hit');
let stayButton = document.getElementById('btn--stay');
let dealButton = document.getElementById('btn--deal');
let replayButton = document.getElementById('btn--replay');

// Game functions

__init__ = function () {
    newGame = new Game();
    player1 = new Player(playerName, 100);
    dealer = new Player();
    house = new House(0);
    deck = new Deck();
    dealer.setDealer();
    players.push(player1, dealer);
    dealButton.classList.add('hidden');
    playGame();
};

playGame = function () {
    player1.hand = [];
    dealer.hand = [];
    replayButton.classList.add('hidden');
    hitButton.classList.remove('hidden');
    stayButton.classList.remove('hidden');
    buttonEnable();
    deck.shuffle();
    player1.bet(50, house);
    updateBankroll();
    deck.dealCards(players);
    newGame.renderCards(player1);
    newGame.renderCards(dealer);
    player1.calcPoints();
    dealer.calcPoints();
    playerScore.textContent = `${player1.name}'s score: ${player1.points}`;
    dealerScore.textContent = `${dealer.name}'s score: ${dealer.hand[0].value}`;
    potArea.innerHTML = `Pot: ${house.pot}`;
};

storePlayerName = function () {
    closeModal();
    if (nameInputBox.value !== '') {
        playerName = nameInputBox.value;
    } else {
        playerName = 'Player';
    }
    return playerName;
};

hitFunc = function () {
    let newCard = deck.cards.pop();
    player1.hand.push(newCard);
    newGame.renderCardSingle(player1, newCard, true);
    player1.calcPoints();
    if (player1.points > 21) {
        playerWin(false);
        playerScore.textContent = `${player1.name}'s score: ${player1.points}`;
    } else if (player1.points === 21) {
        playerScore.textContent = `${player1.name}'s score: ${player1.points}`;
        stayFunc();
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
        dealer.calcPoints();
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
        player1.bankroll += house.pot * 2;
        house.pot = 0;
        updateBankroll();
    } else {
        alert('you lose!');
        house.pot = 0;
    }
    buttonDisable();
    replayButton.classList.remove('hidden');
};

closeModal = function () {
    playArea.style.display = 'flex';
    modalArea.style.display = 'none';
};

buttonDisable = function () {
    hitButton.disabled = true;
    hitButton.style.cursor = 'not-allowed';
    stayButton.disabled = true;
    stayButton.style.cursor = 'not-allowed';
};

buttonEnable = function () {
    hitButton.disabled = false;
    hitButton.style.cursor = 'pointer';
    stayButton.disabled = false;
    stayButton.style.cursor = 'pointer';
};

resetGame = function () {
    let images = document.getElementsByTagName('img');
    let l = images.length;
    for (let i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
    }
    playGame();
};

updateBankroll = function () {
    bankrollArea.innerHTML = `Bankroll: ${player1.bankroll}`;
};

// Event Listeners

hitButton.addEventListener('click', hitFunc);
stayButton.addEventListener('click', stayFunc);
closeButton.addEventListener('click', storePlayerName);
submitButton.addEventListener('click', storePlayerName);
dealButton.addEventListener('click', __init__);
replayButton.addEventListener('click', resetGame);

// Game Start

let newGame;
let playerName;
let player1;
let dealer;
let house;
let deck;
let players = [];

// Console logs

// Event loops <-- Read about these

// Store the information from nameInput after clicking the submit button
// Add a text area for the Pot
// Add a sleep function to have a minor pause before revealing the dealer's cards for a little more suspense.
