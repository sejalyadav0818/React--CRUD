require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const port = 8001;
require("./db/conn");
const router = require("./Routes/router");
app.use(express.json());
app.use(cors());
app.use(router);

// app.get("/",(req,res)=>{
//     res.send("server start !");
// })

//portss
app.listen(port, () => {
  console.log("db connected !", port);
});
