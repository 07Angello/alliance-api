const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const { createSatellite, getSatellites,calculateCoordinatesAndMessage, recalculateDistanceAndMessage } = require('./satelliteAppService');
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

router.get("/topsecret/", calculateCoordinatesAndMessage);

router.get("/topsecret_split/:satelliteName", recalculateDistanceAndMessage);

router.get("/info/:satelliteName", getSatellites);


module.exports = router;
