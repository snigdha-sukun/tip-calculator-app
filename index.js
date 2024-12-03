const bill = document.getElementById('bill');
const custom = document.getElementById('custom');
const people = document.getElementById('people');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const reset = document.getElementById('reset');
const errorText = document.getElementById('err-txt');
const tipButtons = document.querySelectorAll('.tip-btn');

let billValue = undefined;
let tipValue = undefined;
let peopleValue = undefined;

const formatNumber = (num) => num.toFixed(2);

const removeActive = () => tipButtons.forEach((btn) => btn.classList.remove('active'));

const setActiveTip = (button, tipValue) => {
    removeActive();
    button.classList.add('active');
    setInputValues('tip', tipValue);
};

const calculateValues = (bill, tip, people) => {
    if (!bill || !tip || !people) return { tipPerPerson: 0, totalPerPerson: 0 };

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;

    return {
        tipPerPerson: tipAmount / people,
        totalPerPerson: totalAmount / people,
    };
};

const updateDisplay = ({ tipPerPerson, totalPerPerson }) => {
    tipAmount.textContent = formatNumber(tipPerPerson);
    totalAmount.textContent = formatNumber(totalPerPerson);
    reset.disabled = false;
};

const setInputValues = (type, value) => {
    if (type === 'bill') billValue = value;
    if (type === 'tip') tipValue = value;
    if (type === 'people') peopleValue = value;

    const result = calculateValues(billValue, tipValue, peopleValue);
    updateDisplay(result);
};

const resetValues = () => {
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
};

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

tipButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const tipValue = parseFloat(button.dataset.value);
        setActiveTip(button, tipValue);
    });
});

custom.addEventListener('input', () => {
    removeActive();
    setInputValues('tip', parseFloat(custom.value));
});

reset.addEventListener('click', resetValues);
