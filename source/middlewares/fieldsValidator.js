const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidator = (req, res = response, next) => {
    const error = validationResult(req);

    if ( !error.isEmpty() ) {
        const errorMessage = error.errors[0].msg;

        return res.status(203).json({
            OK: false,
            Message: errorMessage,
            Data: null
        });
    }

    next();
}

module.exports = {
    fieldsValidator
}
