import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { string } from "zod";
export const userMiddleware= async(req:Request,res:Response,next:NextFunction)=>{
const token = req.headers.authorization?.split(' ')[1]
if(!token){
    return res.status(401).json("token not received")
}
try {
    const decondedToken= jwt.verify(token,process.env.jwtSecret as string) as JwtPayload
    if(!decondedToken){
         return res.status(400).json("token sent is incorrect")
        }
        req.id=decondedToken.id
      next()
} catch (error) {
    return res.status(500).json("internal server error") 
}

}