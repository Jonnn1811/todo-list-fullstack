const HomePage = ({setHomePageToggle}) =>
{
    return(
        <div onclick={ () => {setHomePageToggle(false)}}
          style={{dipslay:'flex', cursor:'pointer'}}>
          <p>Create A task</p>
          <button onclick={ () => {setHomePageToggle(false)}}>Toggle</button>
            
        </div>
    )
}
export default HomePage