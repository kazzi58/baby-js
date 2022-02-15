var express = require('express')
const jwt = require('jsonwebtoken')
const getPackage = require('../model/packageModel')
// var app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

class Controller {
    testFun = async (req, res) => {
        // req.body.id
        // req.params
        // req.query
        var msisdnParam = req.query['msisdn'];
        var serviceNameParam = req.query['serviceName'];
        var fetchedData = await getPackage.getFreeMinute(msisdnParam, serviceNameParam);
        // console.log('here');
        console.log(fetchedData);

        res.json({
            data: fetchedData
        })
    }

    registerService = async (req, res) => {

        // console.log('body = ' + req.body)
        var msisdnParam = req.body['msisdn'];
        var serviceNameParam = req.body['serviceName'];
        var packageNameParam = req.body['packageName'];

        var result = await getPackage.subscribeService(msisdnParam, serviceNameParam, packageNameParam);

        console.log('result - ' + result);

        if (result == 1) {
            res.send("SUCCESS!");
        }

        if (result == 0) {
            res.send("ALREADY SUBSCRIBED!");
        }

    }

    unSubscribeIVR = async (req, res) => {

        var msisdnParam = req.body['msisdn'];
        var serviceNameParam = req.body['serviceName'];

        var result = await getPackage.unSubscribe(msisdnParam, serviceNameParam);

        if (result == 1) {
            res.send("SUCCESSFULLY DELETED!");
        }

        if (result == 0) {
            res.send("NO MATCHED USER WITH GIVEN DETAILS!");
        }

    }

    calculateFreeMinuteController = async (req, res) => {

        var msisdnParam = req.body['msisdn'];
        var serviceNameParam = req.body['serviceName'];
        var callDurationParam = req.body['callDuration'];

        var result = await getPackage.calculateFreeMinuteModel(msisdnParam, serviceNameParam, callDurationParam);

        // if (result==1){
        //     res.send("SUCCESSFULLY DELETED!");
        // }

        // if (result==0){
        //     res.send("NO MATCHED USER WITH GIVEN DETAILS!");
        // }

        res.send(result)

    }

    automateLogin = async (req, res) => {

        const user = {
            id: 1,
            username: 'test_user',
            email: 'test@gmail.com'
        }


        jwt.sign({ user }, 'secretkey', { expiresIn: '300s' }, (err, token) => {
            res.json({
                token
            });
        });


        // else{
        //     res.send('Token not generated, credentials do not match! ')
        // }

    };

}


module.exports = new Controller;