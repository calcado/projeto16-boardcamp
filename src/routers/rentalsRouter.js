import {Router} from "express";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", postRentals);
rentalsRouter.post("/rentals/:id/return", postReturnRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);
