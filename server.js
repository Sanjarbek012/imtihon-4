const express = require("express");
const cors = require("cors");
const todoRouter = require("./router/todos.routes"); // Nom o'zgardi
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Router ulanishi
app.use("/todos", todoRouter); // Endi /todos orqali kiriladi

app.listen(PORT);