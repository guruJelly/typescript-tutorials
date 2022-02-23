// 처음에 코드 쓸 때는 javascript로 먼저 쓰고
// 타입스크립트로 치환하는게 좋다.

// 현재 이미지의 좌표.
// 타입을 string이라는 넓은 범위에서
// '0' | '-142px' | '-284px' 로 좁혀줌.
let imgCoords: RSP[keyof RSP] = '0';

// 클래스 같은 틀.
interface RSP {
    readonly ROCK:       '0';
}

// 여러개 만들어서 따로 분해해도 합쳐진다. (다른 사람 라이브러리 쉽게 수정 가능.)
interface RSP {
    readonly SCISSORS:   '-142px';
    readonly PAPER:      '-284px';
}

// 상속 가능.
interface Example extends RSP {

}

// 뭐가 들어올지 모를 때. (여유 두기)
interface Example2 {
    a: 3
    [key: string]: number;
}
const example2: Example2 = {
    a: 3,
    b: 5
}

// type은 반복 사용 불가.(type이 좀 더 넓은 범위) (인터페이스-객체)
// type RSP = {
//     readonly ROCK:       '0';
//     readonly SCISSORS:   '-142px';
//     readonly PAPER:      '-284px';
// } | string
// const hi:RSP = 'hello';

// as const : readonly 설정.
const rsp: RSP = {
    ROCK:       '0',
    SCISSORS:   '-142px',
    PAPER:      '-284px'
};

const score = {
    ROCK:       '0',
    SCISSORS:   '1',
    PAPER:      '-1'
} as const

// Object.keys() : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// function computerChoice(imgCoords): 'ROCK' | 'SCISSORS' | 'PAPER' {
// RSP의 key.
// function computerChoice(imgCoords: '0' | '-142px' | '-284px'): keyof RSP {
function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
    // Object.keys()는 항상 string[]을 반환하기 때문에, 강제로 형변환.
    // ['ROCK', 'SCISSORS', 'PAPER'] : Tuple
    // 'ROCK' | 'SCISSORS' | 'PAPER' : Union
    // ! : 값이 undefined 일수도 있는 걸, 프로그래머 재량으로 확신함. (혹은 if()문 안에 넣음)
    // find() : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}

let interval: number;

document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function(this: HTMLButtonElement, e: Event) {
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        // 텍스트를 가져오는 2가지 방법.
        // const myChoice = e.target.
        // TypeScript의 한계 : textContent의 반환값이 string | null 이라서.
        // 작성자는 결과를 아니깐, as를 써서 타입을 변환해줌.
        // myScore의 타입이 any에서 '-1' | '0' | '1' 로 바뀜.
        const myChoice = this.textContent as keyof RSP;
        const myScore = score[myChoice];
        const computerScore = score[computerChoice(imgCoords)];
        const diff = Number(myScore) - Number(computerScore);

        if (diff === 0) {
            console.log('무');
        } else if ([-1, 2].includes(diff)) {
            console.log('승');
        } else {
            console.log('패');
        }

    });
});

function intervalMaker() {
    interval = setInterval(function() {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        } else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        } else {
            imgCoords = rsp.ROCK;
        }
        if (document.querySelector('#computer')) {
            (document.querySelector('#computer') as HTMLDivElement).style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
        }
    }, 100);
}
intervalMaker();

// TypeScript 는 HTML을 인식하지 못하므로
// document.querySelector('')의 결과가 E | null 을 반환.

// npx tsc -w 로 실행.
// tsc 파일이름.ts -w 로 실행하면 tsconfig가 무시됨.