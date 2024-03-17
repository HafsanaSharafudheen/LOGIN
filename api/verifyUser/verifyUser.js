import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log(token,"tokentokentokentokentokentokentoken")
    console.log(req.cookies,"req.cookiesreq.cookiesreq.cookiesreq.cookiesreq.cookiesreq.cookies")
    if(!token)
    return res.status(401).json("You need to Login")
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err)
   {
        return res.status(403).json("Token is not valid");
    }
        req.user=user;
        next();
    })
}