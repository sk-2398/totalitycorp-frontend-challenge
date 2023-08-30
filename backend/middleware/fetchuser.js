var jwt = require('jsonwebtoken')
const JWTsecreteKey = "ojakwfo43f9$nkwf"

const fetchuser=(req,res,next)=>{

    // get the user from jwt token and add id to request object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Invalid authentication"})
    }
    try{

        const data=jwt.verify(token,JWTsecreteKey)
        req.user=data.user;
        next()
    }
    catch(error){
        res.status(401).send({error:"Invalid authentication"})

    }
}





module.exports = fetchuser
