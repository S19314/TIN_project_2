
function validateForm() {
    const modelInput = document.getElementById('model');
    const systemOperacyjnyInput = document.getElementById('systemOperacyjny')
    const typKomputeraInput = document.getElementById('typKomputera');
    const dataStworzeniaInput = document.getElementById('dataStworzenia');

    const errorModel = document.getElementById('errorModel');
    const errorSystemOperacyjny = document.getElementById('errorSystemOperacyjny');
    const errorTypKomputera = document.getElementById('errorTypKomputera');
    const errorDataStworzenia = document.getElementById('errorDataStworzenia');

    const errorSummary = document.getElementById('errorSummary');
    /*
    event.preventDefault(); // Usuń 
    errorSummary.innerText = "ala ma kota 2 ";
    return false;
    */
    errorSummary.innerText = "ala ma kota 2 ";
    return false;
    resetErrors(
        [modelInput, systemOperacyjnyInput, typKomputeraInput, dataStworzeniaInput],
        [errorModel, errorSystemOperacyjny, errorTypKomputera, errorDataStworzenia],
        errorSummary);

    var valid = true;

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelInput.value, 2, 60)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModelInput.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(systemOperacyjnyInput.value)) {
        valid = false;
        systemOperacyjnyInput.classList.add("error-input");
        errorSystemOperacyjny.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(systemOperacyjnyInput.value, 2, 60)) {
        valid = false;
        systemOperacyjnyInput.classList.add("error-input");
        errorSystemOperacyjny.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(typKomputeraInput.value)) {
        valid = false;
        typKomputeraInput.classList.add("error-input");
        errorTypKomputera.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(typKomputeraInput.value, 2, 60)) {
        valid = false;
        typKomputeraInput.classList.add("error-input");
        errorTypKomputera.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(dataStworzeniaInput.value)) {
        valid = false;
        dataStworzeniaInput.classList.add("error-input");
        errorDataStworzenia.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}