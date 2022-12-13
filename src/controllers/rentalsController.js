import {connection} from "../database/db.js"
import dayjs from "dayjs"

export async function getRentals(req,res){
const customerId = req.query
const gameId = req.query

try{
if (customerId) {
  
const rentalsCustomer = await connection.query(`SELECT rentals.*, customers.name AS customer, games.name AS game, categories.id AS "categoryId", categories.name AS "categoryName" FROM rentals 
JOIN customers ON customers.id = "customerId" 
JOIN games ON games.id = "gameId" 
JOIN categories ON categories.id = games."categoryId" WHERE customer.id=$1;`,[customerId])

const results = rentalsCustomer.rows.map((result)=>  {
  return {
    id:result.id,
    customerId: result.customerId,
    gameId:result.gameId,
    rentDate:result.rentDate,
    daysRented: result.daysRented,
    returnDate: result.returnDate,
    originalPrice: result.originalPrice,
    delayFee: result.delayFee,
    customer:{
      id:result.customersId,
      name:result.customersName,
    },
    game:{
      id:result.gamesId,
      name:result.gamesName,
      categoryId:result.categoriesId,
      categoryName:result.categoriesName,
    },
  }})

res.send(results)

}else if(gameId){

const rentalsGame = await connection.query(`SELECT rentals.*, customers.name AS customer, games.name AS game, categories.id AS "categoryId", categories.name AS "categoryName" FROM rentals 
JOIN customers ON customers.id = "customerId" 
JOIN games ON games.id = "gameId" 
JOIN categories ON categories.id = games."categoryId"WHERE game.id=$1;`,[gameId])

const results = rentalsGame.rows.map((result)=>  {
  return {
    id:result.id,
    customerId: result.customerId,
    gameId:result.gameId,
    rentDate:result.rentDate,
    daysRented: result.daysRented,
    returnDate: result.returnDate,
    originalPrice: result.originalPrice,
    delayFee: result.delayFee,
    customer:{
      id:result.customersId,
      name:result.customersName,
    },
    game:{
      id:result.gamesId,
      name:result.gamesName,
      categoryId:result.categoriesId,
      categoryName:result.categoriesName,
    },
  }})

res.send(results)
}else{

  `SELECT rentals.*, customers.name AS "customersName",
  games.name AS "gamesName" , categories.id AS "categoryId", categories.name AS "categoryName"
   FROM rentals 
   JOIN customers ON customers.id="customersId" 
   JOIN games ON games.id="gamesId" 
   JOIN categories ON categories.id = games."categoryId";`


  console.log("entrou")
    const allRent = await connection.query(`SELECT rentals.*, customers.name AS customer, games.name AS game, categories.id AS "categoryId", categories.name AS "categoryName" FROM rentals 
    JOIN customers ON customers.id = "customerId" 
    JOIN games ON games.id = "gameId" 
    JOIN categories ON categories.id = games."categoryId"`);
console.log("passou")
    const results = allRent.rows.map((result)=>  {
      return {
        id:result.id,
        customerId: result.customerId,
        gameId:result.gameId,
        rentDate:result.rentDate,
        daysRented: result.daysRented,
        returnDate: result.returnDate,
        originalPrice: result.originalPrice,
        delayFee: result.delayFee,
        customer:{
          id:result.customersId,
          name:result.customersName,
        },
        game:{
          id:result.gamesId,
          name:result.gamesName,
          categoryId:result.categoriesId,
          categoryName:result.categoriesName,
        },
      }});
console.log("saiu")
    res.send(results)
  }}
  catch(err){console.log(err)}

}
export async function postRentals(req,res){
const {customerId,gameId,daysRented} = res.locals.rental
console.log(res.locals.rental)
const rentDate = dayjs().format("YYYY-MM-DD");

const game = await connection.query(`SELECT * FROM games WHERE id = ${gameId};`)
const pricePerDay = game.rows[0].pricePerDay
console.log(pricePerDay,daysRented)
const originalPrice = pricePerDay*daysRented;

try{
console.log(customerId,gameId,rentDate,daysRented,null,originalPrice,null)
console.log("oi")
await connection.query(`
INSERT INTO rentals
("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") 
VALUES ($1,$2,$3,$4,$5,$6,$7);`, 
[customerId,gameId,rentDate,daysRented,null,originalPrice,null])

res.sendStatus(201)

}catch(err){
  console.log(err)}
}

export async function postReturnRentals(req,res){
const {id} = req.params
const deliverDate = dayjs().format("YYYY-MM-DD");
const delayFee = null
console.log(id)
if(!id){
  return res.send(404)
}

try{
  const rent = await connection.query(`SELECT * FROM rentals WHERE id=$1`,[id])
  const maxDate = new Date(rent.rentDate)
  const returnDate = new Date(deliverDate)
  
  
  if(deliverDate.isAfter(maxDate)){
    const difference  = Math.abs(returnDate - maxDate);
    const minutes = 1000*60*60*24;
    const daysDelay = difference/minutes

    const game = await connection.query(`SELECT * FROM games WHERE id = $1;`,[id])
    const pricePerDay = game.pricePerDay
    const delayFee = pricePerDay*daysDelay 
    return delayFee
  }

 

await connection.query(`UPDATE rentals (returnDate, delayFee) VALUES ($1,$2) WHERE id=${id};`, [returnDate, delayFee])
 res.sendStatus(200) 
}catch(err){console.log(err)}
} 

export async function deleteRentals(req,res){
  const {id} = req.params
  
  try{
  const rental =  await connection.query(`
  SELECT rentals.*,customers.id,customers.name,
  FROM rentals JOIN customers WHERE id=${id};`)
  if(rental.returnDate!==null){
    return res.send(400)
  }
  }catch(err){console.log(err)}
  
  try{
    await connection.query(`DELETE * FROM rentals WHERE id = $1;`,[id])
    res.send(200)
  }catch(err){
    console.log(err)}
}