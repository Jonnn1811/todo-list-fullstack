
const TaskDetails = ({title, description,taskSelector,task,taskObjDetails}) => {
 
    return (
        <div style={{width:'450px',height:'500px'}}>
            <button
                style={{
                    marginLeft:'100%',
                    marginBottom:'60px',
                    cursor:'pointer'
                }} 
                onClick={taskSelector}>
                    <img src='./x-button.svg' alt='Back' />
                </button>
           <p   
                style={{
                    fontSize:'25px',
                    wordBreak:'break-word',
                    fontWeight: 'bold'
                }}
           >    {taskObjDetails.title}
           </p>
           <p
                style={{
                    marginLeft: '8px',
                    wordBreak:'break-word',
                    fontSize:'14px',
                    color:'#78716c'
            }}>
                {taskObjDetails.description}
            </p>
        </div>
    )
}
export default TaskDetails