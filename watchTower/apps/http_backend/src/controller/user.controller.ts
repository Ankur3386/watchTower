import { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt"
import { client } from "@repo/dbcore/client";
import jwt from "jsonwebtoken"
import { signInSchema, signUpSchema } from "../util/type";
export const signUpUser=async(req:Request,res:Response,next:NextFunction)=>{
    const parsedData= signUpSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(400).json("send correct credentials")
    }
  try {
      const existingUser= await client.user.findUnique({
          where:{
              email:parsedData.data.email
          }
      })
      if(existingUser){
             return res.status(400).json("user already exist ")
      }
      const hashedPassword= await bcrypt.hash(parsedData.data.password,10); 
      
      const user= await client.user.create({
          data:{
              username:parsedData.data.username,
              password:hashedPassword,
              email:parsedData.data.email,
          }
      })
      if(!user){
             return res.status(400).json("error creating user")
      }
      
      return res.status(200).json("user signedUp successfully")
  } catch (error) {
      return res.status(500).json("Internet server error")
  }
}
export const signInUser=async(req:Request,res:Response,next:NextFunction)=>{
try {
        const parsedData= signInSchema.safeParse(req.body)
        if(!parsedData.success){
            return res.status(400).json("send correct credentials")
        }
        const user= await client.user.findFirst({
            where:{
                email:parsedData.data.email
            }
        })
         if(!user){
                 return res.status(400).json("user does not exist")
          }
    const password= await bcrypt.compare(parsedData.data.password,user.password)
    if(!password){
        return res.status(400).json("password is incorrect")
    }
    //generatee token
    const token = jwt.sign({
        id:user.id
    },process.env.jwtSecret as string,
    {
        expiresIn:'7d'
    })
    if(!token){
        return res.status(400).json("error generating token")
    }
    return res.status(200).json({"userId":user.id,"token":token,"message":"user signedIn successfully"})
} catch (error) {
     return res.status(500).json("internal server error");
}
}
//used to view all user projet
export const dashboard=async(req:Request,res:Response,next:NextFunction)=>{
 try {
       const project= await client.project.findMany({
           where:{
               userId:req.id
           },
           select:{
               id:true,
               name:true
           }
       })
       //findMany always return array
       if(project.length==0){
            return res.status(400).json("project does not exist first create a project");
       }
    return res.status(200).json({"data":project.map(x=>({
    projectId:x.id,
    projectName:x.name
    })),"message":"project fetched successfully"})
 } catch (error) {
     return res.status(500).json("internal server error");
 }
}