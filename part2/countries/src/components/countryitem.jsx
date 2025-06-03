const CountryItem = ({name, onClick}) =>{
    return (<li>{name}  <button onClick={()=>{onClick()}}>Show Info</button></li>)
}

export default CountryItem