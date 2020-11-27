
function validateForm() {
    const nazwaInput = document.getElementById('nazwa');
    const opisInput = document.getElementById('opis')
    const fotoInputInput = document.getElementById('fotoInput');

    const errorNazwa = document.getElementById('errorNazwa');
    const errorOpis = document.getElementById('errorOpis');
    const errorFotoInput = document.getElementById('errorFotoInput');

    const errorSummary = document.getElementById('errorSummary');

    resetErrors([nazwaInput, opisInput, fotoInputInput], [errorNazwa, errorOpis, errorFotoInput], errorSummary);

    var valid = true;

    if (!checkRequired(nazwaInput.value)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwaInput.value, 2, 60)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(opisInput.value)) {
        valid = false;
        opisInput.classList.add("error-input");
        errorSystemOperacyjny.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(opisInput.value, 2, 300)) {
        valid = false;
        opisInput.classList.add("error-input");
        errorOpis.innerText = "Pole powinno zawierać od 2 do 300 znaków";
    }

    if (!checkRequired(fotoInputInput.value)) {
        valid = false;
        fotoInputInput.classList.add("error-input");
        errorFotoInput.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}