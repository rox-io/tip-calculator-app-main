//INPUTS SELECTION
const billInput = document.querySelector('#bill');
const tipBtns = document.querySelectorAll('#tip-wrapper button');
const customInput = document.querySelector('#input-section-b input');
const peopleInput = document.querySelector('#people');
const tipDisplay = document.querySelector('#tip');
const totalDisplay = document.querySelector('#total');
const invalidText = document.querySelector('#input-section-c .invalid-text');
const resetBtn = document.querySelector('#reset-btn');

//VARIABLES
let peopleInputValue = 0;
let tipPerc = 0;
let split;
let totalTip;
let totalPerPerson;

//EVENTS
billInput.addEventListener('input', (e) => {
    if(Number.isInteger(parseFloat(e.target.value)) && parseFloat(e.target.value) !== 0) {
        if(peopleInputValue !== 0) {
            calculateBill();
        }
        else {
            invalid();
        }
    }
    else {
    }
})

for(let btn of tipBtns) {
    btn.addEventListener('click', (e) => {
        focusedBtn(tipBtns, e.target);
        tipPerc = parseFloat(e.target.value);
        customInput.value = "";
        if(peopleInputValue !== 0) {
            calculateBill();

        }
        else {
            invalid();
        }
    })  
}

customInput.addEventListener('input', (e) => {
    removeFocus(tipBtns);
    tipPerc = parseFloat(e.target.value);
    if(Number.isInteger(parseFloat(e.target.value)) && parseFloat(e.target.value) !== 0) {
        if(peopleInputValue !== 0) {
            calculateBill();
        }
        else {
            invalid();
        }
    }
})

peopleInput.addEventListener('input', (e) => {
    if(Number.isInteger(parseFloat(e.target.value)) && parseFloat(e.target.value) !== 0) {
        removeInvalid();
        peopleInputValue = parseFloat(e.target.value);
    }
    else {
        peopleInputValue = 0;
    }
})

//FUNCTIONS
function focusedBtn(tipBtn, selectedBtn) {
    for(let btn of tipBtn) {
        btn.classList.remove("tip-btn-selected");
    }
    selectedBtn.classList.add("tip-btn-selected");
}

function removeFocus(tipBtn) {
    for(let btn of tipBtn) {
        btn.classList.remove("tip-btn-selected");
    }
}

function calculateBill() {
    split = parseFloat(billInput.value) / parseFloat(peopleInput.value);
    totalTip = tipPerc / 100 * split;
    totalPerPerson = totalTip + split;
    tipDisplay.textContent =  "$" + (Math.round(totalTip * 100) / 100).toFixed(2);
    totalDisplay.textContent =  "$" + (Math.round(totalPerPerson * 100) / 100).toFixed(2);
    resetBtn.style="background-color: hsl(172, 67%, 45%)";
}

function invalid() {
    peopleInput.classList.add('invalid-input-border');
    invalidText.classList.add('invalid-text');
    invalidText.textContent = "Can't be zero";
}

function removeInvalid() {
    peopleInput.classList.remove('invalid-input-border');
    invalidText.classList.remove('invalid-text');
    invalidText.textContent = "";
}

resetBtn.addEventListener('click', (e) => {
    billInput.value = "";
    customInput.value = "";
    peopleInput.value = "";
    peopleInputValue = 0;
    tipPerc = 0;
    tipDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    e.target.style="background-color: hsl(183, 43%, 24%)";
    removeInvalid();
    removeFocus(tipBtns);
})
