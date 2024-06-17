document.addEventListener("DOMContentLoaded", function() {
    let kInput = document.getElementById('k-amount');
    let kkInput = document.getElementById('kk-amount');
    let convertKButton = document.getElementById('convert-k-btn');
    let convertKKButton = document.getElementById('convert-kk-btn');

    kInput.addEventListener('focus', function() {
        kkInput.disabled = true;
        convertKKButton.disabled = true;
    });

    kkInput.addEventListener('focus', function() {
        kInput.disabled = true;
        convertKButton.disabled = true;
    });

    kInput.addEventListener('blur', function() {
        kkInput.disabled = false;
        convertKKButton.disabled = false;
    });

    kkInput.addEventListener('blur', function() {
        kInput.disabled = false;
        convertKButton.disabled = false;
    });

    kInput.addEventListener('input', function() {
        validateInput(kInput);
    });

    kkInput.addEventListener('input', function() {
        validateInput(kkInput);
    });
});

function validateInput(inputElement) {
    let value = inputElement.value.trim();

    if (value === "") {
        showInputError(inputElement, "Ingresa un valor numérico válido.");
        return false;
    }

    let regex;

    if (inputElement.id === 'k-amount') {
        regex = /^\d+(\.\d{1,4})?$/;
    } else if (inputElement.id === 'kk-amount') {
        regex = /^\d+(\.\d{1,3})?$/;
    }

    if (!regex.test(value)) {
        showInputError(inputElement, "Ingresa un número con hasta cuatro decimales para K o hasta tres decimales para KK (por ejemplo, 23.4567 o 23.456). Los decimales deben ser separados por un punto.");
        return false;
    }

    hideInputError(inputElement);
    return true;
}

function showInputError(inputElement, message) {
    hideInputError(inputElement);
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    let parent = inputElement.parentNode;
    parent.appendChild(errorDiv);
    if (inputElement.id === 'k-amount') {
        document.getElementById('convert-k-btn').disabled = true;
    } else if (inputElement.id === 'kk-amount') {
        document.getElementById('convert-kk-btn').disabled = true;
    }
}

function hideInputError(inputElement) {
    let parent = inputElement.parentNode;
    let errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        parent.removeChild(errorDiv);
    }
    if (inputElement.id === 'k-amount') {
        document.getElementById('convert-k-btn').disabled = false;
    } else if (inputElement.id === 'kk-amount') {
        document.getElementById('convert-kk-btn').disabled = false;
    }
}

function convertK() {
    let kAmount = parseFloat(document.getElementById('k-amount').value.replace(',', '.'));
    if (!validateInput(document.getElementById('k-amount')) || isNaN(kAmount) || kAmount < 0) {
        return;
    }

    let totalTenThousandDollars = kAmount * 10;
    let tenThousandDollars = Math.floor(totalTenThousandDollars);
    let remainingAmount = (totalTenThousandDollars - tenThousandDollars) * 100;
    let hundredDollars = Math.floor(remainingAmount);
    let cents = Math.round((remainingAmount - hundredDollars) * 100);

    displayResult(`${kAmount} K`, tenThousandDollars, hundredDollars, cents);

    document.getElementById('k-amount').value = "";
    document.getElementById('kk-amount').disabled = false;
    document.getElementById('convert-kk-btn').disabled = false;
}

function convertKK() {
    let kkAmount = parseFloat(document.getElementById('kk-amount').value.replace(',', '.'));
    if (!validateInput(document.getElementById('kk-amount')) || isNaN(kkAmount) || kkAmount < 0) {
        return;
    }

    let totalTenThousandDollars = kkAmount * 10000;
    let tenThousandDollars = Math.floor(totalTenThousandDollars);
    let hundredDollars = Math.round((totalTenThousandDollars - tenThousandDollars) * 100);

    displayResult(`${kkAmount} KK`, tenThousandDollars, hundredDollars, 0);

    document.getElementById('kk-amount').value = "";
    document.getElementById('k-amount').disabled = false;
    document.getElementById('convert-k-btn').disabled = false;
}

function displayResult(inputAmount, tenThousandDollars, hundredDollars, cents) {
    let resultDiv = document.getElementById('conversion-result');
    let resultHTML = `
        <h3>Resultado de Conversión</h3>
        <p>${inputAmount} se convierte en:</p>
        <p>${formatNumber(tenThousandDollars)} <img src="/ttd.png" alt="Ten Thousand Dollars"> Ten Thousand Dollars</p>
    `;

    if (hundredDollars > 0) {
        resultHTML += `<p>${formatNumber(hundredDollars)} <img src="/hd.png" alt="Hundred Dollars"> Hundred Dollars</p>`;
    }

    if (cents > 0) {
        resultHTML += `<p>${formatNumber(cents)} <img src="/c.png" alt="Cents"> Cents</p>`;
    }

    resultDiv.innerHTML = resultHTML;
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function countDecimalPlaces(value) {
    if ((value % 1) !== 0) {
        return value.toString().split(".")[1].length || 0;
    }
    return 0;
}
