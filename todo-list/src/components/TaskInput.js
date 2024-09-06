

 const TaskInput = ({title, description,isClickeditButton, cancelButton, addTasksList, setTitle, setDescription, updateTask}) => {


    return(
       
            <>
                <input  value={title} placeholder=" Title"
                        onChange={(e) => setTitle(e.target.value)}
                    style={{    
                        width:'250px', 
                        height:'50px', 
                        border:'solid',
                        borderColor:'black',
                        borderRadius: '10px',
                        paddingLeft: '10px'
                    }}
                />
                <textarea   
                            value={description} placeholder=" Task Details"  
                            onChange={(e) => setDescription(e.target.value)}
                
                    style={{
                        width:'250px', 
                        height:'100px', 
                        border:'solid',
                        borderColor:'black',
                        borderRadius: '10px',
                        paddingLeft: '10px',
                        paddingTop: '10px',
                        resize: 'none'
                    }} 
                />
                
                <>
                    {isClickeditButton ? 
                    <>
                        <div style={{display:'flex',gap: 5}}>
                            <button style={{
                                backgroundColor: 'blue', 
                                padding:'8px', 
                                border:'none', 
                                borderRadius:'20px', 
                                color:'white',
                                cursor:'pointer',
                                fontWeight:'bold',
                                fontFamily:'arial'
                            }}
                            onClick={updateTask}>Update</button>
                            <button style={{
                                backgroundColor: 'red', 
                                padding:'8px', 
                                border:'none', 
                                borderRadius:'20px', 
                                color:'white',
                                cursor:'pointer',
                                fontWeight:'bold',
                                fontFamily:'arial'
                            }}
                                onClick={cancelButton}>Cancel</button>
                        </div>
                    </> : 
                        <button style={{
                                    backgroundColor: 'blue', 
                                    padding:'8px', 
                                    border:'none', 
                                    borderRadius:'20px', 
                                    color:'white',
                                    cursor:'pointer',
                                    fontWeight:'bold',
                                    fontFamily:'arial'
                                }}
                            onClick={addTasksList}
                        >   Add
                        </button>
                    }
                </>
            </>

    )
}

export default TaskInput