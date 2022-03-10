const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createSatellite, getSatellites } = require('./satelliteAppService');
const { jwtValidator } = require('../../middlewares/jwtValidator');

const router = Router();
router.use( jwtValidator );

/*
    Satellite Routes
    host + /api/satellites
*/

router.post('/',
    [
        check("name", "The Satellite Name can not be null or empty.").not().isEmpty(),
        check("x", "Coordinate X should be provided.").isNumeric(),
        check("y", "Coordinate Y should be provided.").isNumeric(),
        fieldsValidator
    ],
    createSatellite);

router.get("/:satelliteName", getSatellites);

router.get("/topsecret", getSatellites);


module.exports = router;
