import './App.css';
import { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import TaskDetails from './components/TaskDetails'
import Modal from './components/Modal';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isClickeditButton, setisClickeditButton] = useState(false);
    const [editIdentifier, setEditIdentifier] = useState();
    const [storeArrayTask, setstoreArrayTask] = useState([]);
    const [isTasksClick, setIsTaskClick] = useState(false);
    const [taskObjDetails, setTaskObjDetails] = useState({});
    const [isDisable, setIsDisable] = useState(false)
    const [homePageToggle, setHomePageToggle] = useState(true)
    const [taskListToggle, setTaskListToggle] = useState(true)
    const [errorMessages, setErrorMessage] = useState('')
    const [isClickAllTask, setIsClickAllTask] = useState(false)
    const [isClickDone, setIsClickDone] = useState(false)
    const [isClickUndone, setIsClickUndone] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleHomepage = () => {
        setHomePageToggle(false)
            if (tasks.length !== 0){
                setTaskListToggle(false);
            }
            
    }


    //tasks Selector 
    const taskSelectorDetails = (task) => {
        setErrorMessage('')
        if (isClickeditButton === false) {
            if (isTasksClick === false) {
                setTaskObjDetails(task)
                setIsTaskClick(true)
            }
            else {
                setIsTaskClick(false)
            }
        }
    }

    //retrieving all records in database
    const tasksList = async () => {
        const response = await fetch('http://localhost:3001/retrieve_tasks');
        const data = await response.json();
        setTasks(data);
    }

    //retrieving all done in database 
    const filterDone = async () => {
        setErrorMessage('')
        const response = await fetch('http://localhost:3001/filter_done');
        const data = await response.json();
        console.log(data)
        if(data.length !== 0) {
            setTasks(data);
        } 
        else {
            toast.error('No task is complete. Please finish it.')
            tasksList();
        }
        
    }

    //retrieving all done in database 
    const filterUndone = async () => {
        setErrorMessage('')
        const response = await fetch('http://localhost:3001/filter_undone');
        const data = await response.json();

        if(data.length !== 0) {
            setTasks(data);
        } 
        else {
            toast.success('All your task is done, Good Job!')
            tasksList();
        }
    }


    //add task
    const addTasksList = async () => {
        setErrorMessage('')
        const task = {
            taskTitle: title,
            taskDescription: description,
            isDone: false,
        }
        try {
            const response = await fetch('http://localhost:3001/add_task', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task) // INPUT FROM CLIENT
            });
            const data = await response.json()
            if(!data.success){
                setErrorMessage('Title must be unique')
            } else {
                setDescription("");
                setTitle("");
            }
        }
        catch (err) {
            console.log(err)
        }
        
        const trimmedTitle = title.trim();
        const trimmeddescription = description.trim();
         if (title.length === 0 || description.length === 0)  {
            setErrorMessage('Title and Description must be required')
        } 
        else if (trimmedTitle === '' && trimmeddescription === '') {
            setErrorMessage('Please enter a valid input. White spaces are not allowed.')
        } 
        else if (title.length >= 255 || description >= 255){
            setErrorMessage('Please shorten your input and try again, 255 characters are allowed')
        }
        tasksList();
    }


    //updating task
    const updateTask = async () => {
        // setDescription("");
        // setTitle("");
        const task = {
            id: editIdentifier,
            title: title,
            description: description
        }
        try {
            const response = await fetch(`http://localhost:3001/update_task_input`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            })
            const data = await response.json()
            setErrorMessage('')
                if(!data.success){
                    setisClickeditButton(true);
                    setErrorMessage('Title must be unique')
                } else{
                    setisClickeditButton(false)
                    setDescription("");
                    setTitle("");
                    setErrorMessage('')
                }
        }
        catch (err) {
        }
        const trimmedTitle = title.trim();
        const trimmeddescription = description.trim();
        if (title.length === 0 || description.length === 0)  {
            setErrorMessage('Title and Description must be required')
            setisClickeditButton(true);
        } else if (trimmedTitle === '' || trimmeddescription === '') {
            setErrorMessage('Please enter a valid input. White spaces are not allowed.')
            setisClickeditButton(true);
        } else if(title.length >= 255 || description >= 255){
            setErrorMessage('Please shorten your input and try again, 255 characters are allowed')
            setisClickeditButton(true);
        }
    tasksList();
    }

    //task done and undone
    const isTaskDone = async (doneId) => {
        setErrorMessage('')
        const task = {
            id: doneId,
            is_done: true
        }
        try {
            const response = await fetch(`http://localhost:3001/update_done_button`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            })
            if (response.ok) {
                filterUndone();
            }
            else {
                throw new Error(`Network Failed, can't update`)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }

    const isTaskUndone = async (doneId) => {
       
        setErrorMessage('')
        const task = {
            id: doneId,
            is_done: false
        }
        try {
            const response = await fetch(`http://localhost:3001/update_done_button`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            })
            if (response.ok) {
                filterDone();
            }
            else {
                throw new Error(`Network Failed, can't update`)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }

    //delete task
    const removeList = async (deleteIndex) => {
        setErrorMessage('')
        try {
        const response = await fetch(`http://localhost:3001/delete_task`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks[deleteIndex])
            
        })
        }catch (err){
            console.log('error', err)
        }
        if(tasks.id === deleteIndex.id){
            tasksList();
        }
        setIsTaskClick(false);
    }

    //delete all task
    const removeAllList = async () => {
        setErrorMessage('')
        try {
        await fetch(`http://localhost:3001/delete_all_task`, {
            method: "DELETE",
        })
        } catch(err) {
       
        }
        setIsTaskClick(false);
        tasksList();
    }

    //update button will appear
    const editList = (task, e) => {
        setErrorMessage('')
        e.stopPropagation()
        setisClickeditButton(true)
        console.log(tasks)
        setTasks(prev => {
            const _prev = [...prev]
            const filter = _prev.filter((findItem) => findItem.isEdit === true)
            if (filter.length === 0) {
                const updatedTask = _prev.map(item => {
                    if (item.id === task.id) {
                        const updatedObj = { ...item, isEdit: true }
                        //for the cancel function to store the id and isEdit:false
                        setstoreArrayTask(updatedObj)
                        setEditIdentifier(task.id)
                        setDescription(task.description)
                        setTitle(task.title)
                        return updatedObj
                    }
                    else {
                        return item
                    }
                })
                return updatedTask
            }
            else {
                return _prev
            }
        })
        setIsTaskClick(false)
    }

    //add button will appear
    const cancelButton = () => {
        setisClickeditButton(false)
        //for the identify and add isEdit property
        setTasks(prev => {
            const updatedTask = prev.map(item => {
                if (item.id === storeArrayTask.id) {
                    const updatedObj = { ...item, isEdit: false }
                    return updatedObj
                }
                else {
                    return item
                }
            })
            return updatedTask
        })
        setTitle("");
        setDescription("");
    }


    useEffect(() => {
        tasksList();
    },[])


    return (
        <div>
            {homePageToggle ?
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100vw',
                        height: '100vh'
                    }}
                >
                    <img src='male.png' alt='icon'
                        style={{
                            width: '600px',
                            marginRight: '10px',
                        }}
                    />
                    <div style={{
                            display: 'flex',
                            width: '270px',
                            paddingLeft: '40px',
                            backgroundColor: '#cf994e',
                            borderRadius:'50px'
                        }}
                    >
                        <p onClick={toggleHomepage}
                            style={{
                                color: 'Green',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            Create a task
                        </p>
                        <button 
                            onClick={toggleHomepage}
                            style={{
                                height:'30px',
                                weight:'30px',
                                marginTop:'26px',
                                marginLeft:'10px',
                                border: 'none',
                                backgroundColor: '#cf994e',
                                cursor: 'pointer',
                                fontSize:'30px',
                                color: 'darkGreen',
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                :
                <div style={{
                    backgroundColor: '#252525',
                    height: '100vh',
                    widht: '100vh',
                    display: 'flex',
                    gap: 5
                }}
                >
                    <div
                        style={{
                            backgroundColor: '#FCFCF7',
                            height: '100%',
                            width: '35%',
                            position: 'relative'
                        }}
                    >
                        {taskListToggle ?
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%'
                            }}
                            >
                                <img src='./todo-list-96.png' alt='Back'
                                    style={{
                                        width: '100px',
                                        marginRight: '20px'
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: '40px',
                                        fontWeight: 'bold',
                                        color: 'Darkviolet'
                                    }}
                                > Task List</p>
                            </div>
                            :
                            <TaskList
                                tasks={tasks}
                                removeList={removeList}
                                editList={editList}
                                isTaskDone={isTaskDone}
                                isTaskUndone={isTaskUndone}
                                setisClickeditButton={setisClickeditButton}
                                isClickeditButton={isClickeditButton}
                                removeAllList={removeAllList}
                                taskSelector={taskSelectorDetails}
                                isDisable={isDisable}
                                setIsDisable={setIsDisable}
                                filterDone={filterDone}
                                filterUndone={filterUndone}
                                tasksList={tasksList}
                                setTaskListToggle={setTaskListToggle}
                                setIsClickAllTask={setIsClickAllTask}
                                isClickAllTask={isClickAllTask}
                                setIsClickDone={setIsClickDone}
                                isClickDone={isClickDone}
                                isClickUndone={isClickUndone}
                                setIsClickUndone={setIsClickUndone}
                                setIsModalOpen={setIsModalOpen}
                                isModalOpen={isModalOpen}
                            />
                        }
                    </div>

                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            height: '100%',
                            width: '65%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: 10
                        }}
                    >
                        {errorMessages  &&
                            <p style={{ color: 'red', font: 'arial', fontWeight: 'bold' }}>
                                {errorMessages}
                            </p>
                        }

                        {isTasksClick ?
                            <TaskDetails
                                title={title}
                                description={description}
                                taskSelector={taskSelectorDetails}
                                tasks={tasks}
                                taskObjDetails={taskObjDetails}
                            />
                            :
                            <TaskInput
                                title={title}
                                description={description}
                                isClickeditButton={isClickeditButton}
                                cancelButton={cancelButton}
                                addTasksList={addTasksList}
                                setTitle={setTitle}
                                setDescription={setDescription}
                                updateTask={updateTask}
                                homePageToggle={homePageToggle}
                                setHomePageToggle={setHomePageToggle}
                                setTaskListToggle={setTaskListToggle}
                                setIsModalOpen={setIsModalOpen}
                            />
                        }

                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                    />
                </div>
            }</div>
    )

}

export default App;