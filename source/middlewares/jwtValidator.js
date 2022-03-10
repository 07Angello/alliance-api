const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = ( req, res = response, next ) => {
    // x-token in request header
    const token = req.header('x-token');

    if ( !token ) {
        return res.json({
            Data: null,
            Message: 'There is no token in the request.'
        });
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch ( error ) {
        return res.status(500).json({
            Data: null,
            Message: 'Token is not valid.'
        });
    }

    next();
}

module.exports = {
    jwtValidator
}
