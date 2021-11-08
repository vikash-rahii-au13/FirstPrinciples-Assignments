import { Router } from 'express';
import jwt from 'jsonwebtoken';


module.exports = {
    verifyToken:(req,res,next)=>{
        const token = req.header('token');
    if(!token) return res.status(401).json({message: 'Please login!!', error:[],data:{}});
    try {
        const decoded = jwt.verify(token,'jwt_secret');
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(403).json({message: 'Invalid Token!!', error:[],data:{}});
    }
    }
// }
// const auth = function (req,res,next) {
//     const token = req.header('token');
//     if(!token) return res.status(401).json({message: 'Please login!!', error:[],data:{}});
//     try {
//         const decoded = jwt.verify(token,'jwt_secret');
//         req.user = decoded.user;
//         next();
//     } catch (e) {
//         console.error(e);
//         res.status(403).json({message: 'Invalid Token!!', error:[],data:{}});
//     }
// }

}