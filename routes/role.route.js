const express = require('express');
const router = express.Router();
const roleControlles = require('../controllers/role.controller');
const auth = require('../middleware/auth');

router.post('/add', roleControlles.addRole)

module.exports = router;