import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { RootState } from '../store'
import { truncateString } from '../utils/utils'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

const Todo = () => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 992px)' })
  // Define styles for the todo container
  const todoContainerStyle = {
    borderRadius: '3px',
    height: '45px',
    width: isLargeScreen ? '80%' : '100%', // Change width based on screen size
  }

  // const { User_data } = useSelector((state) => state.todoReducers)
  const { User_data } = useTypedSelector((state) => state.todoReducers)
  console.log(User_data)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [showData, setShowData] = useState('')

  return (
    <>
      <div
        className="todo_data col-lg-5 mx-auto mt-2"
        style={todoContainerStyle}
      >
        {User_data.map((element, index) => {
          return (
            <div
              className="todo_container d-flex justify-content-between align-items-center px-2 mb-2"
              style={{
                background: '#E6B9A6',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowModal(true)
                setShowData(element)
              }}
            >
              <li
                key={index}
                style={{ listStyle: 'none' }}
              >
                {truncateString(element, 60)}
              </li>
              <div className="edit_dlt col-lg-3 py-2 d-flex justify-content-end align-items-center">
                <ModeEditIcon style={{ color: '#3c40c6', cursor: 'pointer' }} />
                <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />
                <RemoveRedEyeIcon
                  onClick={() => {
                    setShowModal(true)
                    setShowData(element)
                  }}
                  style={{ color: '#1dd1a1', cursor: 'pointer' }}
                />
              </div>
            </div>
          )
        })}

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{showData}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false)
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Todo
