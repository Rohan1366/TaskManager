const express=require("express");
const { connection } = require("./db");
const { UserRouter } = require("./Routes/Userroute");
var cors = require('cors');
const { TodoRouter } = require("./Routes/TodoRouter");
const { Auth } = require("./Middleware/Auth");
const colors = require('colors');
const dotenv = require('dotenv')

//configure env
dotenv.config();

const app=express();

connection();

app.use(express.json());
app.use(cors());

app.use("/user",UserRouter);

app.use(Auth);

app.use("/todo",TodoRouter);


app.get("/",(req,res)=>{
    res.send("Home page");
});


const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});