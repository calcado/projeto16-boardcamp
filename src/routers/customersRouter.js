import {Router} from "express";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", postCustomers);
customersRouter.put("/customers/:id", putCustomers);

export default customersRouter;