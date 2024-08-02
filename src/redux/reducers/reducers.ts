export interface ActionTypes {
  type: string
  payload: string | number
  index?: number
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
          (_element, index) => index !== action.payload,
        )
        return {
          ...state,
          User_data: deleteData,
        }
      }
      return state
    }

    case 'UPDATE_DATA': {
      if (typeof action.index === 'number') {
        const updateData = state.User_data.map((element, index) =>
          index === action.index ? action.payload : element,
        )
        return {
          ...state,
          User_data: updateData,
        }
      }
      return state
    }

    default:
      return state
  }
}

// Action Types
// export interface AddAction {
//   type: 'ADD_DATA'
//   payload: string
// }

// export interface RemoveAction {
//   type: 'REMOVE_DATA'
//   payload: number
// }

// export interface UpdateAction {
//   type: string
//   payload: string | number
//   index?: number
// }

// export type ActionTypes = AddAction | RemoveAction | UpdateAction

// // Initial State
// export const initial_state = {
//   User_data: [] as string[], // Explicitly type the User_data array
// }

// export const todoReducers = (state = initial_state, action: ActionTypes) => {
//   switch (action.type) {
//     case 'ADD_DATA':
//       return {
//         ...state,
//         User_data: [...state.User_data, action.payload],
//       }

//     case 'REMOVE_DATA': {
//       if (typeof action.payload === 'number') {
//         const deleteData = state.User_data.filter(
//           (_element, index) => index !== action.payload,
//         )
//         return {
//           ...state,
//           User_data: deleteData,
//         }
//       }
//       return state
//     }

//     case 'UPDATE_DATA': {
//       const updateData = state.User_data.map((element, index) =>
//         index === action.id ? action.payload : element,
//       )
//       return {
//         ...state,
//         User_data: updateData,
//       }
//     }

//     default:
//       return state
//   }
// }
