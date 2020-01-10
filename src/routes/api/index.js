const express = require('express');
const router = express.Router();

router.use('/pacientes', require('./pacientes'));
router.use('/profissionais', require('./profissionais'));

module.exports = router;