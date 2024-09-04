

const TaskList = ({tasks,removeList,editList,doneButton, }) => {

    return (
        <>
            { 
                tasks.map((task,index) => 
                    <div style={{
                        border: 'solid', 
                        borderColor:'black', 
                        borderWidth:'1px', 
                        margin:'5px'
                        }}
                    >  
                        <p>{task.title}</p>
                        <p>{task.description}</p>
                        {task.isDone ? 
                                <button onClick={() => doneButton()}>Undone</button>
                               :
                            <>
                                  <button onClick={() => removeList(index)}>Delete</button>
                                  <button onClick={() => editList(index)}>Edit</button>
                                  <button onClick={() => doneButton()}>Done</button>
                            </> 
                        }
                    </div>
            )}
        </>
    )

}

export default TaskList