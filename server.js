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



app.get('/retrieve_tasks', async(req, res)  =>  {
    try {
        const tasks = await pool.query('SELECT * FROM public.tasks ORDER BY id ASC')
        res.json(tasks.rows)
    }
    catch(error) {
        console.log('error', error)
    }
 
});

app.post('/add_task', async(req, res) => {
    const {taskTitle,taskDescription,isDone}= req.body 
    let success = true

    try{
        const addQuery = 'INSERT INTO tasks (title,description) VALUES ($1, $2)'
        const values = [taskTitle ,taskDescription]
        const res = await pool.query(addQuery,values)
    }
    catch(err)
    {
        console.log(err)
        success = false
    }
    finally{
        res.json({success})
    }

});


// app.post('/delete_task', async (req,res) => {
//     try{
//         const deleteQuery = 'DELETE FROM tasks WHERE id = ?'
//         const values = [id]
//     }
//     catch(err) {
//     }
// })

app.listen(3001, () => console.log('server is running on port 3001'))