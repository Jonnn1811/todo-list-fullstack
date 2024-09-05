import './App.css';
import { useEffect, useState } from 'react'
import  TaskInput  from './components/TaskInput'
import  TaskList  from './components/TaskList'


function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isClickeditButton, setisClickeditButton] = useState(false);
  const [editIdentifier, setEditIdentifier] = useState();
  const [isInputValidation, setInputValidation] = useState(false); 
  
  //retrieving all records in database
  const tasksList = async() => {
    const response = await fetch('http://localhost:3001/retrieve_tasks')
    const data = await response.json()
    console.log(data)
    setTasks(data)
  }
  
 // const handdle


  //add task
  const addTasksList = async () => {
    const task = {
      taskTitle: title,
      taskDescription: description,
      isDone: false,
    }
    setTitle("");
    setDescription("");
      if(!title && !description){
        setInputValidation(true)
      }
      else {
        await fetch('http://localhost:3001/add_task', {
          method: "POST",  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task) // INPUT FROM CLIENT
        })
        setInputValidation(false)
      }
    tasksList();
  }

  
  //updating task
  const updateTask = async() => {
    const task = {id:editIdentifier,title:title,description:description}
    if(title && description){
      try{
        await fetch (`http://localhost:3001/update_task_input`, {
          method:"PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(task)
        })
        setInputValidation(false)
      }
      catch(err){
        console.log(err)
      }
    }else {
      setInputValidation(true)
    }
      tasksList();
  }
  //task done and undone
  const isTaskDone = async(doneId) => {

    const task = {id:doneId,is_done:true}

    try {
      const response = await fetch (`http://localhost:3001/update_done_button`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
      })
      if (response.ok){ 
        tasksList();
      }
      else{
        throw new Error(`Network Failed, can't update`)
      }
    }
    catch (err){
      console.log(err.message)
    }
  
  }

  const isTaskUndone = async(doneId) => {

    const task = {id:doneId,is_done:false}

    try {

      const response = await fetch (`http://localhost:3001/update_done_button`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
      })
      
      if (response.ok){ 
        tasksList();
      }
      else{
        throw new Error(`Network Failed, can't update`)
      }
    }
    catch (err){
      console.log(err.message)
    }
  
  }
 
  //delete task
  const removeList = async(deleteIndex) => {

    await fetch(`http://localhost:3001/delete_task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify(tasks[deleteIndex])
    })
    tasksList();
  }

  //update button will appear
  const editList = (task) => {
    setisClickeditButton(true)
    setEditIdentifier(task.id)
    setDescription(task.description)
    setTitle(task.title)
    const editTask =tasks.map((item,index) => {
      if(item.id === task.id){
        // setTasks((prev)=> [...prev, task])
        return {...item, isEdit:true}
      } else {
        return item
      }
    })
   //setTasks((prev)=> [...prev, task]);
    console.log(editTask)
    
  }
//add button will appear
  const cancelButton = () => {
    setisClickeditButton(false)
  }

  useEffect(() => {
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
          width: '35%'
        }}
        > 
          <TaskList 
            tasks={tasks}
            removeList={removeList}
            editList={editList}
            isTaskDone={isTaskDone}
            isTaskUndone={isTaskUndone}
            setisClickeditButton={setisClickeditButton}
            isClickeditButton={isClickeditButton}
          />

        </div>
        <div 
          style={{
            backgroundColor:'#FCFCF7',
            height :'100%', 
            width: '65%', 
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center', 
            flexDirection:'column', 
            gap:10
          }}
        >
          {isInputValidation && 
            <p style={{color:'red', font:'arial', fontWeight:'bold'}}>
            Title and Description must be required</p>
          }
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

