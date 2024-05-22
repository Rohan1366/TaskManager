var jwt = require('jsonwebtoken');

const Auth = (req,res,next)=>{
    try {
        const token=req.headers.authorization;
        console.log(token);
        if(token)
        {
            jwt.verify(token, 'Rohan', function(err, decoded) {
                console.log(decoded) 
                if(decoded)
                {
                    req.body.user_id=decoded.userid;
                    next();
                }
              });
        }else{
            res.send({"msg":"kindly login"});
        }

    } catch (error) {
        res.send({"msg":error.message});
    }
};

module.exports={Auth}