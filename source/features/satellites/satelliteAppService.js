const { response } = require('express');
const Satellite = require('./Satellite');
const { getLocation } = require('../../helpers/getLocation');
const { getMessage } = require('../../helpers/getMessage');

const words = [
    ["this", "", "", "message", ""],
    ["", "is", "", "", "secret"],
    ["this", "", "a", "", ""]
];

const createSatellite = async(req, res = response) => {
    const satellite = new Satellite(req.body);

    try {
        const newSatellite = await satellite.save();

        return res.status(201).json({
            OK: true,
            Message: '',
            Data: newSatellite
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            OK: false,
            Message: 'An error has ocurred trying to create a satellite.',
            Data: null
        });
    }
}

const getSatellites = async(req, res = response) => {
    const satelliteName = req.params.satelliteName;
    const satelliteFilter = satelliteName == null || satelliteName == '' || satelliteName == 'ALL' ? '' : satelliteName;
    const regex = new RegExp(satelliteFilter, 'i');

    await Satellite.find({'name': regex})
                .sort({'name': 'ascending'})
                .exec((err, satellites) => {
                    if (err) {
                        return res.status(400).json({
                            OK: false,
                            Data: [],
                            Message: err.message,
                        });
                    }

                    if (!satellites || satellites.length === 0){
                        return res.status(200).json({
                            OK: true,
                            Data: [],
                            Message: 'There are no satellites to show.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: satellites,
                        Message: '',
                    });
                });
}

const calculateCoordinatesAndMessage = async(req, res = response) => {
    const secret = req.body;

    try {
        if (secret == null || secret.satellites == null || secret.satellites.length == 0) {
            return res.status(200).json({
                OK: true,
                Data: [],
                Message: 'There are no satellites to process.'
            });
        }

        const satelliteDistances = secret.satellites.map((satellite) => satellite.distance);
        const satellitesMessages = secret.satellites.map((satellite) => satellite.message);

        const calculatedCoordinates = getLocation(satelliteDistances);
        const decryptedMessage = getMessage(satellitesMessages);

        return res.status(200).json({
            OK: true,
            Data: {
                position: calculatedCoordinates,
                message: decryptedMessage
            },
            Message: '',
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            OK: false,
            Message: 'An error has ocurred trying to process the incoming satellites.',
            Data: null
        });
    }
}

const recalculateDistanceAndMessage = async(req, res = response) => {
    const satelliteName = req.params.satelliteName;
    const dataToUpdate = req.body;
    const satelliteFilter = satelliteName == null || satelliteName == '' || satelliteName == 'ALL' ? '' : satelliteName;
    const regex = new RegExp(satelliteFilter, 'i');

    try {
        const satellite = await Satellite.findOne({ 'name': regex });

        if (satellite === null) {
            return res.status(404),json({
                OK: false,
                Data: null,
                Message: `The service was not able to get the satellite with the name of ${satelliteName}`
            });
        }

        const satellites = await Satellite.find();

        const satelliteDistances = satellites.map((satellite) => satellite.distance);
        const satellitesMessages = words;

        const calculatedCoordinates = getLocation(satelliteDistances);
        const decryptedMessage = getMessage(satellitesMessages);


        return res.status(200).json({
            OK: true,
            Data: {
                position: calculatedCoordinates,
                message: decryptedMessage
            },
            Message: ''
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            OK: false,
            Message: `An error has ocurred trying to get the satellite information: ${error}`,
            Data: null
        });
    }
}


module.exports = {
    createSatellite,
    getSatellites,
    calculateCoordinatesAndMessage,
    recalculateDistanceAndMessage
}
