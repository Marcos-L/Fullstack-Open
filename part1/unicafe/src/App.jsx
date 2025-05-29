import { useState } from 'react'

const Header = (props) => {return (<h1>{props.text}</h1>)}
const Total = (props) => {
  return (<p>{props.type}: {props.quantity}</p>)
}

const Button = (props) => {
  return (<button onClick={props.onClick}>{props.text}</button>)
}

const Reply = (props) => {
  return (<p>{props.text}</p>)
}

const Stats = (props) => {
  var total = 0;
  props.counts.forEach(element => {
    total += element;
  });
  if (total){
    const N = props.counts.length
    var countsTable = []
    var average = 0;
    for (let i=0;i<N;i++){
      average += props.counts[i]*props.weights[i]
      countsTable.push(<StatisticLine key={i+1} text={props.names[i]+' Reviews'} value={props.counts[i]}/>)
    }
    countsTable.push(<StatisticLine key={N+1} text={'Total Reviews'} value={total}/>)                 
    return (
      <div>
        <h2>Totals:</h2>
        <table><tbody>{countsTable}</tbody></table>
        <h2>Stats:</h2>
        <table>
          <tbody>
            <StatisticLine key={N+3} text={'Average Score'} value={(average)/total}/>
            <StatisticLine key={N+4} text={'Good Percentage'} value={(props.counts[0]*100)/total} unit={'%'}/>
          </tbody>
        </table>
      </div>
    )
  }
  else{ return <p>No feedback taken.</p> }
}

const StatisticLine = (props) => {
  return ( <tr><td>{props.text}</td><td>{props.value} {props.unit?props.unit:''}</td></tr>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [reply, setReply] = useState('')

  function handleClick(reply, count, setFunction){
      const handler = () => {
        setReply(reply)
        setFunction(count+1)
      }
      return handler
    }

  return (
    <div>
      <Header text={ "Unicafe Review System" }/>
      <Reply text={reply}/>
      <Button onClick={handleClick('Thanks for you positive feedback!', good, setGood)} text={'Good'}/>
      <Button onClick={handleClick('Your neutral feedback has been noted.', neutral, setNeutral)} text={'Neutral'}/>
      <Button onClick={handleClick('We are sorry about your negative experience.', bad, setBad)} text={'Bad'}/>
      <Stats counts={[good, neutral, bad]} names={['Good', 'Neutral', 'Bad']} weights={[1,0,-1]}/>
    </div>
  )
}

export default App