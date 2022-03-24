// Get elements

const dealButton = document.getElementById('btn--deal');

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
            Name: 'Player_' + i,
            ID: i,
            Points: 0,
            Hand: hand,
        };

        players.push(player);
    }
}

function playerUI() {
    document.getElementById('play--area').innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        const div_player = document.createElement('div');
        const div_playerid = document.createElement('div');
        const div_hand = document.createElement('div');
        const div_points = document.createElement('div');

        div_points.className = 'points';
        div_player.className = 'player';
        div_player.id = 'player_' + i;
        div_hand.id = 'hand_' + i;
        div_points.id = 'points_' + i;
        div_playerid.innerHTML = players[i].Name;
        div_player.appendChild(div_hand);
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_points);
        document.getElementById('play--area').appendChild(div_player);
    }
}

function getCardUI(card) {
    let div_card = document.createElement('div');
    let img_card = document.createElement('img');
    div_card.className = 'card';
    img_card.className = 'cardImg';
    img_card.src = `/imgs/${card.Value}_of_${card.Suit}.png`;
    div_card.innerHTML = card.Suit + ' ' + card.Value;
    div_card.appendChild(img_card);
    return div_card;
}

function renderCard(card, player) {
    let hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

function dealHands() {
    for (let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            let card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
}

function startGame() {
    getDeck();
    shuffle(deck);
    createPlayer(2);
    playerUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

// TEST //

dealButton.addEventListener('click', startGame);
