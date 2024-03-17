<<<<<<< HEAD
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(token, "tokentokentokentokentokentokentoken");
    console.log(
      req.cookies,
      "req.cookiesreq.cookiesreq.cookiesreq.cookiesreq.cookiesreq.cookies"
    );
  if (!token) {
      return res.status(401).json("You need to Login");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token is not valid");
      return res.status(403).json("Token is not valid");
    }
    console.log("Token success");
    req.user = user;
    next();
  });
};
=======
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
>>>>>>> 527880ad4e985b4907fcc6e405e6dc2d7a577e10
