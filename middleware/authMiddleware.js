const jwt = require('jsonwebtoken')


const authorize = async (req, res, next) => {
    const secretKey = 'secretkey'
    try {
        const authHeader = req.headers.authorization
        const bearer = 'Bearer '
        if (!authHeader || !authHeader.startsWith(bearer)) {
            return ResponseUtils.respondError(res, constants.HTTP_401, constants.UNAUTH_REQ)
        }
        const token = authHeader.replace(bearer, '');
        const jwtPayload = jwt.verify(token, secretKey)

        if (jwtPayload.user.username == 'test_user' && jwtPayload.user.email == 'test@gmail.com'){
            return next();
        }
        // const entity = await CoreModel.findByIdRole(
        //     jwtPayload.user_id,
        //     jwtPayload.role
        // )
        // if (!entity) {
        //     return ResponseUtils.respondError(res, constants.HTTP_401, constants.UNAUTH_REQ)
        // }
        // req.currentUser = entity
        

    } catch (e) {
        // e.status = 401;
        // return ResponseUtils.respondError(res, constants.HTTP_401, constants.UNAUTH_REQ)
        res.send(e)
    }
}

module.exports = authorize;
