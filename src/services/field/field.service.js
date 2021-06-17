import Axios from '../axios-instance/axios.service';

const API_URL = 'http://demo1030918.mockable.io/';

async function getField() {
  const { data } = await Axios.get(`${API_URL}`);
  return data;
}

export default getField;
