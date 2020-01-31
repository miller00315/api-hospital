const express = require('express');
const router = express.Router();

const auth = require('../../../auth');
const pacientesController = require('../../../controllers/pacientes');

router.use(pacientesController.routerError)

.get('/', auth.required, pacientesController.getPacientes)

.get('/:id_paciente', auth.required, pacientesController.getPacienteById)

.get('/:parametro/:valor', auth.required, pacientesController.getPacientesByParameter)

.post('/', auth.required, pacientesController.createPacientes)

.patch('/:id_paciente', auth.required, pacientesController.updatePacienteData)

.put('/:id_paciente', auth.required, pacientesController.updatePaciente)

.delete('/:id_paciente', auth.required, pacientesController.deletePacientes)

.get("*", pacientesController.invalidRoute)

.put("*", pacientesController.invalidRoute)

.post("*", pacientesController.invalidRoute)

.patch("*", pacientesController.invalidRoute)

.delete("*", pacientesController.invalidRoute);

module.exports = router;