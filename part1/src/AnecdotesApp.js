import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({title, anecdote, upvotes}) => (
  <div>
      <h2>{title}</h2>
      <p><b>Quote</b>: {anecdote}</p>
      <p><b>Upvotes</b>: {upvotes}</p>
  </div>
)

const AnecdotesApp = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostUpvoted, setMostUpvoted] = useState(0)

  const handleNextClick = () => setSelected((selected + 1) % anecdotes.length)
  const handleUpvoteClick = () => {
    const upvoted = [...votes]
    upvoted[selected] += 1
    setVotes(upvoted)
    setMostUpvoted(upvoted.indexOf(Math.max(...upvoted)))
  }


  return (
    <div>
      <Anecdote title="Some anecdote" anecdote={anecdotes[selected]} upvotes={votes[selected]} />
      <br/>
      <Button handleClick={handleUpvoteClick} text='Upvote' />
      <Button handleClick={handleNextClick} text='Next' />
      <br/>
      <Anecdote title="Most-upvoted anecdote" anecdote={anecdotes[mostUpvoted]} upvotes={votes[mostUpvoted]} />
    </div>
  )
}

export default AnecdotesApp