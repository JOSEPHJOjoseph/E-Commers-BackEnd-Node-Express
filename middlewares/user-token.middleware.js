
const jwt = require('jsonwebtoken');
const userTokenValidator = async (req, res, next) => {
    try {
        const token = req.header.authorization;
        if (token) {
            const decodedToken = await jwt.verify(token, "you cant steel my password");
            if (decodedToken) {
                next();
            }
            else {
                res.status(401).send("invalid token");
            }
        }
    }
    catch {
        console.log(error);
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401).send(" token---expired");
        }
        else{
            res.status(500).send({error:'internal server---Error'});
        }
    }

}; 
module.exports = userTokenValidator;