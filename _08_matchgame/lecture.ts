const horizontal    : number = 4;
const vertical      : number = 3;
const colors        : string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'];

let colorCandidate  : string[] = colors.slice();
let color           : string[] = [];
let clickFlag       : boolean = true;
let clickCard       : HTMLDivElement[] = [];
let completedCard   : HTMLDivElement[] = [];
let startTime       : Date | null = null;

function shuffle(): void {
    // 피셔 예이츠 셔플 알고리즘
    for (let i:number=0; colorCandidate.length>0; i++) {
        color = color.concat(colorCandidate.splice((Math.floor(Math.random() * colorCandidate.length)), 1));
    }
}

function setCard(horizontal: number, vertical: number) {
    // 카드를 누를 수 있는지 여부.
    clickFlag = false;

    for (let i:number=0; i<(horizontal*vertical); i++) {

        const card: HTMLDivElement = document.createElement('div');
        card.className = 'card';
        const cardInner: HTMLDivElement = document.createElement('div');
        cardInner.className = 'card-inner';
        const cardFront: HTMLDivElement = document.createElement('div');
        cardFront.className = 'card-front';
        const cardBack: HTMLDivElement = document.createElement('div');
        cardBack.className = 'card-back';

        cardBack.style.backgroundColor = color[i];

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // Arrow function 은 this 를 못 가짐.
        card.addEventListener('click', function(this: HTMLDivElement) {
            // 클릭해서, 카드 뒤집기.
            if (clickFlag && !completedCard.includes(this)) {
                // Element.classList.toggle() : https://developer.mozilla.org/ko/docs/Web/API/Element/classList
                this.classList.toggle('flipped');
                clickCard.push(this);
                // 클릭카드 두개를 뒤집었으면, 두 카드 비교.
                if (clickCard.length === 2) {
                    const firstBackground: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement).style.backgroundColor;
                    const secondBackground: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement).style.backgroundColor;
                    // 짝을 맞춘 경우.
                    if (firstBackground === secondBackground) {
                        completedCard.push(clickCard[0]);
                        completedCard.push(clickCard[1]);
                        clickCard = [];
                        // 짝을 전부 맞춘 경우.
                        if (completedCard.length === horizontal*vertical) {
                            const endTime: Date = new Date();
                            const duration: number = Number(endTime.getTime()) - Number(startTime!.getTime());
                            alert(`성공 : ${duration/1000}초`);
                            (document.querySelector('#wrapper') as HTMLDivElement).innerHTML = '';
                            colorCandidate = colors.slice();
                            color = [];
                            completedCard = [];
                            startTime = null;
                            shuffle();
                            setCard(horizontal, vertical);
                        }
                    // 짝을 못 맞춘 경우.
                    } else {
                        clickFlag = false;
                        setTimeout(() => {
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickFlag = true;
                            clickCard = [];
                        }, 1000);
                    }
                }
            }
        });
        (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
    }

    // 게임 시작하기 전에 전부 펼쳐서 힌트 보여주기.
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + 100*index);
    });

    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('flipped');
        }, 4000);
        clickFlag = true;
        startTime = new Date();
    });
}

shuffle();
setCard(horizontal, vertical);



// 옵셔널 체이닝 : 값이 존재하는지 확신을 가지지 못하는 경우 - 없다면 undefined가 들어감. (식의 오른쪽에만 사용 가능)
const OptionalChaining = document.querySelector('#wrapper')?.innerHTML;
// 함수 표현 : 객체.method?.()