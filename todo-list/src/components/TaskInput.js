

 const TaskInput = ({title, description,isClickeditButton, cancelButton, addTasksList, setTitle, setDescription, updateTask}) => {


    return(
    <>
        <input value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" Title" style={{width:'250px', height:'50px'}}
        />
        <textarea value={description}
         onChange={(e) => setDescription(e.target.value)}
          placeholder=" Task Details" style={{width:'250px', height:'70px'}} />

        <>
            {isClickeditButton ? 
            <>
                <button onClick={()=> updateTask()}>Update</button>
                <button onClick={cancelButton}>cancel</button>
            </> : 
                <button onClick={addTasksList}>Add</button>
            }
        </>
    </>
    )
}

export default TaskInput