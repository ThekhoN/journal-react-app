import axios from 'axios';
const URL = 'https://590987948231c1001184c4ec.mockapi.io/getPeanuts';

const fetchData = () => {
  return axios.get(URL)
  .then((response) => {
    return response.data[0].data;
  })
  .catch(err => {
    if (err) {
      return err;
    }
  });
};

export default fetchData;
