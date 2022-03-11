const { model, Schema } = require('mongoose');

const SatelliteSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        default: 0,
    },
    message: {
        type: String,
        default: '',
        trim: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

module.exports = model('Satellite', SatelliteSchema);
