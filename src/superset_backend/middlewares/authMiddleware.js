const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

   if(authHeader){
    const token = authHeader.split(' ')[1]
   
    const jwtSecret = "OgRnofb/vLsLQ_{aMXC<i83;t%y:OZR](M|q.<V%8<?C0(FKm7F,^uaE:,WLFK";
         jwt.verify(token, jwtSecret, (err, user) => {
            if(err) {
                return res.sendStatus(403)

            }
            req.user = user
          next()
         } )
            
        } else  {
            res.status(401).json({ message: 'invalid Token' })
        }
}