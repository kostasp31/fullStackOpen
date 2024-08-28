import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <div>
        filter <input type='text' name='filter' />
      </div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App