const TaskList = ({tasks,removeList,editList,isTaskDone,isTaskUndone,isClickeditButton}) => {

    return (

        <div style={{overflowY: 'auto', height:'100vh'}}>
            <>
                {
                    tasks.map((task,index) => 
                        <div style={{
                                border: 'solid', 
                                borderColor:'black',  
                                borderRadius: '6px',
                                borderWidth: '4px',
                                margin:'3px 5px 10px 3px',
                                paddingLeft:'10px'
                            }}
                        >   
                            
                            <p>{task.title.length > 50 ?  task.title.slice(0, 50) + '...' : task.title }</p>
                            <p>{task.description}</p>
                            {task.is_done ? 
                                    <button onClick={() => isTaskUndone(task.id)}
                                        style={{
                                            backgroundColor: 'gray', 
                                            padding:'8px', 
                                            border:'none', 
                                            borderRadius:'20px', 
                                            color:'white',
                                            cursor:'pointer',
                                            fontWeight:'bold',
                                            fontFamily:'arial',
                                            marginRight:'5px',
                                            marginBottom:'8px',
                                        }}
                                    >Undone
                                    </button>
                                :
                                <>
                                    <div style={{gap: 10,marginBottom:'8px'}}>
                                        <button    
                                            disabled={isClickeditButton}
                                            onClick={() => removeList(index)
                                                    
                                            }
                                            style={{
                                                backgroundColor: task.isEdit  ? '#ffcbd1' : '#c30010',
                                                padding:'8px', 
                                                border:'none', 
                                                borderRadius:'20px', 
                                                color:'white',
                                                cursor:'pointer',
                                                fontWeight:'bold',
                                                fontFamily:'arial',
                                                marginRight:'5px'
                                            }}
                                        >   Delete
                                        </button>
                                        <button onClick={() => editList(task)}
                                            style={{
                                                backgroundColor:'blue', 
                                                padding:'8px', 
                                                border:'none', 
                                                borderRadius:'20px', 
                                                color:'white',
                                                cursor:'pointer',
                                                fontWeight:'bold',
                                                fontFamily:'arial',
                                                marginRight:'5px'
                                            }}
                                        >   Edit
                                        </button>
                                        <button disabled={isClickeditButton}
                                            onClick={() => isTaskDone(task.id)}
                                            style={{
                                                backgroundColor: task.isEdit ? 'lightgreen' : 'green',
                                                padding:'8px', 
                                                border:'none', 
                                                borderRadius:'20px', 
                                                color:'white',
                                                cursor:'pointer',
                                                fontWeight:'bold',
                                                fontFamily:'arial',
                                                marginRight:'5px'  
                                            }}
                                            

                                        >   Done
                                        </button>
                                    </div>
                                </> 
                            }
                        </div>
                )}
            
            </>
        </div>
    )

}

export default TaskList