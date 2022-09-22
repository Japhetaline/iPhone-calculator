//DOM Elements
const hourEL = document.querySelector('.hour');
const minuteEL = document.querySelector('.minute');
const displayEl = document.querySelector('.display');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
  number0El, number1El, number2El, number3El, number4El,
  number5El, number6El, number7El, number8El, number9El
];

//variables
let displayStrInMemory = null;
let operatorInMemory = null;

//Functions
const getDisplayAsStr = () => {
    const currentDisplayStr = displayEl.textContent;
    return currentDisplayStr.split(',').join('');

    //another function method
    //const getDisplayAsStr = () => displayEl.textContent.split(',').join('');
};


const getDisplayAsNum = () => {
    return parseFloat(getDisplayAsStr());
}

const setStrAsDisplay = (displayStr) => {
    if (displayStr[displayStr.length - 1] === '.'){
        displayEl.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = displayStr.split('.');
    if (decimalStr){
        displayEl.textContent =
         parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    }else{
        displayEl.textContent =
         parseFloat(wholeNumStr).toLocaleString();
    }
displayEl.textContent = parseFloat(displayStr).toLocaleString();
}

const handleNumberClick = (numStr) => {
    const currentDisplayStr = getDisplayAsStr();
    if (currentDisplayStr === '0'){
        setStrAsDisplay(numStr);
    } else {
        setStrAsDisplay(currentDisplayStr + numStr);
    }
};

const getResultOfOperationAsStr = () => {
    const currentDisplayNum = getDisplayAsNum();
    const displayNumInMemory = parseFloat(displayStrInMemory);
    let newDisplayNum;
    if (operatorInMemory === 'addition'){
        newDisplayNum = displayNumInMemory + currentDisplayNum;
    } else if (operatorInMemory === 'subtraction'){
        newDisplayNum = displayNumInMemory - currentDisplayNum;
    }else if (operatorInMemory === 'multiplication'){
        newDisplayNum = displayNumInMemory * currentDisplayNum;
    }else if (operatorInMemory === 'division'){
        newDisplayNum = displayNumInMemory / currentDisplayNum;
    }

    return newDisplayNum.toString();
};

const handleOperatorClick = (operation) => {
    const currentDisplayStr = getDisplayAsStr();
if (!displayStrInMemory){
    displayStrInMemory = currentDisplayStr;
    operatorInMemory = operation;
    setStrAsDisplay('0');
    return;
}

displayStrInMemory = getResultOfOperationAsStr();
operatorInMemory = operation;
setStrAsDisplay('0');
};

//Add Event Listeners to functions
acEl.addEventListener('click', () => {
setStrAsDisplay('0');
displayStrInMemory = null;
operatorInMemory = null;
});

pmEl.addEventListener('click', () => {
const currentDisplayNum = getDisplayAsNum();
const currentDisplayStr = getDisplayAsStr();

if (currentDisplayStr === '-0'){
    setStrAsDisplay('0');
    return;
}

if (currentDisplayNum >= 0){
    setStrAsDisplay('-' + currentDisplayStr);
} else{
    setStrAsDisplay(currentDisplayStr.substring(1));
}
});

percentEl.addEventListener('click', () => {
const currentDisplayNum = getDisplayAsNum();
const newDisplayNum = currentDisplayNum / 100;
setStrAsDisplay(newDisplayNum.toString());
displayStrInMemory = null;
operatorInMemory = null;
});

//Add Event listenners to operators
additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
if (displayStrInMemory){
setStrAsDisplay(getResultOfOperationAsStr());
displayStrInMemory = null;
operatorInMemory = nul
}
});

//Add Event listeners to numbers and decimal
for (let i =0; i < numberElArray.length; i++){
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}
decimalEl.addEventListener('click', () => {
const currentDisplayStr = getDisplayAsStr();
if (!currentDisplayStr.includes('.')){
    setStrAsDisplay(currentDisplayStr + '.');
}
});

//Set up the time
const updateTime =() =>{
    const currentTime = new Date();

  let  currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour > 12){
        currentHour -=12;
    }
    
    hourEL.textContent = currentHour.toString();
    minuteEL.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();
