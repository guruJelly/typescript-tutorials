
// 인터페이스를 함수 선언할 때도 쓸 수 있음.
// but, 객체와 함수는 따로 선언식이 있으므로 사용 안 하는 것을 추천.
interface Example {
    (a: number, b: number): number
}
const ex: Example = (a, b) => a + b;

interface Example2 {
    add: (a: number, b: number) => number
}
const ex2: Example2 = {
    add: (a, b) => {
        return a + b;
    }
}


// 제네릭 : (짝 맞추기)
// extends : 클래스에서는 상속 / 제네릭에서는 타입제한.
// interface obj<T extends string> {
//     add: (a: string | number, b: string | number) => string | number;
// }
interface obj<T> {
    add: (a: T, b: T) => T;
}
const a: obj<number> = {
    add: (a, b) => a + b,
}
const b: obj<string> = {
    add: (a, b) => a + b,
}
a.add(1, 2);
b.add('a', 'b');

// predicate : Boolean 반환.
// [].foreach(() => {
// });
// function forEach<T>(arr: T[], callback: (item: T) => void): void {
function forEach<T>(arr: Array<T>, callback: (item: T) => void): void {
    for (let i: number = 0; i<arr.length; i++) {
        callback(arr[i]);
    }
}
// [] 배열 안에 들어가는 것에 따라, find()의 제너릭 type이 달라짐.
[].find((item) => {

});

// ==========================================================================

interface Card {
    att     : number;
    hp      : number;
    mine    : boolean;
    field   : boolean;
    cost?   : number;
    hero?   : boolean;
}

class Hero implements Card {
    public att      : number;
    public hp       : number;
    public hero     : boolean;
    public field    : true;
    public mine     : boolean;
    constructor(mine: boolean) {
        this.mine   = mine;
        this.att    = Math.ceil(Math.random() * 2);
        this.hp     = Math.ceil(Math.random() * 5) + 25;
        this.hero   = true;
        this.field  = true;
    }
}

class Sub implements Card {
    public att      : number;
    public hp       : number;
    public field    : boolean = false;
    public mine     : boolean;
    public cost     : number;
    constructor(mine: boolean) {
        this.mine   = mine;
        this.att    = Math.ceil(Math.random() * 5);
        this.hp     = Math.ceil(Math.random() * 5);
        this.cost   = Math.floor((this.att + this.hp) / 2);
    }
}

// 타입 가드 (각각의 경우에 대해) : 넓은 타입을 좁은 타입으로 좁혀줄 수 있다.
function isHero(data: Card): data is Hero {
    if (data.hero) {
        return true;
    }
    return false;
}
function isSub(data: Card): data is Sub {
    if (data.cost) {
        return true;
    }
    return false;
}

interface Player {
    hero            : HTMLDivElement;
    deck            : HTMLDivElement;
    field           : HTMLDivElement;
    cost            : HTMLDivElement;
    deckData        : Sub[];
    heroData?       : Hero | null;
    fieldData       : Sub[];
    chosenCard      : HTMLDivElement | null; // 선택한 카드 DIV
    chosenCardData? : Card | null; // 선택한 카드 data
}

const opponent: Player = {
    hero: document.getElementById('rival-hero') as HTMLDivElement,
    deck: document.getElementById('rival-deck') as HTMLDivElement,
    field: document.getElementById('rival-cards') as HTMLDivElement,
    cost: document.getElementById('rival-cost') as HTMLDivElement,
    deckData: [],
    fieldData: [],
    heroData: null,
    chosenCard: null,
    chosenCardData: null,
}

const me: Player = {
    hero: document.getElementById('my-hero') as HTMLDivElement,
    deck: document.getElementById('my-deck') as HTMLDivElement,
    field: document.getElementById('my-cards') as HTMLDivElement,
    cost: document.getElementById('my-cost') as HTMLDivElement,
    deckData: [],
    fieldData: [],
    heroData: null,
    chosenCard: null,
    chosenCardData: null,
}

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
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
function createDeck({ mine, count }: { mine: boolean, count: number }) {
    const player = mine ? me : opponent;
    for (let i:number = 0; i<count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}

function createHero({ mine }: { mine: boolean }) {
    const player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({data: player.heroData, DOM: player.hero, hero: true});
}

// 상대방 혹은 내 화면 그려주는 메소드.
function redrawScreen({ mine }: { mine: boolean }) {
    const player = mine ? me : opponent;
    redrawHero(player);
}

function redrawHero(target: Player) {

    // ! 처리 대신
    // if (!target.heroData) {
    //     throw new Error('heroData가 없습니다.');
    // }

    // 초기화
    target.hero.innerHTML = '';
    connectCardDOM({ data: target.heroData!, DOM: target.hero, hero: true });
}

function redrawDeck(target: Player) {
    target.deck.innerHTML = '';
    target.deckData.forEach((data) => {
        connectCardDOM({ data, DOM: target.deck });
    });
}

function redrawField(target: Player) {
    target.field.innerHTML = '';
    target.fieldData.forEach((data) => {
        connectCardDOM({ data, DOM: target.field });
    });
}

// 데이터를 화면에 그리는 메소드.
// 기본값 매개변수.(자바스크립트)
function connectCardDOM({data, DOM, hero = false}: {data: Card, DOM: HTMLDivElement, hero?: boolean}) {
    // Node.cloneNode() : https://developer.mozilla.org/ko/docs/Web/API/Node/cloneNode
    const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
    cardEl.querySelector('.card-att')!.textContent = String(data.att);
    cardEl.querySelector('.card-hp')!.textContent = String(data.hp);
    if (hero) {
        (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display = 'none';
        const name = document.createElement('div');
        name.textContent = '영웅';
        cardEl.appendChild(name);
    } else {
        cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
    }
    cardEl.addEventListener<'click'>('click', () => {

        // Card 타입인 data를 Sub 타입으로 좁혀줌. (as 를 안 쓰는 방법)
        // 하수인이면 덱에 위치시켜야 하기 때문에, Sub인지 Hero인지 구분.
        if (isSub(data) && data.mine===isMyTurn && !data.field) {
            // 덱에 하수인 하나를 놓으면, 덱에 새로운 하수인 추가.
            if(!deckToField({ data })) {
                createDeck({ mine: true, count: 1 });
            }
        }
    });
    DOM.appendChild(cardEl);
}

function deckToField({ data }: { data: Sub }): boolean {
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