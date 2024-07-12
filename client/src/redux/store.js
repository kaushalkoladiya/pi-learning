import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { Provider } from 'react-redux';

const reduxStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default reduxStore;

export const StoreProvider = ({ children }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
}
