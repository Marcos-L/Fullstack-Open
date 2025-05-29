const Header = (props) => {
  return (<h1>{props.course.name}</h1>)
}

const Content = (props) => {
  const array_ = props.course.parts
  return (
    <div>
      <Part name={array_[0].name} exercise_num={array_[0].exercises}/>
      <Part name={array_[1].name} exercise_num={array_[1].exercises}/>
      <Part name={array_[2].name} exercise_num={array_[2].exercises}/>
    </div>
  )
}

const Part = (props) =>{
  return (<p>{props.name} {props.exercise_num}</p>)
}

const Total = (props) => {
  var total = 0;
  props.course.parts.forEach(element => {
    total += element.exercises;
  });
  return (<p>Number of exercises {total}</p>)
}

const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App