document.addEventListener("DOMContentLoaded", function() {
    let convertKKButton = document.getElementById('convert-kk-btn');
    let kkInput = document.getElementById('kk-amount');

    kkInput.addEventListener('input', function() {
        validateKKInput(kkInput);
    });

    convertKKButton.addEventListener('click', convertKK);
});

function validateKKInput(inputElement) {
    let value = inputElement.value.trim();

    if (value === "") {
        hideKKInputError(inputElement); // Hide error when value is empty
        return false;
    }

    let regex = /^\d+(\.\d{1,4})?$/;

    if (!regex.test(value)) {
        showKKInputError(inputElement, "Ingresa un número válido con hasta cuatro decimales para KK (por ejemplo, 23.4567). Los decimales deben ser separados por un punto.");
        return false;
    }

    hideKKInputError(inputElement);
    return true;
}

function showKKInputError(inputElement, message) {
    let parent = inputElement.parentNode;
    let errorDiv = parent.querySelector('.error-message');

    // Remove any existing error message
    if (errorDiv) {
        parent.removeChild(errorDiv);
    }

    // Create new error message
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    parent.appendChild(errorDiv);

    // Disable the convert button associated with this input
    inputElement.parentNode.querySelector('button').disabled = true;
}

function hideKKInputError(inputElement) {
    let parent = inputElement.parentNode;
    let errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        parent.removeChild(errorDiv);
    }

    // Enable the convert button associated with this input
    inputElement.parentNode.querySelector('button').disabled = false;
}

function convertKK() {
    let kkAmount = parseFloat(document.getElementById('kk-amount').value.replace(',', '.'));

    if (!validateKKInput(document.getElementById('kk-amount')) || isNaN(kkAmount) || kkAmount < 0) {
        return;
    }

    let totalTenThousandDollars = kkAmount * 10000;
    let tenThousandDollars = Math.floor(totalTenThousandDollars);
    let remainingAmount = (totalTenThousandDollars - tenThousandDollars) * 100;
    let cents = Math.round((remainingAmount - Math.floor(remainingAmount)) * 100);

    displayResultKK(`${kkAmount} KK`, tenThousandDollars, cents);

    document.getElementById('kk-amount').value = "";
}

function displayResultKK(inputAmount, tenThousandDollars, cents) {
    let resultDiv = document.getElementById('conversion-result');
    let resultHTML = `
        <h3>Resultado de Conversión</h3>
        <p>${inputAmount} equivalen a:</p>
        <p>${formatNumber(tenThousandDollars)} <img src="/ttd.png" alt="Ten Thousand Dollars"> Ten Thousand Dollars (ttd)</p>
    `;

    if (cents > 0) {
        resultHTML += `<p>${formatNumber(cents)} <img src="/c.png" alt="Cents"> Cents</p>`;
    }

    resultDiv.innerHTML = resultHTML;
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
