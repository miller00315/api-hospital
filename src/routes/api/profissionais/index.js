const express = require('express');
const router = express.Router();

const auth = require('../../../auth');
const profissionaisController = require('../../../controllers/profissionais');

router.use(profissionaisController.routerError)

.get('/', auth.required, profissionaisController.getProfissionais)

.post('/', auth.optional, profissionaisController.createProfissionais)

.post('/login', auth.optional, profissionaisController.loginProfissionais)

.post('/logout', auth.required, profissionaisController.logoutProfissionais)

.get('/current', auth.required, profissionaisController.currentProfessionais)

.delete('/:id_profissional', auth.required, profissionaisController.deleteProfessionais)

.get("*", profissionaisController.invalidRoute)

.put("*", profissionaisController.invalidRoute)

.post("*", profissionaisController.invalidRoute)

.patch("*", profissionaisController.invalidRoute);

module.exports = router;