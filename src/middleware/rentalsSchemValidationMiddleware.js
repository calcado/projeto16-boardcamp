import { connection } from "../database/db.js";
import {rentalsSchema} from "../models/rentalsSchema.js"

export async function rentalsSchemaValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const rental = { customerId, gameId, daysRented } 
  
  const {error} = rentalsSchema.validate(req.body, {abortEarly:false})
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.send(errors).status(400);
  }

  try {
    const { rows } = await connection.query(
      `SELECT * FROM customers WHERE id=${customerId};`
    );
    if (rows.length) {
      return res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const { rows } = await connection.query(
      `SELECT * FROM games WHERE id=${gameId};`
    );
    if (rows.length > 0) {
      return res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
  }
  if (daysRented <= 0) {
    return res.sendStatus(400);
  }

  try{
  const avaiableGame = await connection.query(`SELECT * FROM rentals WHERE "gameId" = ${gameId} AND "returnDate" IS NULL `)
  const game = await connection.query(`SELECT * FROM games WHERE id=${gameId}`)
  const stock = game.stockTotal
  if(avaiableGame.length >= stock){
    return res.sendStatus(400)
  }
  }catch(err){console.log(err)}

res.locals.rental = rental
next();
}
