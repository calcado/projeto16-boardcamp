import {Router} from "express";
import {getRentals,postRentals, postReturnRentals, deleteRentals} from "../controllers/rentalsController.js"
import {rentalsSchemaValidation} from "../middleware/rentalsSchemValidationMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals",rentalsSchemaValidation, postRentals);
rentalsRouter.post("/rentals/:id/return", postReturnRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;