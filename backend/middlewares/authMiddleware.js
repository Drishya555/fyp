import JWT from 'jsonwebtoken';

//Protected routes token base
export const requireSignIn = async(req,res,next) =>{
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(error){
        console.log(error)
    }

}  


import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({
        success: false,
        message: 'Invalid token',
      });
    }
    req.user = user;
    next(); 
  });
};

export default authenticateToken;
