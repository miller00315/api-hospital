const express = require('express');
const router = express.Router();

router.use('/pacientes', require('./pacientes'));
router.use('/professionais', require('./profissionais'));
router.use('/protocols', require('./protocols'));
router.use('/modules', require('./modules'));

module.exports = router;