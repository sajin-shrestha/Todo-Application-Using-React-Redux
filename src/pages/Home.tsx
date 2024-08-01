import { Button } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Add } from '../redux/actions/actions'
import Todo from './Todo'

const Home = () => {
  const [data, setData] = useState('')
  const dispatch = useDispatch()

  const addData = () => {
    if (data.trim() !== '') {
      dispatch(Add(data))
      setData('') // Clear the input field after adding data
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addData()
    }
  }

  return (
    <>
      <div className="container">
        <section className="mt-3 text-center">
          <h2>Enter Your Task</h2>
          <div className="todo col-lg-5 mx-auto d-flex justify-content-between align-items-center">
            <input
              type="text"
              name="task"
              value={data}
              className="form-control custom-input"
              onChange={(e) => setData(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              sx={{
                backgroundColor: '#2F3645',
                color: '#EEEDEB',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
                '&:hover': {
                  backgroundColor: '#3A4250', // Change to your desired hover background color
                  color: '#FFFFFF', // Change to your desired hover text color
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Add hover shadow
                },
              }}
              className="mx-2"
              onClick={addData}
            >
              Add
            </Button>
          </div>
          <Todo />
        </section>
      </div>
    </>
  )
}

export default Home
