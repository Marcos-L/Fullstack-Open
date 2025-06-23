const SearchName = (props) => {
    return (
    <form>
        <div>
            Search: <input onChange={props.onChange} value={props.name}></input>
        </div>
    </form>
    )
}

export default SearchName