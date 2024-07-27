import { useState } from 'react'

const Headline = ({title}) => {
  return (
    <div>
      <h1>
        {title}
      </h1>
    </div>
  )
}

const Votes = ({voteNum}) => {
  return (
    <div>
      has {voteNum} votes
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Famous = ({anecdotes, votes}) => {
  let max = 0
  let i = 0
  for (let [key, value] of Object.entries(votes)) {
    if (value > max) {
      max = value
      i = key
    }
  }
  return (
    <div>
      {anecdotes[i]}
    </div>    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})

  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  const updateVotes = () => {
    const votes_copy = { ...votes }
    votes_copy[selected] += 1    
    setVote(votes_copy)
  }
  
  return (
    <div>
      <Headline title="Anecdote of the day" />
      <div>
        {anecdotes[selected]}
      </div>
      <Votes voteNum={votes[selected]} />
      <Button text="Vote" onClick={updateVotes} />
      <Button text="Next Anecdote" onClick={() => setSelected(getRandomInt(0, anecdotes.length))} />
      <Headline title="Anecdote with most votes" />
      <Famous anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App