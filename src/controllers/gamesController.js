import { connection } from "../database/db.js";

export async function getGames(req, res) {
  const { name } = req.query;
  try {
    if (name) {
      const games = await connection.query(
        `SELECT games.*, 
        categories.name AS "categoryName" 
        FROM games 
        JOIN categories 
        ON "categoryId"=categories.id 
        WHERE games.name ILIKE $1 || '%' ;`,[name]
      );
      return res.send(games);
    } else {
      const allGames = await connection.query(
        `SELECT games.*, 
        categories.name AS "categoryName" 
        FROM games 
        JOIN categories 
        ON "categoryId"=categories.id ;`, [name]
      );
      return res.send(allGames);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.games;
  try {
    await connection.query(
      `INSERT INTO games 
      (name,image,"stockTotal", "categoryId", "pricePerDay") 
      VALUES 
      ($1,$2,$3,$4,$5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.send(201);
  } catch (err) {
    console.log(err);
  }
}
