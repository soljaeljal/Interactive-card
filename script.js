'use strict';

const form = document.querySelector('form');
const complete = document.querySelector('.complete');

// Input fields
const inputs = document.querySelectorAll('input');
const cardName = document.querySelector('#name');
const cardNumber = document.querySelector('#card-number');
const expMonth = document.querySelector('#exp-month');
const expYear = document.querySelector('#exp-year');
const cvc = document.querySelector('#cvc');


// Display elements
const displayName = document.querySelector('.card-front--name');
const displayNumber = document.querySelector('.card-front--number');

const displayMonth = document.querySelector('.card-front--month');
const displayYear = document.querySelector('.card-front--year');

const displayCVC = document.querySelector('.card-back--cvc');

// Warnings
const nameBlank = document.querySelector('.name--blank');
const numberBlank = document.querySelector('.number--blank');
const expBlank = document.querySelector('.exp--blank');
const cvcBlank = document.querySelector('.cvc--blank');

// Btn
const confirmBtn = document.querySelector('.confirmBtn');


// Display Name
cardName.onkeyup = (e) => {
    if (cardName.value.length > 0) {
        displayName.textContent = e.target.value;
        nameBlank.classList.remove('visible');
    } else {
        displayName.textContent = 'Jane Appleseed';
    }
}

// Display Number

cardNumber.onkeypress = () => {
    if (cardNumber.value.length == 16) return false;
};

cardNumber.onkeyup = (e) => {
    if (cardNumber.value.length > 0) {
        displayNumber.textContent = e.target.value;
        numberBlank.classList.remove('visible');
    } else {
        displayNumber.textContent = '0000 0000 0000 0000';
    }
}



// Display CVC
cvc.onkeypress = () => {
    if (cvc.value.length == 3) return false;
};

cvc.onkeyup = (e) => {
    if (cvc.value.length > 0) {
        displayCVC.textContent = e.target.value;
        cvcBlank.classList.remove('visible');
    } else {
        displayCVC.textContent = '000';
    }
  }

// Display expiration date
expMonth.onkeypress = () => {
    if (expMonth.value.length == 2) return false;
};

expYear.onkeypress = () => {
    if (expYear.value.length == 2) return false;
};

expMonth.onkeyup = (e) => {
    if (expMonth.value.length > 0) {
        displayMonth.textContent = e.target.value;
    } else {
        displayMonth.textContent = '00';
    }
    if (expMonth.value.length > 0 && expYear.value.length > 0) {
        expBlank.classList.remove('visible');
    }
};

expYear.onkeyup = (e) => {
    if (expYear.value.length > 0) {
        displayYear.textContent = e.target.value;
    } else {
        displayYear.textContent = '00';
    }
    if (expMonth.value.length > 0 && expYear.value.length > 0) {
        expBlank.classList.remove('visible');
    }
}

let nameCheck, numberCheck, expCheck, cvcCheck = false;

// Display warnings
confirmBtn.addEventListener('click', function(){
        if(cardName.value.length < 1) {
            nameBlank.classList.add('visible');
            cardName.style.border = '2px solid hsl(0, 100%, 66%)';
            nameCheck = false;
        } else {
            nameCheck = true;
            cardName.style.border = '1px solid hsl(270, 3%, 87%)';
        };
        
        if (cardNumber.value.length < 1) {
            numberBlank.classList.add('visible');
            cardNumber.style.border = '2px solid hsl(0, 100%, 66%)';
            numberCheck = false;
        } else if (cardNumber.value.length < 16) {
            numberBlank.textContent = 'Must be 16 digits';
            numberBlank.classList.add('visible');
            cardNumber.style.border = '2px solid hsl(0, 100%, 66%)';
            numberCheck = false; 
        } else {
            numberCheck = true;
            cardNumber.style.border = '1px solid hsl(270, 3%, 87%)';
        };

        if(expMonth.value.length < 1 || expYear.value.length < 1) {
            expBlank.classList.add('visible');
            expCheck = false;
        } else if(expMonth.value.length == 1 || expYear.value.length == 1) {
            expBlank.classList.add('visible');
            expBlank.textContent = 'Must be 2 digits';
            expCheck = false;
        } else {
            expCheck = true;
        };

        if(expMonth.value.length < 1 || expMonth.value.length == 1) {
            expMonth.style.border = '2px solid hsl(0, 100%, 66%)';
        } else {
            expMonth.style.border = '1px solid hsl(270, 3%, 87%)';
        };

        if(expYear.value.length < 1 || expYear.value.length == 1) {
            expYear.style.border = '2px solid hsl(0, 100%, 66%)';
        } else {
            expYear.style.border = '1px solid hsl(270, 3%, 87%)';
        };

        if(cvc.value.length < 1) {
            cvcBlank.classList.add('visible');
            cvc.style.border = '2px solid hsl(0, 100%, 66%)';
            cvcCheck = false;
            } else if (cvc.value.length > 0 && cvc.value.length < 3) {
                cvcBlank.classList.add('visible');
                cvc.style.border = '2px solid hsl(0, 100%, 66%)';
                cvcBlank.textContent = 'Must be 3 digits';
            } else {
                cvcCheck = true;
                cvc.style.border = '1px solid hsl(270, 3%, 87%)';
            };

        if (nameCheck && numberCheck && expCheck && cvcCheck) {
            form.style.display = 'none';
            complete.style.display = 'flex';
        }
    });





    function formatInput() {
        const inputValues = this.value.split(""); // Stores each character the user enters in an array
        const inputValuesFiltered = inputValues.filter(char => char !== " "); // Filters the spaces out of the inputValues array
        let inputFieldReformatted = ""; // String to replace the input field value with
        let counter = 0;
        
        for (let i = 0; i < inputValuesFiltered.length; i++) {
            if (counter === 4) {
                inputFieldReformatted += ` ${inputValuesFiltered[i]}`;
                counter = 1;
                continue;
            }
            
            inputFieldReformatted += inputValuesFiltered[i];
            counter++;
        }
        
        this.value = inputFieldReformatted;
    }
