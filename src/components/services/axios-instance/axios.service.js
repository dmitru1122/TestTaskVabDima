import Axios from 'axios';

export * from 'axios';

const axios = Axios.create();

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const { data } = err.response;
    const message = data && data.message ? data.message : 'Unhandled server error!';

    throw new Error(`${message}`);
  },
);

export default axios;
