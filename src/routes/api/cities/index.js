const express = require('express');
const router = express.Router();

const auth = require('../../../auth');

const CitiesController = require('../../../controllers/cities');

router.use(CitiesController.routerError)
  .get('/stateCode', CitiesController.getCitiesByState)
  .get('*', CitiesController.invalidRoute)
  .patch('*', CitiesController.invalidRoute)
  .put('*', CitiesController.invalidRoute)
  .delete('*', CitiesController.invalidRoute)
  .post('*', CitiesController.invalidRoute);

module.exports = router;