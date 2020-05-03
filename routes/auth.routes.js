const { Router } = require('express');
const registration = require('../controllers/registration.controller');
const auth = require('../controllers/auth.controller');

const router = Router();

router.post('/registration', registration.middleware, registration.registration);

router.post('/login', auth.middleware, auth.auth,);

router.post('/refresh-token', auth.refreshTokens)

module.exports = router;
