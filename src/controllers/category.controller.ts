import { Request, Response, response } from "express";
import Category from "../models/category-model";
import { request } from "http";
import { ICategory } from "../types";
import { authRequest } from "../middleware";

export const getAllCategories = async (request: authRequest, response: Response) => {
  try {
    const {user} = request;
    const categories = await Category.find({
        user: user
    });
    return response.send(categories);
  } catch (error) {
    console.log("Error in getAllCategories", error);
    throw error;
  }
};

export const createCategory = async (request: authRequest, response: Response) => {
  try {
    const { name, color, icon, isEditable }: ICategory = request.body;
    const{user} = request;
    const category = await Category.create({
        name,
        color,
        icon,
        isEditable,
        user
        });

        response.send(category);
    
  } catch (error) {
    console.log("Error in createCategory", error);
    response.send({error: "something went wrong"});
    throw error;
  }
};



export const deleteCategory = async (
  request: authRequest,
  response: Response
) => {
  try {
    const id = request.params.id;
   await Category.deleteMany({_id:id});
   response.send({message:"Category deleted successfully"});
  } catch (error) {
    console.log("Error in deleteCategory", error);
    response.send({ error: "something went wrong" });
    throw error;
  }
};


export const updateCategory = async (request: authRequest, response: Response) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = request.body;
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          color,
          icon,
          isEditable,
          name,
        },
      }
    );

    response.send({ message: "Category updated successfully" });
  } catch (error) {
    console.log("Error in updateCategory", error);
    response.send({ error: "something went wrong" });
    throw error;
  }
};
