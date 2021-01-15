const Joi = require('joi');
/*
const ImageExtension = require('joi-image-extension');
const Joi = BaseJoi.extend(ImageExtension);
*/

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
    nazwa: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    opis: Joi.string()
        .min(2)
        .max(1000)
        .required()
        .error(errMessages),
    fotoFile: Joi.object().keys({//.string()
        //.allowTypes(['png', 'jpg'])
        imagename: Joi.string().required()
    }).error(errMessages)
});


module.exports = elementSchema;