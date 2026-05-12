const uuid = require("uuid");
const { read_file, write_file } = require("../fs/file-manager");

const DB_FILE = "todo.json";

// get all

const getAllTodos = async (req, res) => {
    try {
        const todos = read_file(DB_FILE);
        res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//getone

const getOneTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todos = read_file(DB_FILE);
        const todo = todos.find((t) => t.id == id);

        if (!todo) return res.status(404).json({ message: "Todo topilmadi" });
        res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// add todo

const addTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todos = read_file(DB_FILE);

        const newTodo = {
            id: uuid.v4(),
            title,
            completed: completed
        };

        todos.push(newTodo);
        write_file(DB_FILE, todos);

        res.status(201).json({ message: "Todo qo'shildi", data: newTodo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// updete todo

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todos = read_file(DB_FILE);
        const index = todos.findIndex((t) => t.id == id);

        if (index === -1) return res.status(404).json({ message: "Todo topilmadi" });

        todos[index] = {
            ...todos[index],
            title: title || todos[index].title,
            completed: completed !== undefined ? completed : todos[index].completed
        };

        write_file(DB_FILE, todos);
        res.status(200).json({ message: "Todo yangilandi", data: todos[index] });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// toggle status

const toggleTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const todos = read_file(DB_FILE);
        const todo = todos.find((t) => t.id == id);

        if (!todo) return res.status(404).json({ message: "Todo topilmadi" });

        todo.completed = !todo.completed;
        write_file(DB_FILE, todos);

        res.status(200).json({
            message: "Status o'zgardi",
            completed: todo.completed
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// count completed todos
const countCompletedTodos = async (req, res) => {
    try {
        const todos = read_file(DB_FILE);
        const completedCount = todos.filter(t => t.completed === true).length;
        res.status(200).json({
            total: todos.length,
            completed_count: completedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// clear completed todos 

const clearCompletedTodos = async (req, res) => {
    try {
        const todos = read_file(DB_FILE);
        const remainingTodos = todos.filter(t => t.completed === false);

        write_file(DB_FILE, remainingTodos);
        res.status(200).json({
            message: "Bajarilgan vazifalar o'chirildi",
            remaining: remainingTodos.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        let todos = read_file(DB_FILE);
        const newTodos = todos.filter(t => t.id !== id);
        write_file(DB_FILE, newTodos);
        res.status(200).json({ message: "O'chirildi" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTodos,
    getOneTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    countCompletedTodos,
    clearCompletedTodos
};