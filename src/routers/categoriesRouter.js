import {Router} from "express";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategories);
categoryRouter.post("/categories", postCaregories);

export default categoryRouter;