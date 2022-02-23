interface Example {
    (a: number, b: number): number;
}
declare const ex: Example;
interface Example2 {
    add: (a: number, b: number) => number;
}
declare const ex2: Example2;
interface obj<T> {
    add: (a: T, b: T) => T;
}
declare const a: obj<number>;
declare const b: obj<string>;
declare function forEach<T>(arr: Array<T>, callback: (item: T) => void): void;
interface Card {
    att: number;
    hp: number;
    mine: boolean;
    field: boolean;
    cost?: number;
    hero?: boolean;
}
declare class Hero implements Card {
    att: number;
    hp: number;
    hero: boolean;
    field: true;
    mine: boolean;
    constructor(mine: boolean);
}
declare class Sub implements Card {
    att: number;
    hp: number;
    field: boolean;
    mine: boolean;
    cost: number;
    constructor(mine: boolean);
}
declare function isHero(data: Card): data is Hero;
declare function isSub(data: Card): data is Sub;
interface Player {
    hero: HTMLDivElement;
    deck: HTMLDivElement;
    field: HTMLDivElement;
    cost: HTMLDivElement;
    deckData: Sub[];
    heroData?: Hero | null;
    fieldData: Sub[];
    chosenCard: HTMLDivElement | null;
    chosenCardData?: Card | null;
}
declare const opponent: Player;
declare const me: Player;
declare const turnButton: HTMLButtonElement;
declare let isMyTurn: boolean;
declare function initiate(): void;
declare function createDeck({ mine, count }: {
    mine: boolean;
    count: number;
}): void;
declare function createHero({ mine }: {
    mine: boolean;
}): void;
declare function redrawScreen({ mine }: {
    mine: boolean;
}): void;
declare function redrawHero(target: Player): void;
declare function redrawDeck(target: Player): void;
declare function redrawField(target: Player): void;
declare function connectCardDOM({ data, DOM, hero }: {
    data: Card;
    DOM: HTMLDivElement;
    hero?: boolean;
}): void;
declare function deckToField({ data }: {
    data: Sub;
}): boolean;
