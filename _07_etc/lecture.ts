// union (|)
type A = string | number;

// intersection (&)
interface IA {
    hi: true,
}
interface IB {
    bye: true,
}
// 중복 발생.
interface ID {
    hi: true,
    bye: true,
    hello: false,
}
type C = {
    hello: false,
}
const a: IA = {
    hi: true,
}
const b: IB = {
    bye: true,
}
const c: IA & IB & C = {
    hi: true,
    bye: true,
    hello: false,
}



// call(), apply(). <제네릭> 타입 추론해보기.
const result = Array.prototype.map.call<number[], [(item: number) => string], string[]>([1, 2, 3], (item) => {
    return item.toFixed(1);
});
// [1, 2, 3].map((item) => item.toFixed(1));
// result: ['1.0', '2.0', '3.0']



// Utility Types
interface AA {
    a: 'b',
    c: true,
    d: 123,
}

const aa: AA = {
    a: 'b',
    c: true,
    d: 123,
}
// Partial<T>
const bb: Partial<AA> = {
    a: 'b',
    c: true,
}
// Readonly
const cc: Readonly<AA> = {
    a: 'b',
    c: true,
    d: 123,
}



// 데코레이터 : 기능 수정. (Javascript 개념) - 중복을 줄여주는 역할.
    // 데코레이터 사용.
    // "experimentalDecorators": true
@makeGender
class Person {
    title: string;
    age: 23;
    constructor() {
        this.title = 'hi';
        this.age = 23;
    }
    setTitle(title: string) {

    }
    sayTitle(): any {
        return this.title;
    }
}

// typeof로 원본이 들어가서 추가본이 나옴.
function makeGender(target: typeof Person) {
    console.log('check');
    return class extends target {
        gender = 'male';
    }
}