import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getCategoryById
} from "../controllers/category.controller";
import {authenicationMiddleware} from "../middleware";





const categoryRoutes = express.Router();
categoryRoutes.use(authenicationMiddleware);
categoryRoutes.route("/").get(getAllCategories)
categoryRoutes.route("/create").post(createCategory);
categoryRoutes.route("/delete/:id").delete(deleteCategory);
categoryRoutes.route("/:id").get(getCategoryById);
categoryRoutes.route("/update").put(updateCategory);



export default categoryRoutes;
