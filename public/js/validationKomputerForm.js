
function validateForm() {

    const modelInput = document.getElementById('valueModel'); // 'model');
    const systemOperacyjnyInput = document.getElementById('systemOperacyjnyInput')
    const typKomputeraInput = document.getElementById('typKomputeraInput');
    const dataStworzeniaInput = document.getElementById('dataStworzeniaInput');

    const errorModel = document.getElementById('errorModel');
    const errorSystemOperacyjny = document.getElementById('errorSystemOperacyjny');
    const errorTypKomputera = document.getElementById('errorTypKomputera');
    const errorDataStworzenia = document.getElementById('errorDataStworzenia');


    const errorSummary = document.getElementById('errorSummary');

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
        errorModel.innerText = "Pole powinno zawierać od 2 do 60 znaków";
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


    let nowDate = new Date();
    let tommorowDate = new Date();
    tommorowDate.setDate(nowDate.getDate() + 1);

    let month = '' + (tommorowDate.getMonth() + 1),
        day = '' + tommorowDate.getDate(),
        year = tommorowDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const tommorowString = [year, month, day].join('-');

    if (!checkRequired(dataStworzeniaInput.value)) {
        valid = false;
        dataStworzeniaInput.classList.add("error-input");
        errorDataStworzenia.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataStworzeniaInput.value)) {
        valid = false;
        dataStworzeniaInput.classList.add("error-input");
        errorDataStworzenia.innerText = "Pole powinno zawierać datę w formacie MM-dd-yyyy (np. 2000-01-24)";
    } else if (checkDateIfAfter(dataStworzeniaInput.value, tommorowString)) {
        valid = false;
        dataStworzeniaInput.classList.add("error-input");
        errorDataStworzenia.innerText = "Data nie może być z przyszłości";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}