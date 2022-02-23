"use strict";
const ex = (a, b) => a + b;
const ex2 = {
    add: (a, b) => {
        return a + b;
    }
};
const a = {
    add: (a, b) => a + b,
};
const b = {
    add: (a, b) => a + b,
};
a.add(1, 2);
b.add('a', 'b');
// predicate : Boolean 반환.
// [].foreach(() => {
// });
// function forEach<T>(arr: T[], callback: (item: T) => void): void {
function forEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}
// [] 배열 안에 들어가는 것에 따라, find()의 제너릭 type이 달라짐.
[].find((item) => {
});
class Hero {
    constructor(mine) {
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
}
class Sub {
    constructor(mine) {
        this.field = false;
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
}
// 타입 가드 (각각의 경우에 대해) : 넓은 타입을 좁은 타입으로 좁혀줄 수 있다.
function isHero(data) {
    if (data.hero) {
        return true;
    }
    return false;
}
function isSub(data) {
    if (data.cost) {
        return true;
    }
    return false;
}
const opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    fieldData: [],
    heroData: null,
    chosenCard: null,
    chosenCardData: null,
};
const me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    fieldData: [],
    heroData: null,
    chosenCard: null,
    chosenCardData: null,
};
const turnButton = document.getElementById('turn-btn');
let isMyTurn = true;
function initiate() {
    [opponent, me].forEach((item) => {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    // 코딩스타일 - 인자를 객체형식으로 받기 : 인자가 어떤녀석인지 알 수 있음. (swift와 비슷)
    createDeck({ mine: true, count: 5 });
    createDeck({ mine: false, count: 5 });
    createHero({ mine: true });
    createHero({ mine: false });
    redrawScreen({ mine: true });
    redrawScreen({ mine: false });
}
initiate();
// 구조분해한 매개변수의 타입은 뒤에 붙임.
function createDeck({ mine, count }) {
    const player = mine ? me : opponent;
    for (let i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
function createHero({ mine }) {
    const player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
}
// 상대방 혹은 내 화면 그려주는 메소드.
function redrawScreen({ mine }) {
    const player = mine ? me : opponent;
    redrawHero(player);
}
function redrawHero(target) {
    // ! 처리 대신
    // if (!target.heroData) {
    //     throw new Error('heroData가 없습니다.');
    // }
    // 초기화
    target.hero.innerHTML = '';
    connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });
}
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach((data) => {
        connectCardDOM({ data, DOM: target.deck });
    });
}
function redrawField(target) {
    target.field.innerHTML = '';
    target.fieldData.forEach((data) => {
        connectCardDOM({ data, DOM: target.field });
    });
}
// 데이터를 화면에 그리는 메소드.
// 기본값 매개변수.(자바스크립트)
function connectCardDOM({ data, DOM, hero = false }) {
    // Node.cloneNode() : https://developer.mozilla.org/ko/docs/Web/API/Node/cloneNode
    const cardEl = document.querySelector('.card-hidden .card').cloneNode(true);
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display = 'none';
        const name = document.createElement('div');
        name.textContent = '영웅';
        cardEl.appendChild(name);
    }
    else {
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    cardEl.addEventListener('click', () => {
        // Card 타입인 data를 Sub 타입으로 좁혀줌. (as 를 안 쓰는 방법)
        // 하수인이면 덱에 위치시켜야 하기 때문에, Sub인지 Hero인지 구분.
        if (isSub(data) && data.mine === isMyTurn && !data.field) {
            // 덱에 하수인 하나를 놓으면, 덱에 새로운 하수인 추가.
            if (!deckToField({ data })) {
                createDeck({ mine: true, count: 1 });
            }
        }
    });
    DOM.appendChild(cardEl);
}
function deckToField({ data }) {
    const target = isMyTurn ? me : opponent;
    const currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        alert("마나부족");
        return true;
    }
    // 덱에서 필드로 이동.
    data.field = true;
    const idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    // 다시 그리기.
    redrawDeck(target);
    redrawField(target);
    // 남은 코스트 줄이기
    target.cost.textContent = String(currentCost - data.cost);
    return false;
}
