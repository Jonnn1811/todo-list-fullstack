import React from "react";

const TaskInput = ({
    title,
    description,
    isClickeditButton, 
    cancelButton, 
    addTasksList, 
    setTitle, 
    setDescription, 
    updateTask,
    setIsModalOpen,
    setTaskListToggle
}) => {

    return(
        <>
                <div 
                    style={{
                        display:'flex', 
                        width:'600px',
                        alignItem:'center',
                        justifyContent:'center'
                    }}
                > 
                    <p 
                        style={{
                            fontSize:'40px',
                            fontWeight:'bold',
                            color:'Darkviolet'
                        }}
                    > Tasks Management
                    </p>
                </div>
            <>
                    <input  
                        value={title} placeholder=" Title"
                        maxlength="100"
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
                        maxlength="255"
                        value={description} placeholder=" Task Details"  
                        onChange={(e) => setDescription(e.target.value.replace(/\n/g, '<br />'))}
                        cols="50"
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
                        <div style={{display:'flex',gap: 20}}>
                            <button onClick={cancelButton}
                                style={{
                                    backgroundColor: 'red', 
                                    padding:'8px', 
                                    border:'none', 
                                    borderRadius:'20px', 
                                    color:'white',
                                    cursor:'pointer',
                                    fontWeight:'bold',
                                    fontFamily:'arial'
                                }}
                            >  Cancel
                            </button>

                            <button  onClick={updateTask}
                                style={{
                                    backgroundColor: 'blue', 
                                    padding:'8px', 
                                    border:'none', 
                                    borderRadius:'20px', 
                                    color:'white',
                                    cursor:'pointer',
                                    fontWeight:'bold',
                                    fontFamily:'arial'
                                }}
                            >  Update
                            </button>
                        </div>
                </> : 
                    <div>
                        <button 
                            style={{
                                backgroundColor: 'red', 
                                padding:'8px', 
                                border:'none', 
                                borderRadius:'20px', 
                                color:'white',
                                cursor:'pointer',
                                fontWeight:'bold',
                                fontFamily:'arial',
                                marginRight: '20px'
                            }}
                            onClick={() => {
                                setDescription("")
                                setTitle("")
                            }}
                        > Clear
                        </button>
                        <button    
                            onClick={() => {
                                    addTasksList();
                                    setTaskListToggle(false);
                                    setIsModalOpen(false)
                            }}
                            style={{
                                backgroundColor: 'blue', 
                                padding:'8px', 
                                border:'none', 
                                borderRadius:'20px', 
                                color:'white',
                                cursor:'pointer',
                                fontWeight:'bold',
                                fontFamily:'arial'
                            }}
                        >   Add
                        </button>
                        
                    </div>
                    
                }
                    <div style={{display:'flex'}}>
                            <img src='man.png' alt='iconMan'
                                style={{
                                    width:'200px',
                                    marginTop:'50px',
                                    marginLeft:'800px'
                                }}
                            />
                        </div>
                </>
            </>
        </>
        
    )
}

export default TaskInput