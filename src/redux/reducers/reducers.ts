export interface ActionTypes {
  type: string
  payload: string
}

// export type Action = ActionTypes

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

    default:
      return state
  }
}
