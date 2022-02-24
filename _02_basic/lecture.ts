// node.js 설치
// node -v
// npm -v 확인
// npm i typescript
// tsc 이름.ts
// npx tsc -w


// 약타입 언어의 장점.
// let variable = '3';
// variable = 0;
// variable = true;

// let number; // any가 될 수 있으므로 주의!!
// 대문자, 소문자 구분해야함!! (number, string,,) 원시값 / 객체
let num: number;

// 타입스크립트는 자바스크립트의 자유를 좀 포기.
num = 3;
let str: string = String(num);

// 배열의 타입.
let arr = [1, 2, 3];
// let arr: number[] = [1, 2, 3];
// let arr: Array<number> = [1, 2, 3];
// Array<제네릭>

let manyTypeArr: (string | number | boolean)[] = [true, 2, '3'];
// Tuple [튜플]
let fixedLengthArr: [boolean, number, string] = [true, 2, '3'];
// fixedLengthArr = [5];
let fixedElementsArr: [boolean, 2, '3'] = [true, 2, '3'];
// readonly == 상수 (let 이여도 변경 불가)
let fixedElementsArrAsConst = [true, 2, '3'] as const;

// 객체의 단점 (객체의 내부값을 못 바꾸게 할 수 있음)
const obj = {a: 'b'} as const;
// obj.a = 'c';

const stringObj: {a: string, b?: number} = {a: 'b'};
// const stringObj: {a: string, b: number} = {a: 'b'}; // error TS2741: Property 'b' is missing in type.
// stringObj.a = 3;
// 있을지없을지 모르겠는 경우 : b?
stringObj.b = 3;


enum Color { Red, Green, Blue }
let c: Color.Green;

// 사용 가능.
Color[0] === 'Red';
Color['Red'] === 0;

// 타입 확인해 볼 것.
const n = null;
const un = undefined;
const v = void 0;

// 함수 적는 법.
function add(a: number, b: number): number | string {
    console.log(a + b);
    return a + b;
}

// type: void
function f(a: number, b: number) {
    console.log(a + b);
    // return undefined;
}

// 함수가 함수를 반환. (가독성 안 좋아지는 예)
function fn(a: number, b: number): (c: string) => (d: string) => boolean {
    return (c: string) => {
        return (d: string) => {
            return false;
        }
    };
}

// 오버로딩 관계 명확히 표현 가능. (매개변수 있는지 없는지로)
const obj2: {a: (b: number, c?: string) => string} = {
    a(b: number, c?: string) {
        return 'hello';
    }
};

obj2.a(3);
obj2.a(4, "hi");


// 배열을 잘못 만들 경우, never. (에러의 리턴값 never)
const arr2: [] = [];
// arr2.push(3); // 빈 배열을 만들어 놓고, push 하는 경우.
// error TS2345: Argument of type 'number' is not assignable to parameter of type 'never'.


// any == javascript (왠만하면 안 쓴다.)
// 타입 정의할 때 너무 복잡해서 못 만들 경우. or 남이 작성한 코드에서 타입 정의가 잘못 되어 있을 때.
const hi: any = [];

// d.ts 에서 강제로 형변환 하는 꼼수.
let hello: number = 4380430843;
// (hello as unknown as string).substring(1, 2);
(<string><unknown>hello).substring(2, 3);

// 부모자식, 상속 관계일 경우에 unknown 없이 형변환 가능.
const div = document.createElement('div');
const a = div as HTMLElement;
const b = div as unknown as number;
