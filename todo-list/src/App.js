import './App.css';
import { useEffect, useState } from 'react'
import  TaskInput  from './components/TaskInput'
import  TaskList  from './components/TaskList'
import  TaskDoneList  from './components/TaskDoneList'

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isClickeditButton, setisClickeditButton] = useState(false);
  const [editIdentifier, setEditIdentifier] = useState([]);
  

  const addTasksList = async () => {
    const task = {
      taskTitle: title,
      taskDescription: description,
      isDone: false
    }
    setTasks((prev)=> [...prev, task]);
    setTitle("");
    setDescription("");

    await fetch('http://localhost:3001/add_task', {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task) // 
    })
  }

  const removeList = async(deleteIndex) => {
    const filtered = tasks.filter((tasks,index) => index !== deleteIndex)
    setTasks(filtered);

    // await fetch('http://localhost:3001/delete_task', {
    //   method: "POST",
    //   headers :{
    //     "Content-Type": "application/json",
    //   },
    // })
  }

  const editList = (editId) => {
      setisClickeditButton(true)
      setEditIdentifier(editId);
  }

  const cancelButton = () => {
      setisClickeditButton(false)
  }

  const updateTask= () => {
    const updateTask = tasks.map((tasks,index) => editIdentifier === index ? {taskTitle:title,taskDescription:description } : tasks);
      setTasks(updateTask);
  }

  const doneButton = (markDone) => {
      setTasks(tasks[0].isDone=false)
  }

  useEffect(() => {
    const tasksList = async() => {
      const response = await fetch('http://localhost:3001/retrieve_tasks')
      const data = await response.json()
      console.log(data)
      setTasks(data)
    }
 
    tasksList();
  },[])
  
  return(

    <div style={{
      backgroundColor:'#252525', 
      height:'100vh', 
      widht:'100vh', 
      display: 'flex',
      gap:5
         }} 
    > 
        <div 
        style={{
          backgroundColor:'#FCFCF7', 
          height :'100%', 
          width: '28%'
        }}
        > 
          <TaskList 
            tasks={tasks}
            removeList={removeList}
            editList={editList}
            doneButton={doneButton}
          />

        </div>
        <div 
          style={{
            backgroundColor:'#FCFCF7',
            height :'100%', 
            width: '80%', 
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center', 
            flexDirection:'column', 
            gap:10
          }}
        >
          <TaskInput
            title={title} 
            description={description} 
            isClickeditButton={isClickeditButton} 
            cancelButton={cancelButton} 
            addTasksList={addTasksList} 
            setTitle={setTitle} 
            setDescription={setDescription} 
            updateTask={updateTask}
          
          />
        </div>

    </div>

  )

}

export default App;

