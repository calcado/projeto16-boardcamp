import {connection} from "../database/db.js";

export async function getCategories(req,res){

try{
  const {rows} = await connection.query("SELECT * FROM categories;");
  res.send(rows);  
}catch(err){
    console.log(err)}
    
}

export async function postCategories(req,res){
const {name} = res.locals.name
console.log(name)

try{
await connection.query("INSERT INTO categories (name) VALUES ($1);",[name]);
res.sendStatus(201)
}catch(err){
    console.log(err)}

}