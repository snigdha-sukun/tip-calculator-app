const bill = document.getElementById('bill');
const custom = document.getElementById('custom');
const people = document.getElementById('people');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const reset = document.getElementById('reset');
const errorText = document.getElementById('err-txt');

const tip5 = document.getElementById('tip5');
const tip10 = document.getElementById('tip10');
const tip15 = document.getElementById('tip15');
const tip25 = document.getElementById('tip25');
const tip50 = document.getElementById('tip50');

let billValue = undefined;
let tipValue = undefined;
let peopleValue = undefined;

function removeActive() {
    tip5.classList.remove('active');
    tip10.classList.remove('active');
    tip15.classList.remove('active');
    tip25.classList.remove('active');
    tip50.classList.remove('active');
}

function calculateTip() {
    const tip = (billValue * tipValue) / 100;
    const tipPerPerson = tip / peopleValue;
    const total = billValue + tip;
    const totalPerPerson = total / peopleValue;

    tipAmount.textContent = `${tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `${totalPerPerson.toFixed(2)}`;

    reset.disabled = false;
}

function setInputValues(input, value) {
    if (input === 'bill') {
        billValue = value;
    } else if (input === 'people') {
        peopleValue = value;
    } else if (input === 'tip') {
        tipValue = value;
    }
    if (billValue && tipValue && peopleValue) calculateTip();
}

function resetValues() {
    bill.value = '';
    custom.value = '';
    people.value = '';
    tipAmount.textContent = '0.00';
    totalAmount.textContent = '0.00';
    reset.disabled = true;
    billValue = undefined;
    tipValue = undefined;
    peopleValue = undefined;
    removeActive();
}

bill.addEventListener('input', () => {
    setInputValues('bill', parseFloat(bill.value));
});
people.addEventListener('input', () => {
    const value = parseInt(people.value);
    if (value === 0) {
        people.classList.add('error');
        errorText.style.display = "block";
    } else {
        errorText.style.display = "none";
        people.classList.remove('error');
    }
    setInputValues('people', value);
});

tip5.addEventListener('click', () => {
    removeActive();
    tip5.classList.add('active');
    setInputValues('tip', 5);
});
tip10.addEventListener('click', () => {
    removeActive();
    tip10.classList.add('active');
    setInputValues('tip', 10);
});
tip15.addEventListener('click', () => {
    removeActive();
    tip15.classList.add('active');
    setInputValues('tip', 15);
});
tip25.addEventListener('click', () => {
    removeActive();
    tip25.classList.add('active');
    setInputValues('tip', 25);
});
tip50.addEventListener('click', () => {
    removeActive();
    tip50.classList.add('active');
    setInputValues('tip', 50);
});
custom.addEventListener('input', () => {
    removeActive();
    setInputValues('tip', parseFloat(custom.value));
});
reset.addEventListener('click', resetValues);