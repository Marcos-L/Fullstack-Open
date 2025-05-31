const AddPerson = (props) => {
    return (<form onSubmit={props.onSubmit}>
        <div>
          Name: <input onChange={props.nameChange} value={props.name}/><br></br>
          Number: <input onChange={props.numberChange} value={props.number}/><br></br>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default AddPerson