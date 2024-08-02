import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/reducers/main'
import { saveState, loadState } from './utils/utils'

// const store = configureStore({
//   reducer: rootReducer,
// })

// export default store
// export type RootState = ReturnType<typeof store.getState>

// Load the preloaded state from localStorage
const preloadedState = loadState();

// Create the Redux store with preloaded state
const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Pass the preloaded state here
});

// Subscribe to store changes and save the state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
