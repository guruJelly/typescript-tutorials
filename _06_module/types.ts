export interface ICard {
    att     : number;
    hp      : number;
    mine    : boolean;
    field   : boolean;
    cost?   : number;
    hero?   : boolean;
}

export interface IPlayer {
    hero            : HTMLDivElement;
    deck            : HTMLDivElement;
    field           : HTMLDivElement;
    cost            : HTMLDivElement;
    deckData        : Sub[];
    heroData?       : Hero | null;
    fieldData       : Sub[];
    chosenCard      : HTMLDivElement | null; // 선택한 카드 DIV
    chosenCardData? : ICard | null; // 선택한 카드 data
}

class Hero implements ICard {
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

class Sub implements ICard {
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


// type 도 export 가능.
export type A = string | number;
