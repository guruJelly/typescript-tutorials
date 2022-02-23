var number1 = Math.ceil(Math.random() * 9);
var number2 = Math.ceil(Math.random() * 9);
var result = number1 * number2;
var string = 'hello';
var boolean = true;
var wordNumber = document.createElement('div');
wordNumber.textContent = "".concat(String(number1), " X ").concat(String(number2), " ?");
document.body.append(wordNumber);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
form.append(input);
var button = document.createElement('button');
button.textContent = "입력";
form.append(button);
var resultDiv = document.createElement('div');
document.body.append(resultDiv);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = '정답';
        number1 = Math.ceil(Math.random() * 9);
        number2 = Math.ceil(Math.random() * 9);
        result = number1 * number2;
        wordNumber.textContent = "".concat(String(number1), " X ").concat(String(number2), " ?");
    }
    else {
        resultDiv.textContent = '땡';
    }
    input.value = '';
    input.focus();
});
