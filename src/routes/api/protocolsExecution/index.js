const express = require('express');
const router = express.Router();

const auth = require('../../../auth');

const protocolExectutionController = require('../../../controllers/protocolExecution');

router.use(protocolExectutionController.routerError)
  .get('/patient', auth.required, protocolExectutionController.getByPatientId)
  .get('/protocol', auth.required, protocolExectutionController.getByProtocolCode)
  .get('/patient_protocol', auth.required, protocolExectutionController.getByPatientId_ProtocolCode)
  .post('/', auth.required, protocolExectutionController.create)
  .patch('/module',auth.required, protocolExectutionController.update)
  .patch('/finish',auth.required, protocolExectutionController.finish)
  .patch('/restart',auth.required, protocolExectutionController.restart)
  .delete('/', auth.required, protocolExectutionController.delete)
  .get("*", protocolExectutionController.invalidRoute)
  .put("*", protocolExectutionController.invalidRoute)
  .post("*", protocolExectutionController.invalidRoute)
  .patch("*", protocolExectutionController.invalidRoute)
  .delete("*", protocolExectutionController.invalidRoute);

module.exports = router;