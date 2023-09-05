const clearB = document.getElementById('clear');
const delB = document.getElementById('del');
const divideB = document.getElementById('divide');
const mulB = document.getElementById('mul');
const subB = document.getElementById('sub');
const addB = document.getElementById('add');
const deciB = document.getElementById('deci');
const equalB = document.getElementById('equal');
const noB = document.querySelectorAll('.no')
const resultElement = document.getElementById('res')

let result = '';
let operation = '';
let preoperand = 0;

const Appendno = (no) => {
    if (no == '.' && result.includes('.')) {
        return;
    }
    result += no;
    updatedata();
}
const updatedata = () => {
    if (operation) {
        resultElement.innerText = `${preoperand} ${operation} ${result}`;
    }
    else {
        resultElement.innerText = result;
    }
}

const selectoper = (operatorval) => {
    if (result == '') {
        return;
    }

    if (operation !== '' && preoperand !== '') {
        calculateresult();
    }
    operation = operatorval;
    preoperand = result;
    result = '';
    updatedata();
}

const calculateresult = () => {
    let eval;
    const prev = parseFloat(preoperand);
    const cur = parseFloat(result);

    if (isNaN(prev) || isNaN(cur)) return;

    switch (operation) {
        case '+':
            eval = prev + cur;
            break;
        case '-':
            eval = prev - cur;
            break;
        case '*':
            eval = prev * cur;
            break;
        case '/':
            eval = prev / cur;
            break;
        default:
            return;

    }
    result = eval.toString();
    operation = '';
    preoperand = '';
}
noB.forEach(button => {
    button.addEventListener('click', () => {
        Appendno(button.innerText);
    });
});

const cleardis = () => {
    result = '';
    preoperand = '';
    operation = '';
    updatedata();
}

const deleteLastdigit = () => {
    if (result === '') return;
    result = result.slice(0, -1);
    updatedata();
}

deciB.addEventListener('click', () => appendno('.'));
addB.addEventListener('click', () => selectoper('+'));
subB.addEventListener('click', () => selectoper('-'));
mulB.addEventListener('click', () => selectoper('*'));
divideB.addEventListener('click', () => selectoper('/'));
equalB.addEventListener('click', () => {
    if (result === '') return;
    calculateresult();
    updatedata();
});

clearB.addEventListener('click', cleardis);
delB.addEventListener('click', deleteLastdigit);