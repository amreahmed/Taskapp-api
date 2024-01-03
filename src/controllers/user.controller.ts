import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import User from "../models/user-model";
import exp from "constants";
import { Types } from "mongoose";
import IUser from "../types";

const getUserToken=(_id:string|Types.ObjectId)=>{
    const authenticatedUserToken = jwt.sign({_id}, "express", {
        expiresIn:"7d"
    });
    return authenticatedUserToken;
}

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return response.status(409).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });
    return response.status(201).send({message:"User created successfully"});
  } catch (error) {
    console.log("Error in createUser", error);
    throw error;
  }
};


export const loginUser = async (request: Request, response: Response) => {
try{
  const {email, password}: IUser = request.body;
  const existingUser =await User.findOne({email});
  if(!existingUser){
    return response.status(404).send({message:"User does not exist"});
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    (
        await existingUser
    ).password
    );

    if(isPasswordCorrect) {
        const token = getUserToken(existingUser._id);
        return response.send({
            token,
            user:{
                email:existingUser.email,
                name:existingUser.name
            },
        });
        
       
    } else {

        return response.status(401).send({message:"Invalid credentials"});
    }
}catch(error){
    console.log("Error in loginUser", error);
    throw error;

}
}


