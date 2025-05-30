import { useState } from 'react'

const MostLiked = (props) => {
  if (props.quote){
    return (
      <div>
        <h1>Most Liked Quote:</h1>
        <p>{props.quote}</p>
      </div>
  )
  }
  else {
    return null
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState('a')
  const [votes, setVotes] = useState(new Uint16Array(anecdotes.length))

  function getRandomInt(min, max) {
    // Original function from: 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#examples
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }


  function handleClick (){
    const N = anecdotes.length
    setSelected(getRandomInt(0,N))
  }

  function handleLike (){
    var new_votes = [...votes]
    new_votes[selected] += 1
    
    let best_index = new_votes.indexOf(Math.max(...new_votes));
    setBest(anecdotes[best_index])
    setVotes(new_votes)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Likes: {votes[selected]}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleClick}>New Quote</button>
      <MostLiked quote={best}/>
    </div>
  )
}

export default App