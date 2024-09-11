import './App.css';
import { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import TaskDetails from './components/TaskDetails'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isClickeditButton, setisClickeditButton] = useState(false);
    const [editIdentifier, setEditIdentifier] = useState();
    const [isInputValidation, setInputValidation] = useState(false);
    const [storeArrayTask, setstoreArrayTask] = useState([]);
    const [whiteSpaceErrorMessage, setWhiteSpaceErrorMessage] = useState('');
    const [redundantErrorMessage, setRedundantErrorMessage] = useState('');
    const [isTasksClick, setIsTaskClick] = useState(false);
    const [taskObjDetails, setTaskObjDetails] = useState({});
    const [isDisable, setIsDisable] = useState(false)
    const [homePageToggle, setHomePageToggle] = useState(true)
    const [taskListToggle, setTaskListToggle] = useState(true)


    const toggleHomepage = () => {
        setHomePageToggle(false)
    }


    //tasks Selector 
    const taskSelectorDetails = (task) => {
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
        const response = await fetch('http://localhost:3001/filter_done');
        const data = await response.json();
        setTasks(data);
    }

    //retrieving all done in database 
    const filterUndone = async () => {
        const response = await fetch('http://localhost:3001/filter_undone');
        const data = await response.json();
        setTasks(data);
    }


    //add task
    const addTasksList = async () => {
        setInputValidation(false);
        setWhiteSpaceErrorMessage('')
        setRedundantErrorMessage('')

        const task = {
            taskTitle: title,
            taskDescription: description,
            isDone: false,
        }
        const trimmedTitle = title.trim();
        const trimmeddescription = description.trim();
        if (trimmedTitle === '' && trimmeddescription === '') {
            setWhiteSpaceErrorMessage('Please enter a valid input. White spaces are not allowed.')
            return;
        }
        setDescription("");
        setTitle("");

        if (!title || !description) {
            setInputValidation(true)
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/add_task', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task) // INPUT FROM CLIENT
            });
            //redundant title validation
            const data = await response.json()
            if (!data.success) {
                setRedundantErrorMessage('Title must be unique')
            }
        }
        catch (err) {
            console.log(err)
        }
        tasksList();
    }


    //updating task
    const updateTask = async () => {
        const task = {
            id: editIdentifier,
            title: title,
            description: description
        }

        if (title.length !== 0 && description.length !== 0) {
            setisClickeditButton(false);
            setInputValidation(false);
            try {
                const response = await fetch(`http://localhost:3001/update_task_input`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(task)

                })
                const data = await response.json()
                setDescription("");
                setTitle("");
                tasksList();
            }
            catch (err) {
                console.log(err.message)
            }
        }
        else {
            setInputValidation(true)
        }

    }

    //task done and undone
    const isTaskDone = async (doneId) => {
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
                tasksList();
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
                tasksList();
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

        await fetch(`http://localhost:3001/delete_task`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks[deleteIndex])
        })
        tasksList();
    }

    //delete all task
    const removeAllList = async () => {

        await fetch(`http://localhost:3001/delete_all_task`, {
            method: "DELETE",
        })
        tasksList();
    }

    //update button will appear
    const editList = (task, e) => {
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
    }, [])


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
                    <p onClick={toggleHomepage}
                        style={{
                            marginRight: '10px',
                            color: 'Green',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        Create a task
                    </p>
                    <button onClick={toggleHomepage}
                        style={{
                            border: 'solid',
                            borderColor: 'green',
                            borderRadius: '100%',
                            width: '30px',
                            height: '30px',
                            backgroundColor: 'Yellow',
                            cursor: 'pointer'
                        }}
                    >
                        +
                    </button>
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
                            />
                        }
                    </div>

                    <div
                        style={{
                            backgroundColor: '#FCFCF7',
                            height: '100%',
                            width: '65%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: 10
                        }}
                    >
                        {isInputValidation &&
                            <p style={{ color: 'red', font: 'arial', fontWeight: 'bold' }}>
                                Title and Description must be required
                            </p>
                        }
                        {whiteSpaceErrorMessage !== '' &&
                            <p style={{ color: 'red', font: 'arial', fontWeight: 'bold' }}>
                                {whiteSpaceErrorMessage}
                            </p>
                        }
                        {redundantErrorMessage !== '' &&
                            <p style={{ color: 'red', font: 'arial', fontWeight: 'bold' }}>
                                {redundantErrorMessage}
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