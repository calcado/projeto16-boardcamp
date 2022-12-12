import { connection } from "../database/db";
import { gamesSchema } from "../models/gamesSchema.js";

export async function gamesSchemaValidation(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  const game = { name, image, stockTotal, categoryId, pricePerDay }
  try {
    const { error } = gamesSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
  } catch (err) {
    console.log(err);
  }
  try{
    const {rows} = await connection.query(`SELECT * FROM games WHERE name=${name}`);
    if(rows.length > 0){
        return res.send(409)
    }
    }catch(err){
    console.log(err)}
  res.locals.game = game
   
  next();
}
