const Total = (props) => {
  const total = props.parts.reduce((sum, elem) => sum + elem.exercises, 0)
  return (<b>Total number of exercises: {total}</b>)
}

export default Total