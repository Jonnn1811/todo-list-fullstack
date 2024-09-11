const HomePage = ({setHomePageToggle}) =>
{
    return(
        <div style={{dipslay:'flex'}}>
          <p>Create A task</p>
          <button onclick={ () => {setHomePageToggle(false)
          }}>Toggle</button>
            
        </div>
    )
}
export default HomePage