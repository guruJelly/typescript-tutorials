let number1 = Math.ceil(Math.random() * 9);
let number2 = Math.ceil(Math.random() * 9);
let result = number1 * number2;
let string = 'hello';
let boolean = true;


const wordNumber = document.createElement('div');
wordNumber.textContent = `${String(number1)} X ${String(number2)} ?`;
document.body.append(wordNumber);


const form = document.createElement('form');
document.body.append(form);


const input = document.createElement('input');
input.type = 'number';
form.append(input);


const button = document.createElement('button');
button.textContent = "입력"
form.append(button);


const resultDiv = document.createElement('div');
document.body.append(resultDiv);


form.addEventListener('submit', (e) => {

    e.preventDefault();
    
    if (result === Number(input.value)) {
        resultDiv.textContent = '정답';
        number1 = Math.ceil(Math.random() * 9);
        number2 = Math.ceil(Math.random() * 9);
        result = number1 * number2;
        wordNumber.textContent = `${String(number1)} X ${String(number2)} ?`;
    } else {
        resultDiv.textContent = '땡';
    }

    input.value = '';
    input.focus();

});