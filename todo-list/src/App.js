import './App.css';
import { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import TaskDetails from './components/TaskDetails'
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
    const [homePageToggle, setHomePageToggle] = useState(false)
    const [taskListToggle, setTaskListToggle] = useState(true)
    const [errorMessages, setErrorMessage] = useState('')
    const [isClickAllTask, setIsClickAllTask] = useState(false)
    const [isClickDone, setIsClickDone] = useState(false)
    const [isClickUndone, setIsClickUndone] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterMessage, setFilterMessage] = useState('');
    const [toggleDone, setToggleDone] = useState(false)

    const toggleHomepage = (toggle) => {
        setHomePageToggle(toggle)
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

    //retrieving all tasks in database
    const loadTasks = async () => {
        const response = await fetch('http://localhost:3001/retrieve_tasks');
        const data = await response.json();
        if (data.error_message){
            toast.error(data.error_message)
            return
        }
        setTasks(data.tasks);
        if(toggleDone)
        {
            setToggleDone(false)
        }
    }

    //retrieving all Done Tasks in database 
    const filterDone = async () => {
        setErrorMessage('')
    
        const response = await fetch('http://localhost:3001/filter_done');
        const data = await response.json();

        if (data.length !== 0) {
            setTasks(data);
        } 
        else {
            setFilterMessage('No task is complete. Please finish them.')
            setToggleDone(true)
            loadTasks();
        }
        if(toggleDone) {
            setToggleDone(false)
        }
    }

    //retrieving all Undone Tasks in database 
    const filterUndone = async () => {
        setErrorMessage('')

        const response = await fetch('http://localhost:3001/filter_undone');
        const data = await response.json();

        if(data.length !== 0) {
            setTasks(data);
        } 
        else {
            setFilterMessage('All your task is done, Good Job!')
            setToggleDone(true)
            loadTasks();
        }
        if(toggleDone){
            setToggleDone(false)
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
            if (!data.success) {
                setErrorMessage('Title must be unique')
            }
            else {
                setDescription("");
                setTitle("");
            }
        }
        catch (err) {
        }
        
        const trimmedTitle = title.trim();
        const trimmeddescription = description.trim();

        if (title.length === 0 || description.length === 0)  {
            setErrorMessage('Title and Description must be required')
        } 
        else if (trimmedTitle === '' || trimmeddescription === '') {
            setErrorMessage('Please enter a valid input. White spaces are not allowed.')
        } 

        loadTasks();
    }


    //updating task
    const updateTask = async () => {
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
            }
            else {
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
        }
        else if (trimmedTitle === '' || trimmeddescription === '') {
            setErrorMessage('Please enter a valid input. White spaces are not allowed.')
            setisClickeditButton(true);
        } 
    loadTasks();
    }

    const updateTaskStatus = async (doneId, isDone) => {
        setErrorMessage('');
    
        const task = {
            id: doneId,
            is_done: isDone
        };
    
        try {
            const response = await fetch(`http://localhost:3001/update_done_button`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            });
    
            if (response.ok) {
                isDone ? filterUndone() : filterDone();
            } else {
                throw new Error(`Network failed: can't update`);
            }
        } catch (err) {

        }
    };
    

    //delete task
    const removeList = async (deleteIndex) => {
    setErrorMessage('')
        try {
        await fetch(`http://localhost:3001/delete_task`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks[deleteIndex])
            
        })
        }
        catch (err) {
            console.log('error', err)
        }
        if(tasks.id === deleteIndex.id){
            loadTasks();
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
        loadTasks();
    }

    //update button will appear
    const editList = (task) => {
        
        setErrorMessage('')
        setisClickeditButton(true)
        
        setTasks(prevTasks => {
            const filter = prevTasks.filter((findItem) => findItem.isEdit === true)
            
            if (filter.length === 0) {
                const updatedTask = prevTasks.map(item => {
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
                return prevTasks
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
        loadTasks();
    },[]);


    return (
        <div>
            
            {tasks.length === 0 && homePageToggle ?
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
                        <div onClick={() => {toggleHomepage(false)}}
                            style={{
                                display: 'flex',
                                width: '270px',
                                paddingLeft: '40px',
                                backgroundColor: '#cf994e',
                                borderRadius:'50px',
                                cursor: 'pointer'
                            }}
                        >
                            <p onClick={() => {toggleHomepage(false)}}
                                style={{
                                    color: '#f7f7f7',
                                    fontSize: '30px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                            >
                                Create a task
                            </p>
                            <button 
                                onClick={() => {toggleHomepage(false)}}
                                style={{
                                    height:'30px',
                                    weight:'30px',
                                    marginTop:'26px',
                                    marginLeft:'10px',
                                    border: 'none',
                                    backgroundColor: '#cf994e',
                                    cursor: 'pointer',
                                    fontSize:'30px',
                                    color: '#f7f7f7'
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
                    {taskListToggle && tasks.length === 0 ?
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
                                    setisClickeditButton={setisClickeditButton}
                                    isClickeditButton={isClickeditButton}
                                    removeAllList={removeAllList}
                                    taskSelector={taskSelectorDetails}
                                    isDisable={isDisable}
                                    setIsDisable={setIsDisable}
                                    filterDone={filterDone}
                                    filterUndone={filterUndone}
                                    loadTasks={loadTasks}
                                    setTaskListToggle={setTaskListToggle}
                                    setIsClickAllTask={setIsClickAllTask}
                                    isClickAllTask={isClickAllTask}
                                    setIsClickDone={setIsClickDone}
                                    isClickDone={isClickDone}
                                    isClickUndone={isClickUndone}
                                    setIsClickUndone={setIsClickUndone}
                                    setIsModalOpen={setIsModalOpen}
                                    isModalOpen={isModalOpen}
                                    updateTaskStatus={updateTaskStatus}
                                    toggleDone={toggleDone}
                                    filterMessage={filterMessage}
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