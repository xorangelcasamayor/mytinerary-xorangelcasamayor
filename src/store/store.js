import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducer/citiesReducer';
import itinerariesReducer from './reducer/itinerariesReducer';
import authReducer from './reducer/authReducer';

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    auth: authReducer,
  },
});

export default store;
