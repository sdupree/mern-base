const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users.js');

// POST /api/users
router.post('/', usersCtrl.create);

// POST /api/users/login
router.post('/login', usersCtrl.login);

// GET /api/users/check-token
router.get('/check-token', usersCtrl.checkToken);

module.exports = router;