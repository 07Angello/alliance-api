const express = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createUser, loginUser, renewToken } = require('./authAppService');
const { jwtValidator } = require('../../middlewares/jwtValidator');

const router = express.Router();

/*
    User Authentication Routes
    host + /api/auth
*/

router.post(
    '/register',
    [
        check('name', 'The name is required.').not().isEmpty(),
        check('email', 'The email you entered is invalid.').isEmail(),
        check('password', 'The password should be more than 5 characters.').isLength({ min: 6 }),
        fieldsValidator
    ],
    createUser);

router.post(
    '/',
    [
        check('email', 'The email you entered is invalid.').isEmail(),
        check('password', 'The password is required.').not().isEmpty(),
        fieldsValidator
    ],
    loginUser);

router.get('/renew-token',
    jwtValidator,
    renewToken);


module.exports = router;
