const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';


// Importing Routes
const authentication = require('../features/authentication/authRoutes');

// Implementing Routes
router.use(`${apiPrefix}/auth`, authentication);module.exports = router;

module.exports = router;
