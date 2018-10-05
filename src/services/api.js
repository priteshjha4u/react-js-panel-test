import axios from './axios';
import endpoints from './endpoints';

export const fetchCountries = () => {
  return axios.get(endpoints.conuntries).then(data => {
    return data;
  });
};
