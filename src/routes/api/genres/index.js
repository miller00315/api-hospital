const express = require('express');
const router = express.Router();

const auth = require('../../../auth');

const GenresController = require('../../../controllers/genres');

router.use(GenresController.routerError)
  .get('/', GenresController.getGenres)
  .get('*', GenresController.invalidRoute)
  .patch('*', GenresController.invalidRoute)
  .put('*', GenresController.invalidRoute)
  .delete('*', GenresController.invalidRoute)
  .post('*', GenresController.invalidRoute);

module.exports = router;

