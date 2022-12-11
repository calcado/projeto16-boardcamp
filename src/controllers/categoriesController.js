import {connection} from "../database/db.js";

export async function getCategories(req,res){
try{
  const {rows} = await connection.query("SELECT * FROM categories;");
  res.send(rows);  
}catch(err){
    console.log(err)}
    
}

export async function postCategorioes(req,res){
const {name} = req.body

try{
await connection.query("INSERT INTO categories (name) VALUES ($1);",[name]);
}catch(err){
    console.log(err)}

}