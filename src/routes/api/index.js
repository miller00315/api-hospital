const express = require('express');
const router = express.Router();

router.use('/patients', require('./pacientes'));
router.use('/professionals', require('./profissionais'));
router.use('/protocols', require('./protocols'));
router.use('/modules', require('./modules'));
router.use('/cities', require('./cities'));
router.use('/genres', require('./genres'));
router.use('/states', require('./states'));
router.use('/protocolExecution', require('./protocolsExecution'));

module.exports = router;