import mysql from 'mysql2'
import { configDotenv } from "dotenv";
configDotenv()

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "leave_sys"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error", err)
    } else {
        console.log("Connected")
    }
})

export default con;
