const express = require("express");
// able to call express server functionalities with app
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // allows access to req.body

// -----ROUTES----- //
// get all todos from http://localhost:5000/todos, used when listing out todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id') // keeps elements in order from newest to oldest

    res.json(allTodos.rows) // displays all todos on page
  } catch (err) {
    console.error(err.message)
  }
})

// create a todo, USED FOR 'ADD' BUTTON
app.post("/todos", async (req, res) => {
  try {
    // destructure values
    const { description, importance } = req.body;
    const newTodo = await pool.query(
      // insert into [table_name] (column_name) let $1 = description
      "INSERT INTO todo (description, importance) VALUES ($1, $2) RETURNING *",
      [description, importance]
    );

    res.json(newTodo.rows[0]); // (used for postman to check results)
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo, USED WITH 'EDIT' BUTTON
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description, importance } = req.body
    // update table_name, set column_name where row id equals the id in the URL
    await pool.query('UPDATE todo SET description = $1, importance = $2 WHERE todo_id = $3', [description, importance, id])

    res.json('Todo was updated')
  } catch (err) {
    console.log(err.message)
  }
})

// delete a todo, USED WITH 'DELETE' BUTTON
app.delete('/todos/:id', async (req, res) => {
  try {
    const {id} = req.params
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])

    res.json('Todo was deleted')
  } catch (err) {
    console.error(err.message)
  }
})

// // get a single todo
// app.get('/todos/:id', async (req, res) => {
//   try {
//     const {id} = req.params // gets parameter from URL 
//     const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])

//     // get first item (mainly used for postman to check results)
//     res.json(todo.rows[0])
//   } catch (err) {
//     console.error(err.message)
//   }
// })

// setup app to run on http://localhost:5000/
app.listen(5000, () => {
  console.log("server is starting on port 5000");
});
