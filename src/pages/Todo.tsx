import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2'
import { Remove, Update } from '../redux/actions/actions'
import { RootState } from '../store'
import { swalWithBootstrapButtons } from '../utils/swal'
import { truncateString } from '../utils/utils'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

const Todo = () => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 992px)' })
  const todoContainerStyle = {
    borderRadius: '3px',
    height: '45px',
    width: isLargeScreen ? '80%' : '100%',
  }

  const { User_data } = useTypedSelector((state) => state.todoReducers)
  // console.log(User_data)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [showData, setShowData] = useState<string>('')

  const dispatch = useDispatch()
  const remove = (id: number) => {
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(Remove(id)) // Dispatch the remove action
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Task has been deleted.',
            icon: 'success',
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your task is safe :)',
            icon: 'error',
          })
        }
      })
  }

  const [show, setShow] = useState<boolean>(false)
  const [update, setUpdate] = useState('')
  const [ind, setInd] = useState<number | undefined>(undefined)

  const handleClose = () => setShow(false)

  const handleShow = (displayElement: string, index: number) => {
    setShow(true)
    setUpdate(displayElement)
    setInd(index)
  }

  const userTaskUpdate = () => {
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Do you want to save the changes to this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (ind !== undefined) {
            // Ensure ind is defined
            dispatch(Update(update, ind)) // Dispatch the update action
            swalWithBootstrapButtons.fire({
              title: 'Updated!',
              text: 'Task has been updated.',
              icon: 'success',
            })
            setShow(false) // Close the modal after updating
          } else {
            console.error('Index is undefined')
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'No changes were made to the task.',
            icon: 'error',
          })
        }
      })
  }

  return (
    <>
      <div
        className="todo_data col-lg-5 mx-auto mt-2"
        style={todoContainerStyle}
      >
        {User_data.map((element, index) => {
          const displayElement =
            typeof element === 'string' ? element : String(element)

          return (
            <div
              key={index}
              className="todo_container d-flex justify-content-between align-items-center px-2 mb-2"
              style={{
                background: '#a2a8ae',
                borderRadius: '8px',
                cursor: 'pointer',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              <li
                style={{
                  listStyle: 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {truncateString(displayElement, 60)}
              </li>
              <div className="edit_dlt col-lg-3 py-2 d-flex justify-content-end align-items-center">
                <ModeEditIcon
                  onClick={() => {
                    handleShow(displayElement, index)
                    setInd(index)
                  }}
                  style={{
                    color: '#3c40c6',
                    cursor: 'pointer',
                    marginRight: '12px',
                  }}
                />
                <DeleteIcon
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    marginRight: '12px',
                  }}
                  onClick={() => remove(index)}
                />
                <RemoveRedEyeIcon
                  onClick={() => {
                    setShowModal(true)
                    setShowData(displayElement)
                  }}
                  style={{ color: '#1dd1a1', cursor: 'pointer' }}
                />
              </div>
            </div>
          )
        })}

        {/* read-model */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Task</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-scrollable">
            <p>{showData}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* update-model */}
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="update-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              name="task"
              value={update}
              className="form-control"
              onChange={(e) => setUpdate(e.target.value)}
              style={{
                width: '100%',
                height: '200px',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={userTaskUpdate}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Todo
