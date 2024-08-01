import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

const Todo = () => {
  // const { User_data } = useSelector((state) => state.todoReducers)

  const { User_data } = useTypedSelector((state) => state.todoReducers)
  console.log(User_data)
  return (
    <>
      <div className="todo_data col-lg-5 mx-auto mt-2">
        {User_data.map((element, index) => {
          return (
            <div
              className="todo_container d-flex justify-content-between align-items-center px-2 mb-2"
              style={{
                background: '#E6B9A6',
                borderRadius: '3px',
                height: '45px',
              }}
            >
              <li
                key={index}
                style={{ listStyle: 'none' }}
              >
                {element}
              </li>
              <div className="edit_dlt col-lg-3 py-2 d-flex justify-content-between align-items-center">
                <ModeEditIcon style={{ color: '#3c40c6', cursor: 'pointer' }} />
                <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />
                <RemoveRedEyeIcon
                  style={{ color: '#1dd1a1', cursor: 'pointer' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Todo
