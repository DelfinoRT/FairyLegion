document.addEventListener("DOMContentLoaded", function() {
    let convertTTDButton = document.getElementById('convert-ttd-btn');
    let ttdInput = document.getElementById('ttd-amount');

    ttdInput.addEventListener('input', function() {
        validateTTDInput(ttdInput);
    });

    convertTTDButton.addEventListener('click', convertTTD);
});

function validateTTDInput(inputElement) {
    let value = inputElement.value.trim();

    if (value === "") {
        hideTTDInputError(inputElement); // Hide error when value is empty
        return false;
    }

    let regex = /^\d+(\.\d{1,2})?$/;

    if (!regex.test(value)) {
        showTTDInputError(inputElement, "Ingresa un número con hasta dos decimales para TTD (por ejemplo, 23.45). Los decimales deben ser separados por un punto.");
        return false;
    }

    hideTTDInputError(inputElement);
    return true;
}

function showTTDInputError(inputElement, message) {
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

function hideTTDInputError(inputElement) {
    let parent = inputElement.parentNode;
    let errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        parent.removeChild(errorDiv);
    }

    // Enable the convert button associated with this input
    inputElement.parentNode.querySelector('button').disabled = false;
}

function convertTTD() {
    let ttdAmount = parseFloat(document.getElementById('ttd-amount').value.replace(',', '.'));

    if (!validateTTDInput(document.getElementById('ttd-amount')) || isNaN(ttdAmount) || ttdAmount < 0) {
        return;
    }

    let kAmount = ttdAmount / 10;
    let kkAmount = ttdAmount / 10000;

    displayTTDResult(`${ttdAmount} TTD`, kAmount, kkAmount);

    document.getElementById('ttd-amount').value = "";
}

function displayTTDResult(inputAmount, kAmount, kkAmount) {
    let resultDiv = document.getElementById('conversion-result');
    let resultHTML = `
        <h3>Resultado de Conversión</h3>
        <p>${inputAmount} <img src="/ttd.png" alt="TTD"> equivalen a:</p>
        <p>${formatNumber(kAmount)} K o ${formatNumber(kkAmount)} KK</p>
    `;

    resultDiv.innerHTML = resultHTML;
}

function formatNumber(number) {
    let formatted = number.toFixed(4); // Format number to four decimal places
    return formatted.replace(/\.?0*$/, ''); // Remove trailing zeros
}
