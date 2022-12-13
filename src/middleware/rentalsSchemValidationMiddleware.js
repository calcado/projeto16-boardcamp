import { connection } from "../database/db.js";
import { rentalsSchema } from "../models/rentalsSchema.js";

export async function rentalsSchemaValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const rental = { customerId, gameId, daysRented };
 
  const { error } = rentalsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.send(errors).status(400);
  }


  try {
    const customer = await connection.query(
      `SELECT * FROM customers WHERE id=$1;`,[customerId]
    );
    if (customer.rows.length === 0) {
      return res.sendStatus(400);
    }

   
    const game = await connection.query(
      `SELECT * FROM games WHERE id=$1;`,[gameId]
    );
    if (game.rows.length === 0) {
      return res.sendStatus(400);
    }
    
    const avaiableGame = await connection.query(
      `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL `,[gameId]
    );
      if(avaiableGame.rows.length >= game.rows[0].stockTotal){
        return res.sendStatus(400)
      }


  } catch (err) {
    console.log(err);
  }


  res.locals.rental = rental;

  next();
}
