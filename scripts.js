// Steps

// 1. Making a bet
// - Create a text entry box that allows you to bet some of your bankroll.
// - Create text entry box "input--bet"
// - Label box "Bet" and create a button that submits the bet
// - Subtract input in "input--bet" from Player bankroll
// - After subtracting the amount in the text input field from your bankroll -- calculate how much you would win based on that amount and add it to the "pot"
// - Disable button and then make a "Deal Cards" button appear in the middle of the play field

// 2. Creating a deck of cards
// - Create 52 unique cards from the 4 suits and 11 faces
// - Shuffle the cards in the deck

// 3. Dealing the cards
// - Deal card button 'onclick' deals two cards to each player
// - The cards are displayed in front of the player's names.
// - One of the House's cards are hidden and their score is not shown

// 4. Hitting or Staying
// - Display two buttons; "Hit" and "Stay"
// - Hit button 'onclick' adds another card to the player's hand
// - That card's value is added to the total score value of the hand
// - The hand is checked to see if it is 21 or higher
// - If it is not, the player can hit the "Hit" button again
// - Stay button 'onclick' saves the value of the player's hand and reveals the Dealer's second card
// - The Dealer auto-hits until they reach 21 or they lose

// 5. Losing
// - If the dealer hits 21 or the player goes over, they lose. The 'pot' is erased from memory.
// - A "Play Again?" button appears and reintializes the game. The player's bankroll is carried over.

// 6. Winning
// - If the dealer's hand is over 21, the player wins
// - The 'pot' is added to the Player's bankroll
// - A "Play Again?" button appears and reinitalizes the game. The player's bankroll is carried over.

// Instantiation

// Creates Player.name = Player and Player.name = Dealer
// Gives Player a bankroll unless it's bankroll is different than the starting amount (100)
// Create a text-input field with the id "input--bet" and display it on "play--area"
// Create a button with the id "btn--bet" and display it next to "input--bet"
// EventListener on "btn--bet" that starts the game

// Start Game


// Classes

class Player {
    constructor(name, bankroll, active) {
        this.name = name;
        this.bankroll = bankroll;
        this.active = active;
    }
    setDealer() {
        this.name = 'Dealer';
        this.bankroll = Infinity;
        this.active = false;
    }
    bet(wager, house) {
        // Removes money from bankroll and adds it to the House Pot
        this.bankroll -= wager;
        house.pot += wager;
    }
}

class Card {
    constructor(suit, face, value) {
        this.suit = suit;
        this.face = face;
        this.value = value;
        this.imgURL = `<img src="/imgs/${face}_of_${suit}.png" alt="${face}_of_${suit}">`;
    }
    backOfCard() {
        this.imgURL = `<img src="/imgs/card_back.png" alt="Back of Card">`;
    }
    frontOfCard() {
        this.imgURL = `<img src="/imgs/${face}_of_${suit}.png" alt="${face}_of_${suit}">`;
    }
}

class Deck {
    constructor() {
        this.suit = ['hearts', 'clubs', 'spades', 'diamonds'];
        this.face = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
        this.deck = [];
    }
    makeDeck () {
        for (let i = 0; i < this.suit.length; i++) {
            for (let x = 0; x < this.face.length; x++) {
                let value = parseInt(this.face[x]);
                if (this.face[x] === 'jack' || this.face[x] === 'queen' || this.face[x] === 'king') {
                    value = 10;
                }
                if (
                    this.face[x] === 'ace'){
                        value = 11;
                    }
                let card = new Card(this.suit[i], this.face[x], value);
                this.deck.push(card);
            }
        }
    }
    shuffle () {
        for (let i = 0; i < 1000; i++) {
            let location1 = Math.floor(Math.random() * this.deck.length);
            let location2 = Math.floor(Math.random() * this.deck.length);
            let temp = this.deck[location1];

            this.deck[location1] = this.deck[location2];
            this.deck[location2] = temp;
        }
    }
}

class House {
    constructor(cash, cards) {
        this.pot = cash;
        this.deck = cards;
    }
}

// Test Code



const player1 = new Player('Tyler', 100, true);
const dealer = new Player();
const house = new House(0);

house.deck = new Deck();
house.deck.makeDeck()
house.deck.shuffle();

dealer.setDealer();
player1.bet(50, house);

console.log(house);
console.log(dealer)
console.log(player1);

