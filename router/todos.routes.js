const { Router } = require("express");
const { 
    getAllTodos, 
    getOneTodo, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleTodoStatus, 
    countCompletedTodos, 
    clearCompletedTodos 
} = require("../controller/todos.controller");

const todoRouter = Router();

todoRouter.get("/get_all", getAllTodos);
todoRouter.get("/get_one/:id", getOneTodo);
todoRouter.post("/add", addTodo);
todoRouter.put("/update/:id", updateTodo);
todoRouter.delete("/delete/:id", deleteTodo);
todoRouter.patch("/toggle_status/:id", toggleTodoStatus);
todoRouter.get("/count_completed", countCompletedTodos);
todoRouter.delete("/clear_completed", clearCompletedTodos); 

module.exports = todoRouter;