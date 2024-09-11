const express = require('express');
const cors = require('cors');
const app = express()
const { Pool } = require('pg')


app.use(cors())
app.use(express.json())


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo-list-db',
    password: 'tonystark',
    port: 5432
});





//retrieve all records in database
app.get('/retrieve_tasks', async(req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks ORDER BY id DESC')
        res.json(tasks.rows)
    }
    catch(error) {
        console.log('error', error)
    }
 
});


//filter done 
app.get('/filter_done', async(req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks where is_done = true')
        res.json(tasks.rows)
    }
    catch(error) {
        console.log('error', error)
    }
 
});

//filter Undone 
app.get('/filter_undone', async(req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks where is_done = false')
        res.json(tasks.rows)
    }
    catch(error) {
        console.log('error', error)
    }
 
});


//add task
app.post('/add_task/', async(req, res) => {
     let success = true
    let errorMessage = ''
    let validation = ''

    const {taskTitle,taskDescription,isDone}= req.body 

    try {
        const addQuery = 'INSERT INTO tasks (title,description) VALUES ($1, $2)'
        const values = [taskTitle ,taskDescription]
        const res = await pool.query(addQuery,values)
    }
    catch(err) {
        errorMessage = err.message
        success = false
        validation = 'Title must be unique'
    }
    finally {
        res.json({success,errorMessage,validation})
    }

});

//delete task
app.delete('/delete_task', async (req,res) => {
     const { id } = req.body
     let success = true
     let errorMessage = ''

    try {
        const values = [id]
        const deleteQuery = `DELETE FROM tasks WHERE id = $1`
        const deleteReq = await pool.query(deleteQuery,values)
    }
    catch(err) {
        errorMessage = err.message
        success = false
    }
    finally {
        res.json({success,errorMessage})
    }
})

//updating task
app.put('/update_task_input', async (req,res) => {
    let success = true
      let errorMessage = ''

    const {id,title,description} = req.body
    const {tasks} = req.body
  

    try {
        const values = [id,title ,description]
        const updateQuery = `UPDATE tasks SET title = $2,
        description = $3
        WHERE id = $1`
        const res = await pool.query(updateQuery,values)
    }
    catch(err) {
        success = false
        errorMessage = err.message
     
    }
    finally {
        res.json({success,errorMessage})
    }
}) 
//updating task is done
app.put('/update_done_button', async (req,res) => {
    let success = true
    let errorMessage = ''

    const {id,is_done} = req.body
    console.log(req.body)
    try {
        const values = [id,is_done]
        const updateQuery = `UPDATE tasks SET is_done = $2
        WHERE id = $1`
        const res = await pool.query(updateQuery,values)
    }
    catch(err) {
        success = false
        errorMessage = err.message
     
    }
    finally {
        res.json({success,errorMessage})
    }
})

//delete all tasks
app.delete('/delete_all_task', async (req,res) => {
     let success = true
    let errorMessage = ''
    try {
        const deleteAll = 'truncate tasks restart identity cascade'
        const res = await pool.query(deleteAll)
        console.log('delete all sucessful')
    }
    catch (err) {
        success = false
        errorMessage = err.message
    }
    finally { 
        res.json({success,errorMessage})
    }
})

app.listen(3001, () => console.log('server is running on port 3001'))