const { body } = document;

let candidate: number[];
let array: number[] = [];
// 자바스크립트에서 전환할 때는, 오류가 발생하는 것만 타입 붙여주는 것이 좋고. (타입추론)
// 처음부터 시작할 때는 엄격하게 시작하는 것이 좋음. (그러나 너무 자세히 적을 경우, 나중에 버전이 바뀌었을 때 문제될 수도 있음.)

function chooseNumber() {
    candidate = [1,2,3,4,5,6,7,8,9];
    array = [];
    for (let i=0; i<4; i+=1) {
        const chosen = candidate.splice((Math.floor(Math.random() * (9 - i))), 1)[0];
        array.push(chosen)
    }
}

chooseNumber();
console.log(array);

// a가 void이기 때문에 이상한 짓 하는걸 막아줌.
// const a = chooseNumber();
// a.toString();

const result = document.createElement('h1');
document.body.append(result);

const form = document.createElement('form');
document.body.append(form);

const input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;

const button = document.createElement('button');
button.textContent = '입력'
form.append(button);

let wrongCount = 0;
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const answer = input.value;

    // 정답일 경우.
    if (answer === array.join('')) {
        result.textContent = '홈런';
        init();
    // 틀렸을 경우.
    } else {
        const answerArray = answer.split('');
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split
        let strike = 0;
        let ball = 0;
        wrongCount += 1;

        // 10번 이상 시도했을 경우.
        if (wrongCount > 10) {
            result.textContent = `10번 이상 시도. 답은 ${array.join(', ')}`;
            init();
        // 10번 이하이지만 오답인 경우.
        } else {
            
            for (let i=0; i<=3; i+=1) {
                // 자리수가 같은 경우.
                if (Number(answerArray[i]) === array[i]) {
                    strike += 1;
                // 자리수가 다른 경우.
                } else {
                    ball += 1;
                }
            }

            console.log("답이 틀림 :", answerArray);
            result.textContent = `${strike} 스트라이크 ${ball}볼`;
            input.value = '';
            input.focus();

        }
    }
}); 

function init() {
    input.value = '';
    input.focus();
    chooseNumber();
    wrongCount = 0;
}