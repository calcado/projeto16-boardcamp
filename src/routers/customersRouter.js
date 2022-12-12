import {Router} from "express";
import { getCustomers, getCustomersById, postCustomers,putCustomers } from "../controllers/customersController.js";
import { customersSchemaValidation } from "../middleware/customersSchemaValidationMiddleware.js";
import { customersUpdateSchemaValidation } from "../middleware/customersUpdateSchemaValidationMiddleware.js";
const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", customersSchemaValidation ,postCustomers);
customersRouter.put("/customers/:id", customersUpdateSchemaValidation,putCustomers);

export default customersRouter;