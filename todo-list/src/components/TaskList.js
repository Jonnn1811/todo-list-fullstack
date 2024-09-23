import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { IoCloseCircleOutline } from "react-icons/io5";

const TaskList = ({ 
  tasks, 
  removeList, 
  editList,
  isClickeditButton,
  removeAllList, 
  taskSelector, 
  isDisable, 
  setisClickeditButton, 
  filterDone, 
  filterUndone, 
  loadTasks,
  setTaskListToggle,
  isClickAllTask,
  setIsClickDone,
  isClickDone,
  isClickUndone,
  setIsClickUndone,
  setIsClickAllTask,
  setIsModalOpen,
  isModalOpen,
  updateTaskStatus,
  toggleDone,
  filterMessage,
}) => {


  return (
    <div style={{ overflowY: 'auto', height: '100vh', position: 'relative',}}>
      <div>
      { isModalOpen &&
          <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                zIndex:9999
            }}>
                <div
                    style={{
                      background:'white',
                      padding: '20px',
                      borderRadius: '15px',
                      position: 'relative',
                      width: '80%',
                      height: '24%',
                      maxWidth: '500px',
                      display:'flex',
                      justifyContent:'center',
                      flexDirection:'column',
                      alignItems:'center'
                    }} 
                >
                  <p 
                    style={{
                      marginRight:'6px',
                      fontSize:'24px',
                      fontWeight:'bold',
                      marginBottom:'12px'
                    }}
                  >
                    Are you sure you? 
                  </p>
                  <p 
                    style={{
                      fontSize:'16px',
                      textAlign:'center',
                      width:'85%'
                    }}
                  >
                    Are you sure you want delete this item? This action cannot be undone.
                  </p>
                  <div>
                    <button 
                      style={{
                        backgroundColor:'transparent',
                        border:'solid 3px Darkviolet',
                        borderRadius:'4px',
                        marginRight:'15px',
                        fontSize:'18px',
                        padding:'3px 10px 4px 10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                    >Cancel
                    </button>
                    <button 
                        style={{
                          backgroundColor:'Darkviolet',
                          border:'solid 3px Darkviolet',
                          borderRadius:'4px',
                          marginRight:'15px',
                          fontSize:'18px',
                          padding:'3px 10px 4px 10px',
                          color:'white',
                          cursor: 'pointer'
                        }}
                      onClick={() => {
                        removeAllList();
                        setTaskListToggle(true);
                      }}
                    >Delete
                    </button>
                  </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'none',
                          border: 'none',
                          fontSize: '20px',
                          cursor: 'pointer'
                      }}
                    > <IoCloseCircleOutline 
                        size='1.6em'
                    />
                    </button>
                </div>
          </div>  
      }
      </div>
      { tasks.length !== 0 &&
          <div style={{
            backgroundColor: 'white',
            width:'500px',
            maxHeight: '100%', 
            position: 'fixed',
            maxWidth: '100%', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: '30.5px',
            zIndex:0
          }}>

            <button 
            onClick={ () => { 
              if (!isClickeditButton) {
                loadTasks()
                setIsClickAllTask(true)
                setIsClickDone(false)
                setIsClickUndone(false)
              } 
              else {
                toast.error('Edit mode is active; please cancel or finish')
                setisClickeditButton(true)
              }
            }}
              style={{
                height: '30px',
                marginRight: '20px',
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '4px',
                minWidth:'6.8rem',
                padding: '0.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: isClickAllTask && '2.5px solid black'
              }}
            >
              Show all task
            </button>

            <button 
              onClick={() => { 
                if (!isClickeditButton) { 
                  filterDone()
                  setIsClickDone(true)
                  setIsClickAllTask(false)
                  setIsClickUndone(false)
                } 
                else {
                  toast.error('Edit mode is active; please cancel or finish')
                  setisClickeditButton(true)
                }
              }}

              style={{
                height: '30px',
                marginRight: '20px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '4px',
                minWidth:'6rem',
                padding: '0.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: isClickDone && '2.5px solid black'
              }}
            >
              Filter Done
            </button>

            <button 
              onClick={() => { 
                if (!isClickeditButton) {
                    filterUndone()
                    setIsClickUndone(true)
                    setIsClickAllTask(false)
                    setIsClickDone(false)
                  } 
                  else {
                    toast.error('Edit mode is active; please cancel or finish')
                    setisClickeditButton(true)
                  }
                }}
              style={{
                height: '30px',
                marginRight: '20px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '4px',
                minWidth:'6.7rem',
                padding: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: isClickUndone && '2.5px solid black'
              }}
            >
              Filter Undone
            </button>

            <button 
              onClick={() => {
                
                if (!isClickeditButton) { 
                  setIsModalOpen(true);
                } else {
                  toast.error('Edit mode is active; please cancel or finish')
                  setisClickeditButton(true);
                }
        
              }}
              style={{
                height: '30px',
                marginRight: '20px',
                backgroundColor: 'darkred',
                color: 'white',
                minWidth:'5rem',
                border: 'none',
                borderRadius: '4px',
                padding: '5px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Delete All
            </button> 
          </div> 
      }
      {toggleDone ? 
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '800px',
                width: '100%'
            }}
        >
            <p 
                style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: 'Darkviolet'
                }}
            > {filterMessage}
            </p>
        </div> :
      <div style={{ marginTop: '40px' }}>
        {tasks.map((task, index) =>
            <div
              style={{
                backgroundColor: task.is_done ? '#bfbfbf' : '#efefef',
                border: 'solid',
                borderColor: 'black',
                borderRadius: '6px',
                borderWidth: '4px',
                margin: '3px 5px 10px 3px',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
            >

              <p style={{
                fontSize: '16px',
                fontWeight: 'bold',
                overflow: 'hidden' ,
                whiteSpace: 'nowrap', 
                textOverflow: 'ellipsis' 
              }}
              >
                {task.title}
              </p>
              <p
                style={{
                  marginLeft: '8px',
                  wordBreak: 'break-word',
                  fontSize: '14px',
                  color: '#191919'
                }}
              >
                {task.description}
              </p>

              {task.is_done ?
                <div>
                  <button
                      onClick={() => {
                        if (!isClickeditButton) {
                          taskSelector(task)
                        } else {
                          toast.error('Edit mode is active; please cancel or finish')
                          setisClickeditButton(true)
                        }
                      }}
                      style={{
                        backgroundColor: task.isEdit ? 'lightgray' : 'gray',
                        padding: '8px',
                        border: 'none',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontFamily: 'arial',
                        marginRight: '5px',
                        marginBottom: '8px',
                      }}>
                        Details
                  </button>
                  <button
                    onClick={() => {
                      if (!isClickeditButton) {
                        updateTaskStatus(task.id, false)
                      } else {
                        toast.error('Edit mode is active; please cancel or finish')
                        setisClickeditButton(true)
                      }
                    }}
                    style={{
                      backgroundColor: task.isEdit ? 'lightgreen' : 'green',
                      padding: '8px',
                      border: 'none',
                      borderRadius: '20px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontFamily: 'arial',
                      marginRight: '5px',
                      marginBottom: '8px',
                    }}
                  >Undone
                  </button>
                  <button
                    onClick={() => {
                      if (!isClickeditButton) {
                        removeList(index)
                      } 
                      else {
                        toast.error('Edit mode is active; please cancel or finish')
                        setisClickeditButton(true)
                      }}}
                    disabled={isDisable}
                    style={{
                      backgroundColor: task.isEdit ? '#ffcbd1' : '#c30010',
                      padding: '8px',
                      border: 'none',
                      borderRadius: '20px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontFamily: 'arial',
                      marginRight: '5px'
                    }}
                  >   
                    Delete
                  </button>
                </div>
                :
                <>
                  <div style={{ gap: 10, marginBottom: '8px' }}>
                    <button
                      onClick={() => {
                        if (!isClickeditButton) {
                          taskSelector(task)
                        } else {
                          toast.error('Edit mode is active; please cancel or finish')
                          setisClickeditButton(true)
                        }
                      }}
                      style={{
                        backgroundColor: task.isEdit ? 'lightgray' : 'gray',
                        padding: '8px',
                        border: 'none',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontFamily: 'arial',
                        marginRight: '5px',
                        marginBottom: '8px',
                      }}>
                        Details
                    </button>
                    <button
                      onClick={() => {
                        if (!isClickeditButton) {
                          updateTaskStatus(task.id, true)
                        } else {
                          toast.error('Edit mode is active; please cancel or finish')
                          setisClickeditButton(true)
                        }

                      }}
                      style={{
                        backgroundColor: task.isEdit ? 'lightgreen' : 'green',
                        padding: '8px',
                        border: 'none',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontFamily: 'arial',
                        marginRight: '5px'
                      }}
                    >   Done
                    </button>
                    <button
                      // disable={isTasksClick}
                      onClick={(e) => {
                        if (!isClickeditButton) {
                          editList(task)
                        } else {
                          toast.error('Edit mode is active; please cancel or finish')
                          setisClickeditButton(true)
                        }
                      }}
                      style={{
                        backgroundColor: 'blue',
                        padding: '8px',
                        border: 'none',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontFamily: 'arial',
                        marginRight: '5px'
                      }}
                    >   Edit
                    </button>
                    <button 
                      onClick={() => {
                        if (!isClickeditButton) {
                          removeList(index)
                         
                        } else {
                          toast.error('Edit mode is active; please cancel or finish')
                          setisClickeditButton(true)
                        }
                      }}
                      style={{
                        backgroundColor: task.isEdit ? '#ffcbd1' : '#c30010',
                        padding: '8px',
                        border: 'none',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontFamily: 'arial',
                        marginRight: '5px'
                      }}
                    >   Delete
                    </button>
                  </div>
                </>
              }
            </div>
          )}
      </div>
      }
    </div>

  )

}

export default TaskList