const express = require('express');
const router = express.Router();
const routeControlles = require('../app/controllers/route.controller');
const auth = require('../app/middleware/auth');

router.post('/addRoute', routeControlles.addRoute)
router.post("/addRole", auth, routeControlles.addRole);
router.get("/allRoutes", auth, routeControlles.getAllRouts);
router.patch("/deleteRoute",auth, routeControlles.deleteRoute);
router.patch("/deleteRole", auth, routeControlles.deleteRole);

module.exports = router;