import {Router} from "express";
import { getCategories,postCategories } from "../controllers/categoriesController.js";
import { categoriesSchemaValidation } from "../middleware/categoriesSchemaValidationMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", categoriesSchemaValidation, postCategories);

export default categoriesRouter;