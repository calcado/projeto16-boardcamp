import {connection} from "../database/db.js"
import dayjs from "dayjs"

export async function getRentals(req,res){
const customerId = req.query
const gameId = req.query

if (customerId) {
const rentalsCustomer = await connection.query(`SELECT rentals.*, customers.name AS "customersName",
games.name AS "gamesName" , games."categoryId", games."categoryName", categories.id AS "categoriesId", categories.name AS "categoriesName"
 FROM rentals 
 JOIN customers ON customers.id="customersId" 
 JOIN games ON games.id="gamesId", 
 JOIN categories ON categories.id="categoriesId" WHERE customer.id=$1;`,[customerId])

const results = rentalsCustomer.map((result)=>  {
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

res.send(results)

}else if(gameId){
const rentalsGame = await connection.query(`SELECT rentals.*, customers.name AS "customersName",
games.name AS "gamesName" , games."categoryId", games."categoryName", categories.id AS "categoriesId", categories.name AS "categoriesName"
 FROM rentals 
 JOIN customers ON customers.id="customersId" 
 JOIN games ON games.id="gamesId", 
 JOIN categories ON categories.id="categoriesId" WHERE game.id=$1;`,[gameId])

const results = rentalsGame.map((result)=>  {
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

res.send(results)
}else{
try {
    const allRent = await connection.query(`SELECT rentals.*, customers.name AS "customersName",
    games.name AS "gamesName" , games."categoryId", games."categoryName", categories.id AS "categoriesId", categories.name AS "categoriesName"
     FROM rentals 
     JOIN customers ON customers.id="customersId" 
     JOIN games ON games.id="gamesId", 
     JOIN categories ON categories.id="categoriesId";`);

    const results = allRent.map((result)=>  {
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

    res.send(results)
  } catch (err) {
    console.log(err);
  }
}
}
export async function postRentals(req,res){
const {customerId,gameId,daysRented} = res.locals.rental

const rentDate = dayjs().format("YYYY-MM-DD");
const returnDate = null
const delayFee = null

const game = await connection.query(`SELECT * FROM games WHERE id = ${gameId};`)
const pricePerDay = game.pricePerDay
const originalPrice = pricePerDay*daysRented;

try{
await connection.query(`
INSERT INTO rentals
("customerId","gameId","rentDate",daysRented","returnDate","originalPrice","delayFee") 
VALUES ($1,$2,$3,$4,$5,$6,$7);`, 
[customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee])
res.sendStatus(201)
}catch(err){
  console.log(err)}
}

export async function postReturnRentals(req,res){
const {id} = req.params
const deliverDate = dayjs().format("YYYY-MM-DD");
const delayFee = null
if(!id){
  return res.send(404)
}

try{
  const rent = await connection.query(`SELECT * FROM rentals WHERE id=${id}`)
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