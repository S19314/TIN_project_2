const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "number":
                err.message = `Pole nie jest liczbą`;
                break;
            default:
                break;
        }
    });
    return errors;
}


const elementSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    modelKomputera: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    nazwaElementa: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages),
    aktualnaTemperatura: Joi.number()
        .required()
        .error(errMessages),
    procentWykorzystanychZasobow: Joi.number()
        .required()
        .error(errMessages),
    aktualnaSzybkoscPrzekazaniaDanych: Joi.number()
        .required()
        .error(errMessages),
    typPolaczenia: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
});


module.exports = elementSchema;