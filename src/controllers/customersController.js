import { connection } from "../database/db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (cpf) {
      const {rows} = await connection.query(
        `
        SELECT * FROM customers WHERE cpf ILIKE $1 || '%';`,
        [cpf]
      );
      res.send(rows);
    } else {
      const {rows} = await connection.query(`SELECT * FROM customers;`);
      res.send(rows);
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
  const {name, phone, cpf, birthday} = res.locals.customer 
  const {id} = req.params
  try {
    await connection.query(`
    UPDATE customers 
    SET name=${name}
    phone = ${phone} 
    cpf = ${cpf} 
    birthday = ${birthday}
    WHERE id = ${id}`)
    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
}
