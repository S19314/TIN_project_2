
function validateForm() {
    const modelInput = document.getElementById('model');
    const nazwaElementuInput = document.getElementById('nazwaElementu')
    const aktualnaTemperaturaInput = document.getElementById('aktualnaTemperatura');
    const procentWykorzystanychZasobowInput = document.getElementById('procentWykorzystanychZasobow');
    const aktualnaSzybkoscPrzekazaniaDanychInput = document.getElementById('aktualnaSzybkoscPrzekazaniaDanych');
    const typPoloczeniaInput = document.getElementById('typPoloczenia');

    const errorModel = document.getElementById('errorModel');
    const errorNazwaElementu = document.getElementById('errorNazwaElementu');
    const errorAktualnaTemperatura = document.getElementById('errorAktualnaTemperatura');
    const errorProcentWykorzystanychZasobow = document.getElementById('errorProcentWykorzystanychZasobow');
    const errorAktualnaSzybkoscPrzekazaniaDanych = document.getElementById('errorAktualnaSzybkoscPrzekazaniaDanych');
    const errorTypPolaczenia = document.getElementById('errorTypPolaczenia');

    const errorSummary = document.getElementById('errorSummary');
    /*
        event.preventDefault(); // Usuń  DOWN
        errorSummary.innerText = "Ala ma kota 1 ";
        return false;
        // UP
        */

    resetErrors(
        [modelInput, nazwaElementuInput, aktualnaTemperaturaInput, procentWykorzystanychZasobowInput,
            aktualnaSzybkoscPrzekazaniaDanychInput, typPoloczeniaInput],
        [errorModel, errorNazwaElementu, errorAktualnaTemperatura, errorProcentWykorzystanychZasobow,
            errorAktualnaSzybkoscPrzekazaniaDanych, errorTypPolaczenia],
        errorSummary);

    let valid = true;

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelInput.value, 2, 60)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(nazwaElementuInput.value)) {
        valid = false;
        nazwaElementuInput.classList.add("error-input");
        errorNazwaElementuInput.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwaElementuInput.value, 2, 100)) {
        valid = false;
        nazwaElementuInput.classList.add("error-input");
        errorNazwaElementu.innerText = "Pole powinno zawierać od 2 do 100 znaków";
    }

    if (!checkRequired(aktualnaTemperaturaInput.value)) {
        valid = false;
        aktualnaTemperaturaInput.classList.add("error-input");
        errorAktualnaTemperatura.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(modelInput.value, 2, 60)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(procentWykorzystanychZasobowInput.value)) {
        valid = false;
        procentWykorzystanychZasobowInput.classList.add("error-input");
        errorProcentWykorzystanychZasobow.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(procentWykorzystanychZasobowInput.value, 2, 60)) {
        valid = false;
        procentWykorzystanychZasobowInput.classList.add("error-input");
        errorProcentWykorzystanychZasobow.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(aktualnaTemperaturaInput.value)) {
        valid = false;
        aktualnaTemperaturaInput.classList.add("error-input");
        errorAktualnaTemperatura.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(aktualnaTemperaturaInput.value, 2, 60)) {
        valid = false;
        aktualnaTemperaturaInput.classList.add("error-input");
        errorAktualnaTemperatura.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }


    if (!checkRequired(aktualnaSzybkoscPrzekazaniaDanychInput.value)) {
        valid = false;
        aktualnaSzybkoscPrzekazaniaDanychInput.classList.add("error-input");
        errorAktualnaSzybkoscPrzekazaniaDanych.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(aktualnaSzybkoscPrzekazaniaDanychInput.value, 2, 60)) {
        valid = false;
        errorAktualnaSzybkoscPrzekazaniaDanych.classList.add("error-input");
        errorAktualnaSzybkoscPrzekazaniaDanych.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(typPoloczeniaInput.value)) {
        valid = false;
        typPoloczeniaInput.classList.add("error-input");
        errorTypPolaczenia.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(typPoloczeniaInput.value, 2, 60)) {
        valid = false;
        typPoloczeniaInput.classList.add("error-input");
        errorTypPolaczenia.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }


    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}