// Elements

let playerCard1 = document.getElementById('playerCard_1');
let playerCard2 = document.getElementById('playerCard_2');
let dealerCard1 = document.getElementById('dealCard_1');
let dealerCard2 = document.getElementById('dealCard_2');
let dealBtn = document.querySelector('.btn--deal');

// Variables

const numbers = [
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

const suit = ['clubs', 'spades', 'hearts', 'diamonds'];

// Functions

function init() {
    dealerCard1.classList.add('hidden');
    dealerCard2.classList.add('hidden');
    playerCard1.classList.add('hidden');
    playerCard2.classList.add('hidden');
}

function deal() {
    dealerCard1.src = randomCard();
    dealerCard1.style.width = '12rem';
    dealerCard1.classList.remove('hidden');
    dealerCard2.src = randomCard();
    dealerCard2.style.width = '12rem';
    dealerCard2.classList.remove('hidden');
    playerCard1.src = randomCard();
    playerCard1.style.width = '12rem';
    playerCard1.classList.remove('hidden');
    playerCard2.src = randomCard();
    playerCard2.style.width = '12rem';
    playerCard2.classList.remove('hidden');
    dealBtn.classList.add('hidden');
}

function randomCard() {
    let randomNumber = Math.trunc(Math.random() * 13);
    let randomSuit = Math.trunc(Math.random() * 4);
    let cardNum = numbers[randomNumber];
    let cardSuit = suit[randomSuit];
    let card = String(`./imgs/${cardNum}_of_${cardSuit}.png`);
    console.log(card);
    return card;
}

init();

dealBtn.addEventListener('click', deal);
