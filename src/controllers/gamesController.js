import { connection } from "../database/db.js";

export async function getGames(req, res) {
  const { name } = req.query;
  
  try {
    if (name) {
      const {rows} = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories
         ON games."categoryId"=categories.id  WHERE games.name = $1 ILIKE $1 || '%' ;`,
        [name]
      );
        res.send(rows);
    } else {
      const {rows} = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId"= categories.id;`,    
      );
      console.log(rows)
      res.send(rows);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.game;
  console.log(res.locals.games)
  try {
    await connection.query(
      `INSERT INTO games 
      (name,image,"stockTotal", "categoryId", "pricePerDay") 
      VALUES 
      ($1,$2,$3,$4,$5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
}
