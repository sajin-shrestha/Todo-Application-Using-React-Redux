export interface ActionTypes {
  type: string
  payload: string | number
}

export const initial_state = {
  User_data: [],
}

export const todoReducers = (state = initial_state, action: ActionTypes) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        User_data: [...state.User_data, action.payload],
      }

    case 'REMOVE_DATA': {
      if (typeof action.payload === 'number') {
        const deleteData = state.User_data.filter(
          (element, index) => index !== action.payload,
        )
        return {
          ...state,
          User_data: deleteData,
        }
      }
      return state
    }

    default:
      return state
  }
}
