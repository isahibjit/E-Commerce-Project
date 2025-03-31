import pg from "pg"
import dotenv from "dotenv"
dotenv.config()
const db = new pg.Client({
    user : process.env.PG_USER,
    host : process.env.PG_HOST,
    database : process.env.PG_DATABASE,
    port : process.env.PG_PORT,
    password : process.env.PG_PASSWORD
})
db.connect()
.then(()=>{console.log("Connected to the database successfully !")})
.catch((err)=>{console.log("Error Connecting to the database",err.stack)})

export default db