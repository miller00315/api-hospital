const express = require('express');
const router = express.Router();

const auth = require('../../../auth');

const ModulesController = require('../../../controllers/modules');

router.use(ModulesController.routerError)
  .get('/', ModulesController.getModules)
  .get('/:protocol', ModulesController.getModulesByProtocol)
  .get("*", ModulesController.invalidRoute)
  .put("*", ModulesController.invalidRoute)
  .post("*", ModulesController.invalidRoute)
  .patch("*", ModulesController.invalidRoute)
  .delete("*", ModulesController.invalidRoute);

module.exports = router;