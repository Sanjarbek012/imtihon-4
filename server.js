const express = require("express");
const cors = require("cors");
const todoRouter = require("./router/todos.routes"); 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter); 

app.listen(PORT);