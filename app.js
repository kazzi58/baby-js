const express = require('express');
const jwt = require('jsonwebtoken');
const port = 5000;
const DB = require('./db.js')
const route = require('./route/router');

const app = express();
app.use('/IVRWebServices', route)


// app.get('/api', (req, res) => {
//     res.json({
//         message: 'It worked!'
//     })
// });


// app.post('/api/posts', verifyToken, (req, res) => {

//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err) {
//             res.json({
//                 message: 'error in /api/posts api',
//                 err: err
//             })
//         } else {

//             res.json({
//                 message: 'Post has been created!',
//                 authData
//             });

//         }
//     });


// });

// app.post('/api/login', (req, res) => {

//     const user = {
//         id:1, 
//         username: 'test_user',
//         email: 'test@gmail.com'
//     }

//     jwt.sign({user}, 'secretkey', {expiresIn: '60s'}, (err, token) => {
//         res.json({
//             token
//         });
//     });
// });

// // Verify token
// function verifyToken(req, res, next){

//     //Get auth header value
//     const bearerHeader = req.headers.authorization
//     // const bearerHeader = req.headers[0]

//     console.log('test bearer header = ' + bearerHeader)

//     if (typeof bearerHeader !== 'undefined'){

//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];

//         req.token = bearerToken;

//         console.log("Bearer token = " + bearerToken)

//         next();

//     } else {

//         // Forbidden
//         res.json({
//             message: 'error in verify token'
//         })
//     }

// }

// getPackage()

app.listen(port, () => console.log('Server has started on port:' + port));
