const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users.js');

// POST /api/users
router.post('/', usersCtrl.create);

// POST /api/users/login
router.post('/login', usersCtrl.login);

module.exports = router;