export const handleServerError = (res) => {
  return res.status(500).json({ message: 'Internal Server Error' });
};

export const handleResponse = (res, status, data) => {
  return res.status(status).json(data);
};
