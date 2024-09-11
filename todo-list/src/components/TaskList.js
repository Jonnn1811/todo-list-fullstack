import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ tasks, removeList, editList, isTaskDone, isTaskUndone, isClickeditButton, removeAllList, taskSelector, isDisable, setisClickeditButton, filterDone, filterUndone, tasksList, setTaskListToggle }) => {

  return (
    <div style={{ overflowY: 'auto', height: '100vh', position: 'relative' }}>
      {tasks.length !== 0 &&
        <div style={{
          backgroundColor: 'white',
          height: '40px', position: 'fixed',
          width: '31%', display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          paddingRight: '30.5px'
        }}>

          <button onClick={tasksList}
            style={{
              height: '30px',
              marginRight: '20px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Show all task
          </button>
          <button onClick={filterUndone}
            style={{
              height: '30px',
              marginRight: '20px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Filter Undone
          </button>

          <button onClick={filterDone}
            style={{
              height: '30px',
              marginRight: '20px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Filter Done
          </button>

          <button onClick={() => {
            removeAllList();
            setTaskListToggle(true);
          }}
            style={{
              height: '30px',
              marginRight: '20px',
              backgroundColor: 'darkred',
              color: 'white',
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
      <div style={{ marginTop: '40px' }}>
        {
          tasks.map((task, index) =>
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
                fontSize: '20px',
                fontWeight: 'bold'
              }}
              >
                {task.title.length > 25 ? task.title.slice(0, 25) + '...' : task.title}
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
                      isTaskUndone(task.id)
                    }}

                    style={{
                      backgroundColor: 'gray',
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
                    onClick={() => removeList(index)}
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
                      onClick={(e) => {
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
                          isTaskDone(task.id)

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
                      onClick={(e) => editList(task, e)}
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
    </div>

  )

}

export default TaskList