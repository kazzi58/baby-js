const express = require('express');
const route = express.Router();
const TestController = require('../controller/packageController')
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // support json encoded bodies
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // support encoded bodies
const authMiddleware = require('../middleware/authMiddleware')

route.get('/CheckSubscription', authMiddleware, TestController.testFun);
route.post('/registerService', authMiddleware, urlencodedParser, TestController.registerService);
route.post('/unSubscribeIVR', authMiddleware, urlencodedParser, TestController.unSubscribeIVR);
route.post('/endCall', authMiddleware, urlencodedParser, TestController.calculateFreeMinuteController);
route.get('/login', TestController.automateLogin);

module.exports = route;