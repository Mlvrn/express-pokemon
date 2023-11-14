import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2/';

export const callApi = async (
  endpoint,
  method = 'GET',
  headers = {},
  params = {},
  data
) => {
  const options = {
    baseURL,
    url: endpoint,
    method,
    headers,
    params,
    data,
  };

  const response = await axios(options);
  return response?.data;
};
