const SearchBar = (props) => {
    return (
    <form>
        <div>
            Use Common Name: <input type="checkbox" defaultChecked={true} onClick={props.handleType}></input><br></br>
            Search Country: <input onChange={props.onChange} value={props.value}></input>
        </div>
    </form>
    )
}

export default SearchBar