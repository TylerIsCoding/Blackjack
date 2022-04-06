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
        house.pot += Number(wager);
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
    constructor(cash) {
        this.pot = cash;
    }
}

// DOM Elements

let playerScore = document.getElementById('score--area--player');
let dealerScore = document.getElementById('score--area--dealer');
let nameInputBox = document.getElementById('input--name--box');
let betInputBox = document.getElementById('input--bet--box');
let nameLabel = document.getElementById('label--name--input');
let betLabel = document.getElementById('label--bet--input');
let modalArea = document.getElementById('modal--area');
let bankrollArea = document.getElementById('bankroll');
let potArea = document.getElementById('pot');
let winMessage = document.getElementById('win--message');
let dealButtonArea = document.getElementById('deal--holder');

// Buttons
let submitButton = document.getElementById('btn--modal--submit');
let betButton = document.getElementById('btn--bet--submit');
let playArea = document.getElementById('play--area');
let hitButton = document.getElementById('btn--hit');
let stayButton = document.getElementById('btn--stay');
let dealButton = document.getElementById('btn--deal');
let replayButton = document.getElementById('btn--replay');

// Game functions

__init__ = function () {
    newGame = new Game();
    player1 = new Player(playerName, 500);
    dealer = new Player();
    house = new House(0);
    deckInPlay = new Deck();
    dealer.setDealer();
    players.push(player1, dealer);
    dealButton.classList.add('hidden');
    dealButtonArea.classList.add('hidden');
    dealButtonArea.style.zIndex = '-1';
    playGame();
};

playGame = function () {
    winMessage.classList.add('hidden');
    player1.hand = [];
    dealer.hand = [];
    replayButton.classList.add('hidden');
    hitButton.classList.remove('hidden');
    stayButton.classList.remove('hidden');
    freshDeckCheck(deckInPlay);
    deckInPlay.shuffle();
    player1.bet(currentPot, house);
    updateBankroll();
    deckInPlay.dealCards(players);
    newGame.renderCards(player1);
    newGame.renderCards(dealer);
    player1.calcPoints();
    dealer.calcPoints();
    playerScore.textContent = `${player1.name}'s score: ${player1.points}`;
    dealerScore.textContent = `${dealer.name}'s score: ${dealer.hand[0].value}`;
    potArea.innerHTML = `Pot: ${house.pot}`;
};

freshDeckCheck = function (deckArg) {
    if (deckArg.cards.length <= 10) {
        let newDeck = new Deck();
        Object.assign(deckArg, newDeck);
    }
    return deckArg;
};

storePlayerName = function () {
    if (nameInputBox.value !== '') {
        playerName = nameInputBox.value;
    } else {
        playerName = 'Player';
    }
    placeBet();
    return playerName;
};

placeBet = function () {
    nameInputBox.classList.add('hidden');
    nameLabel.classList.add('hidden');
    submitButton.classList.add('hidden');
    betInputBox.classList.remove('hidden');
    betLabel.classList.remove('hidden');
    betButton.classList.remove('hidden');
};

submitBet = function () {
    currentPot = betInputBox.value;
    if (currentPot < 0) {
        betLabel.innerHTML = 'Bet cannot be negative.';
    } else if (currentPot == 0) {
        betLabel.textContent = 'Bet cannot be $0.00';
    } else if (currentPot > 500) {
        betLabel.textContent = 'You do not have enough cash!';
    } else {
        closeModal();
        playGame();
        return Number(currentPot);
    }
};

hitFunc = function () {
    freshDeckCheck(deckInPlay);
    let newCard = deckInPlay.cards.pop();
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
    freshDeckCheck(deckInPlay);
    dealerHitFunc();
};

dealerHitFunc = function () {
    while (dealer.points <= player1.points) {
        let newCard = deckInPlay.cards.pop();
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
        winMessage.classList.remove('hidden');
        winMessage.textContent = 'You win!';
        hitButton.classList.add('hidden');
        stayButton.classList.add('hidden');
        player1.bankroll += house.pot * 2;
        house.pot = 0;
        updateBankroll();
    } else {
        winMessage.classList.remove('hidden');
        winMessage.textContent = 'You lose!';
        hitButton.classList.add('hidden');
        stayButton.classList.add('hidden');
        house.pot = 0;
    }
    replayButton.classList.remove('hidden');
};

closeModal = function () {
    playArea.style.display = 'flex';
    modalArea.style.display = 'none';
    storePlayerName();
};

openModal = function () {
    playArea.style.display = 'none';
    modalArea.style.display = 'flex';
    resetGame();
    placeBet();
};

resetGame = function () {
    let images = document.getElementsByTagName('img');
    let l = images.length;
    for (let i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
    }
};

updateBankroll = function () {
    bankrollArea.innerHTML = `Bankroll: ${player1.bankroll}`;
};

// Event Listeners

hitButton.addEventListener('click', hitFunc);
stayButton.addEventListener('click', stayFunc);
submitButton.addEventListener('click', storePlayerName);
betButton.addEventListener('click', submitBet);
dealButton.addEventListener('click', __init__);
replayButton.addEventListener('click', openModal);

// Game Start

let newGame;
let playerName;
let player1;
let dealer;
let house;
let deck;
let players = [];
nameLabel.classList.remove('hidden');

// Console logs

// Event loops <-- Read about these

// Store the information from nameInput after clicking the submit button ! DONE !
// Add a text area for the Pot
// Add a sleep function to have a minor pause before revealing the dealer's cards for a little more suspense.
