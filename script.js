//INPUTS SELECTION
const billInput = document.querySelector('#bill-input');
const tipBtns = document.querySelectorAll('#tip-wrapper button');
const customInput = document.querySelector('#input-section-b input');
const peopleInput = document.querySelector('#people-input');

//ITERATE OVER TIP BUTTONS TO ADD EVENT LISTENER ON EACH ONE
for(let btn of tipBtns) {
    btn.addEventListener('click', (e) => {
        //IF BUTTON CLICKED CHECK ELEMENT VALUES
        CheckValue(btn);
    })
}

//ADD EVENT LISTENER ON CUSTOM INPUT
customInput.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        //IF ENTER KEY IS PRESSED PREVENT DEFAULT SUBMIT
        e.preventDefault();
        //IF ELEMENT VALUE IS NOT VALID RESET OUTPUT DISPLAY
        if(customInput.value === "" && peopleInput.value > 0) {
            tipDisplay.textContent = '$0.00';
            totalDisplay.textContent = '$0.00';
            removeInvalidity();
        }
        else {
            //IF ENTER KEY IS PRESSED CALL FUNCTION
            CheckValue(customInput);
        }
    }
})

//VALIDATION CHECK
function CheckValue(el) {
    //IF BOTH ELEMENT VALUES ARE VALID
    if(el.value !== "" && peopleInput.value > 0) {
        //CALCULATE BILL
        calcBill(el);
        //REMOVE INVALID STYLYING FROM ELEMENT
        removeInvalidity();
    }//ANYTHING ELSE
    else {
        invalid();
    }
}

//INPUT VALUE CALCULATION FUNCTION
let billSplit;
let selectNum;
let totalTip;
let totalPerPerson;
function calcBill(el) {
    //STORES ELEMENT VALUE TO VARIABLE
    selectNum = el.value;
    //CALCULATES HOW MUCH EACH PERSON PAYS FOR BILL
    billSplit = billInput.value / peopleInput.value;
    //CALCULATES THE TIP TOTAL EACH PERSON WILL PAY
    totalTip = selectNum / 100 * billSplit;
    //CALCULATES THE TOTAL AMOUNT EACH PERSON WILL PAY
    totalPerPerson = billSplit + totalTip;
    //IF BILL VALUE IS NOT VALID
    if(billInput.value === "") {
        tipDisplay.textContent = '$0.00';
        totalDisplay.textContent = '$0.00';
    }
    else {
        //DISPLAY CALCULATIONS
        displayOutput();
    }
}

//DISPLAY OUTPUT FUNCTION
const tipDisplay = document.querySelector('#tip');
const totalDisplay = document.querySelector('#total');
function displayOutput() {
    //DISPLAYS ROUNDED UP CALCULATION TOTALS IN THE OUTPUT ELEMENTS 
    tipDisplay.textContent = "$" + (Math.round(totalTip * 100) / 100).toFixed(2);
    totalDisplay.textContent = "$" + (Math.round(totalPerPerson * 100) / 100).toFixed(2);
    //CHANGES RESET BUTTON BACKGROUND COLOR
    resetBtn.style="background-color: hsl(172, 67%, 45%);"
}

//INVALIDITY FUNCTION
const invalidText = document.querySelector('#input-section-c .invalid-text');
function invalid() {
    //ADDS OUTLINE COLOR TO ELEMENT
    peopleInput.classList.add('invalid-border');
    //ADDS TEXT TO ELEMENT
    invalidText.classList.add('invalid-text');
    invalidText.textContent = "Can't be zero";
}

//REMOVE INVALIDITY FUNCTION
function removeInvalidity() {
    //REMOVES OUTLINE COLOR STYLE FROM ELEMENT
    peopleInput.classList.remove('invalid-border');
    //REMOVES TEXT FROM ELEMENT
    invalidText.textContent = "";
    invalidText.classList.remove('invalid-text');
}

//RESET BUTTON CLICK EVENT
const resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener('click', (e) => {
    //RESETS INPUT VALUES
    billInput.value = "";
    customInput.value = "";
    peopleInput.value = "";
    //RESETS TIP AND TOTAL ELEMENTS 
    tipDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    //CHANGES RESET BUTTON BACKGROUND COLOR TO DEFAULT 
    resetBtn.style="background-color: hsl(183, 43%, 24%)";
    removeInvalidity();
})
