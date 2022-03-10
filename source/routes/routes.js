const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';


// Importing Routes
const authentication = require('../features/authentication/authRoutes');
const satellites = require('../features/satellites/satelliteRoutes');

// Implementing Routes
router.use(`${apiPrefix}/auth`, authentication);
router.use(`${apiPrefix}/satellites`, satellites);

module.exports = router;
