const express = require('express');
const router = express.Router();

const auth = require('../../../auth');

const StatesController = require('../../../controllers/states');

router.use(StatesController.routerError)
  router.get('/', StatesController.getStates)
  .get("*", StatesController.invalidRoute)
  .put("*", StatesController.invalidRoute)
  .post("*", StatesController.invalidRoute)
  .patch("*", StatesController.invalidRoute);

module.exports = router;