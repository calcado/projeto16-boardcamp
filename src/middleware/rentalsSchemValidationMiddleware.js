
import {rentalsSchema} from "../models/rentalsSchema.js"

export async function rentalsSchemaValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const rental = { customerId, gameId, daysRented } 
  try{
  const existCustomer = await connection.query(
    `SELECT * FROM customers WHERE id=${customerId};`
  );
  if (!existCustomer) {
    return res.sendStatus(400);
  }
    }catch(err){console.log(err)}
  const {row} = await connection.query(
    `SELECT * FROM games WHERE id=${gameId};`
  );
  if (row.length > 0) {
    return res.sendStatus(400);
  }

  if (daysRented <= 0) {
    return res.sendStatus(400);
  }

  const {error} = rentalsSchema.validate(req.body, {abortEarly:false})
  if(error){
    const errors = error.details.map((detail)=>detail.message);
    return res.send(errors).status(400)
  }

res.locals.rental = rental
next();
}
