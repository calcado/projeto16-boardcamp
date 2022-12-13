import { connection } from "../database/db.js";
import { categoriesSchema } from "../models/categoriesSchema.js";

export async function categoriesSchemaValidation(req, res, next) {
  const { name } = req.body;
  console.log(name)
  const { error } = categoriesSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const { rows } = await connection.query(
      `SELECT * FROM categories WHERE name = $1`,[name]
    );
    if (rows.length > 0) {
      return res.send(409);
    }console.log("sai")
  } catch (err) {
    console.log(err);
  }

  console.log(name)

  res.locals.name = {name};
  next();
}
