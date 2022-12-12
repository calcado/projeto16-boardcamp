import { connection } from "../database/db.js";
import {customersSchema} from "../models/customersSchema.js"

export async function customersSchemaValidation(req,res,next){
const { name, phone, cpf, birthday} = req.body;
const customer = { name, phone, cpf, birthday}

const {error} = customersSchema.validate(req.body, {abortEarly:false}) 
if(error){
    const errors = error.details.map((detail)=>detail.message);
    return res.status(400).send(errors);
}
try{
const {row} = await connection.query(`SELECT * FROM customers WHERE cpf = ${cpf}`)
if(row.length > 0){
    res.sendStatus(409)
}
}catch(err){console.log(err)}

res.locals.customer = customer

next();
}