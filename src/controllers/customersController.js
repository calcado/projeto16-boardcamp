import { connection } from "../database/db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (cpf) {
      const customers = await connection.query(
        `
        SELECT * FROM customers WHERE cpf ILIKE $1 || '%';`,
        [cpf]
      );
      res.send(customers);
    } else {
      const allCustomers = await connection.query(`SELECT * FROM customers;`);
      res.send(allCustomers);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getCustomersById(req, res) {
  const { id } = req.params;
  try {
    if (id) {
      const customer = await connection.query(
        `SELECT * FROM customers WHERE id = ${id}`);
        res.send(customer)
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;
  try {
    await connection.query(
      `INSERT INTO customers (name,phone,cpf,birthday)
      VALUES ($1,$2,$3,$4)`,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
}

export async function putCustomers(req, res) {
  try {
  } catch (err) {
    console.log(err);
  }
}
