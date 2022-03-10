const { response } = require('express');
const Satellite = require('./Satellite');

const createSatellite = async(req, res = response) => {
    const satellite = new Satellite(req.body);

    try {
        const newSatellite = await satellite.save();

        res.status(201).json({
            OK: true,
            Message: '',
            Data: newSatellite
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
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
                            Message: 'There are no customers to show.'
                        });
                    }

                    return res.status(200).json({
                        OK: true,
                        Data: satellites,
                        Message: '',
                    });
                });
}

const calculateCoordinates = (req, res = response) => {
    const secret = req.body;


}


module.exports = {
    createSatellite,
    getSatellites,
    calculateCoordinates,
}
