import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
export const apiKeyVerificationMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
try {
    const apiKey= req.headers.authorization?.split(" ")[1];
    if(!apiKey){
         return res.status(400).json("api key not sent") 
    }
    const decodedApi= jwt.verify(apiKey,process.env.apiSecret as string) as JwtPayload
      if(!decodedApi){
         return res.status(401).json("wrong api Secret") 
      }
      req.projectId=decodedApi.id 
      next()
} catch (error) {
     return res.status(500).json("internal server error") 
}
}