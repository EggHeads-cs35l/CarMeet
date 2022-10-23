const express = require("express");
const router = express.Router();
const signupTemp = require("../models/signup");
const recipTemp = require('../models/recipients');
const { response } = require("express");
const spawn = require("child_process").spawn;

module.exports = router;