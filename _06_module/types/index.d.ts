export {};
// 꼼수.

declare global {
    interface Window {
        hello: string;
    }
    interface Error {
        code?: number;
    }
}

// 인터페이스는 서로 합칠 수 있다.
// 내부 모듈 : 네임스페이스.
// 외부 모듈 : export, import.
// 앰비언트 모듈 : 내가 만드는 모듈.