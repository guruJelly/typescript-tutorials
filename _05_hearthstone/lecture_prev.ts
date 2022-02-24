/*
interface ICard {
    att: number;
    hp: number;
    cost: number;
}
*/

/*
============ 자바 스크립트 코드 ========================
class Card {
    att: number;
    hp: number;
    cost: number;
}

class Card {
    constructor(hero, mine) {

        if (hero) {
            this.att = Math.ceil(Math.random() * 2);
            this.hp = Math.ceil(Math.random() * 5) + 25;
            this.hero = true;
            this.field = true;
        } else {
            this.att = Math.ceil(Math.random() * 5);
            this.hp = Math.ceil(Math.random() * 5);
            this.cost = Math.floor((this.att + this.hp) / 2);
        }

        if (mine) {
            this.mine = true;
        }

    }
}

new Card(true, true);
new Card(true, true);
new Card(true, true);
new Card(true, true);
=========================================================
*/
// interface ICard {
//     // 접근제어자 못 씀. (강제하려면 씀.)
//     att?: number;
//     hp?: number;
//     cost?: number;
// }

class Card {
    // public       : 인스턴스에서도 접근 가능.
    // protected    : 자식 클래스에서 접근 가능.
    // private      : 클래스 안에서만 접근 가능.
    public att?: number;
    public hp?: number;
    private cost?: number;
    private mine?: boolean;
    // hero : 해당 카드가 영웅인지 아닌지 구분.
    // mine : 해당 카드가 내 카드인지 적 카드인지 구분.
    constructor(hero: boolean, mine: boolean) {

        if (hero) {
            return new Hero(mine);
        } else {
            this.att = Math.ceil(Math.random() * 5);
            this.hp = Math.ceil(Math.random() * 5);
            this.cost = Math.floor((this.att + this.hp) / 2);
        }

        if (mine) {
            this.mine = true;
        }

    };
}

// const card = new Card(true, true);
// card.att
// card.hp
// card.cost // 코스트에는 접근을 못하게 하고 싶을 때.
new Card(true, false);

class Hero extends Card {
    
    private hero: boolean;
    private field: boolean;

    constructor(mine: boolean) {
        super(true, mine);
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
}

interface IPlayer {
    hero: HTMLDivElement;
    deck: HTMLDivElement;
    field: HTMLDivElement;
    cost: HTMLDivElement;
    deckData: Card[];
    heroData?: Card | null;
    fieldData: Card[];
    chosenCard: HTMLDivElement | null;
    chosenCardData?: Card | null;
    // ? 값이 있어도 되고, 없어도 되고.
    // undefined 와 null 구분.
    // "strictNullChecks": true,
    // 체크를 하면,
    // ? 는 undefined 를 의미하는 것이기 때문에, null 은 제외.
    // 빈 값을 의도적으로 넣었음을 알리기 위해 null 을 사용.
}

// 나와 상대에 대한 정보를 객체로 먼저 만들기.
const opponent: IPlayer = {
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

const me: IPlayer = {
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