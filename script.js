const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const signs = '+-÷×';
let currDisplay1 = '';
let currDisplay2 = '';
let display1Nums = [];
let display1Signs = [];
let ans = '';

ready();

function ready() {
    clearDisplay();

    document.getElementById('clear').onclick = () => clearDisplay();
    document.getElementById('del').onclick = () => updateDisplay1('', 'del');
    document.getElementById('decimal-point').onclick = () => {if (!display1Nums[display1Nums.length - 1].includes('.')) updateDisplay1('.')}
    document.getElementById('ans').onclick = () => updateDisplay1(ans);
    document.getElementById('equals-to').onclick = () => updateDisplay2();

    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', () => updateDisplay1(numbers[i].textContent))
    }
    for (let i = 0; i < operators.length; i++) {
        operators[i].onclick = () => {
            if ((display1Nums.length >= 2) && (display1Nums[1] != '')) {
                let tmpAns = ans;
                currDisplay1 = parseDisplay();
                display1.textContent = ans;
                updateDisplay1(operators[i].textContent);
                ans = tmpAns;
            } else {
                if (!signs.includes(display1.textContent.slice(-1))) {
                    updateDisplay1(operators[i].textContent);
                } else {
                    display1.textContent = display1.textContent.slice(0, -1);
                    updateDisplay1(operators[i].textContent);
                }
            }
        }
    }
}

function clearDisplay() {
    display1.textContent = '';
    display2.textContent = '';
    currDisplay1 = '';
    processCurrDisplay1();
}

function updateDisplay1(btn, del) {
    if (!del) {
        display1.textContent += btn;  
    } else (
        display1.textContent = display1.textContent.slice(0, -1)
    )
    currDisplay1 = display1.textContent;
    processCurrDisplay1();
    display1.scrollLeft = display1.scrollWidth;
}

function updateDisplay2() {
    display2.textContent = parseDisplay();
    display2.scrollLeft = display1.scrollWidth;
}

function processCurrDisplay1() {
    tmpArr = currDisplay1.split('');
    display1Nums = [];
    display1Signs = [];

    for (let i = 0; i < tmpArr.length; i++) {
        if (!signs.includes(tmpArr[i])) {
            display1Nums.push(tmpArr[i]);
        } else {
            display1Nums.push(',');
            display1Signs.push(tmpArr[i]);
        }
    }

    display1Nums = display1Nums.join('').split(',');
}

function parseDisplay() {
    if (!display1Nums[1] && !display1Signs[0]) {
        ans = Number(display1.textContent);
    } else if (!display1Nums[1] && display1Signs[0]) {
        ans = operate(Number(display1Nums[0]), display1Signs[0], Number(display1Nums[0]));
    } else {
        if (display1Nums.length <= 2) {
            ans = operate(Number(display1Nums[0]), display1Signs[0], Number(display1Nums[1]));
        } else {
            ans = Number(display1Nums[0]);
        }
    }
    if (ans) return ans;
    ans = '0';
    return ans;
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function divide(a, b) {
    return a / b;
}
function multiply(a, b) {
    return a * b;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '÷':
            return divide(num1, num2);
        case '×':
            return multiply(num1, num2);
        default:
            break;
    }
}