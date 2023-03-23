const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const signs = '+-÷×';
let ans = '';
let display = {
    display1: document.getElementById('display-1'),
    display2: document.getElementById('display-2'),
    display1Nums: [],
    display1Signs: []
}
let currDisplay = {
    display1: '',
    display2: ''
}

main();

function main() {
    clearDisplay();

    document.getElementById('clear').onclick = () => clearDisplay();
    document.getElementById('del').onclick = () => updateDisplay1('', 'del');
    document.getElementById('decimal-point').onclick = () => {if (!display.display1Nums[display.display1Nums.length - 1].includes('.')) updateDisplay1('.')}
    document.getElementById('ans').onclick = () => updateDisplay1(ans);
    document.getElementById('equals-to').onclick = () => updateDisplay2();

    document.addEventListener("keypress", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        if ("1234567890".includes(event.key)) {
            updateDisplay1(event.key);
        } else if (signs.includes(event.key)) {
            if ((display.display1Nums.length >= 2) && (display.display1Nums[1] != '')) {
                let tmpAns = ans;
                currDisplay.display1 = parseDisplay();
                display.display1.textContent = ans;
                updateDisplay1(event.key);
                ans = tmpAns;
            } else {
                if (!signs.includes(display.display1.textContent.slice(-1))) {
                    updateDisplay1(event.key);
                } else {
                    display.display1.textContent = display.display1.textContent.slice(0, -1);
                    updateDisplay1(event.key);
                }
            }
        } else if ("/*".includes(event.key)) {
            return;// display signs
        } else if (event.key == ".") {
            if (!display.display1Nums[display.display1Nums.length - 1].includes('.')) updateDisplay1('.');
        } else if (event.key == "=") {
            updateDisplay2();
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', () => updateDisplay1(numbers[i].textContent))
    }
    for (let i = 0; i < operators.length; i++) {
        operators[i].onclick = () => {
            if ((display.display1Nums.length >= 2) && (display.display1Nums[1] != '')) {
                let tmpAns = ans;
                currDisplay.display1 = parseDisplay();
                display.display1.textContent = ans;
                updateDisplay1(operators[i].textContent);
                ans = tmpAns;
            } else {
                if (!signs.includes(display.display1.textContent.slice(-1))) {
                    updateDisplay1(operators[i].textContent);
                } else {
                    display.display1.textContent = display.display1.textContent.slice(0, -1);
                    updateDisplay1(operators[i].textContent);
                }
            }
        }
    }
}

function clearDisplay() {
    display.display1.textContent = '';
    display.display2.textContent = '';
    currDisplay.display1 = '';
    processCurrDisplay1();
}

function updateDisplay1(btn, del) {
    if (!del) {
        if ((btn == ans) && (ans.toString().includes('e'))) {
            display.display1.textContent += BigInt(btn);
        } else {
            display.display1.textContent += btn; 
        }
    } else {
        display.display1.textContent = display.display1.textContent.slice(0, -1)
    }
    currDisplay.display1 = display.display1.textContent;
    processCurrDisplay1();
    display.display1.scrollLeft = display.display1.scrollWidth;
}

function updateDisplay2() {
    display.display2.textContent = parseDisplay();
    display.display2.scrollLeft = display.display2.scrollWidth;
}

function processCurrDisplay1() {
    tmpArr = currDisplay.display1.split('');
    display.display1Nums = [];
    display.display1Signs = [];

    for (let i = 0; i < tmpArr.length; i++) {
        if (!signs.includes(tmpArr[i])) {
            display.display1Nums.push(tmpArr[i]);
        } else {
            display.display1Nums.push(',');
            display.display1Signs.push(tmpArr[i]);
        }
    }

    display.display1Nums = display.display1Nums.join('').split(',');
}

function parseDisplay() {
    if (!display.display1Nums[1] && !display.display1Signs[0]) {
        ans = Number(display.display1.textContent);
    } else if (!display.display1Nums[1] && display.display1Signs[0]) {
        ans = operate(Number(display.display1Nums[0]), display.display1Signs[0], Number(display.display1Nums[0]));
    } else {
        if (display.display1Nums.length <= 2) {
            ans = operate(Number(display.display1Nums[0]), display.display1Signs[0], Number(display.display1Nums[1]));
        } else {
            ans = Number(display.display1Nums[0]);
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
            if (num2 != 0) return divide(num1, num2);
            alert('Can not divide by 0');
            return 0;
        case '×':
            return multiply(num1, num2);
        default:
            break;
    }
}