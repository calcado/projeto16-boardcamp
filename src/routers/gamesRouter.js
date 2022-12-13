import {Router} from "express";
import { getGames,postGames } from "../controllers/gamesController.js";
import { gamesSchemaValidation } from "../middleware/gamesSchemaValidationMiddleware.js";
const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games",gamesSchemaValidation, postGames);

export default gamesRouter;
