const express = require('express');
const router = express.Router();
const roleControlles = require('../app/controllers/role.controller');
const auth = require('../app/middleware/auth');

router.post('/add', roleControlles.addRole)

module.exports = router;