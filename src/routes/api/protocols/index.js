const express = require('express');
const router = express.Router();

const auth = require('../../../auth');
const protocolsController = require('../../../controllers/protocols');

router.use(protocolsController.routerError)
.get('/', auth.required, protocolsController.getProtocols)
.get("*", protocolsController.invalidRoute)
.put("*", protocolsController.invalidRoute)
.post("*", protocolsController.invalidRoute)
.patch("*", protocolsController.invalidRoute);

module.exports = router;