import Part from './Part'

const Content = (props) => {
  const array_ = props.parts
  const list = []
  array_.forEach(element => {
    list.push(<Part key={element.id} name={element.name} exercise_num={element.exercises}/>)
  });
  return (list)
}

export default Content