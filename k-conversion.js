document.addEventListener("DOMContentLoaded", function() {
    let convertKButton = document.getElementById('convert-k-btn');
    convertKButton.addEventListener('click', convertK);
});

function validateInput(inputElement) {
    let value = inputElement.value.trim();

    if (value === "") {
        hideInputError(inputElement); // Hide error when value is empty
        return false;
    }

    let regex = /^\d+(\.\d{1,3})?$/;

    if (!regex.test(value)) {
        showInputError(inputElement, "Ingresa un número con hasta tres decimales para K (por ejemplo, 23.456). Los decimales deben ser separados por un punto.");
        return false;
    }

    hideInputError(inputElement);
    return true;
}

function showInputError(inputElement, message) {
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    let parent = inputElement.parentNode;
    parent.appendChild(errorDiv);
    document.getElementById('convert-k-btn').disabled = true;
}

function hideInputError(inputElement) {
    let parent = inputElement.parentNode;
    let errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        parent.removeChild(errorDiv);
    }
    document.getElementById('convert-k-btn').disabled = false;
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

    // Adjust hundredDollars and cents for proper rounding and display
    if (cents === 100) {
        hundredDollars += 1;
        cents = 0;
    }

    displayKResult(`${kAmount} K`, tenThousandDollars, hundredDollars, cents);

    document.getElementById('k-amount').value = "";
}

function displayKResult(inputAmount, tenThousandDollars, hundredDollars, cents) {
    let resultDiv = document.getElementById('conversion-result');
    let resultHTML = `
        <h3>Resultado de Conversión</h3>
        <p>${inputAmount} equivalen a:</p>
        <p>${formatNumber(tenThousandDollars)} <img src="/ttd.png" alt="Ten Thousand Dollars"> Ten Thousand Dollars (ttd)</p>
    `;

    if (hundredDollars > 0 || cents > 0) {
        resultHTML += `<p>con`;
    }

    if (hundredDollars > 0) {
        resultHTML += ` ${formatNumber(hundredDollars)} <img src="/hd.png" alt="Hundred Dollars"> Hundred Dollars (hd)`;
    }

    if (cents > 0) {
        resultHTML += ` ${formatNumber(cents)} <img src="/c.png" alt="Cents"> Cents`;
    }

    if (hundredDollars > 0 || cents > 0) {
        resultHTML += `</p>`;
    }

    resultDiv.innerHTML = resultHTML;
}

function formatNumber(number) {
    // Convert number to string and remove trailing zeros after the decimal point
    let formatted = number.toFixed(2).replace(/\.?0*$/, '');
    return formatted;
}
