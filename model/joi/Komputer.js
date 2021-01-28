const BaseJoi = require('joi');
//const ExtensionJoi = require('joi-date-extensions');
//const Joi = BaseJoi.extend(ExtensionJoi);
const Joi = BaseJoi;

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
            case "date.format":
                err.message = `Pole powinno zawierać date w formati YYYY-MM-DD`;
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
    model: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    zaintstalowany_System_Operacyjny: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    typ_Komputera: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    data_Stworzenia: Joi.string()
        .required()
        .error(errMessages)
    /*,

data_Stworzenia: Joi.string()//date() //string() ?
    .format('yyyy-mm-dd')// .format('YYYY-MM-DD')
    .required()
    .error(errMessages)
*/
});


module.exports = elementSchema;