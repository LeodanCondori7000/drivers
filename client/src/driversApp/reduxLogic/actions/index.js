import { FETCH_DRIVERS } from './actionTypes';
import axios from 'axios';

export const fetchDrivers = () => {
  return (dispatch) => {
    axios.get('http://localhost:3001/drivers')
      .then((response) => {
        const drivers = response.data;
        dispatch({
          type: FETCH_DRIVERS,
          payload: drivers
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
