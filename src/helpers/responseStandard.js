module.exports = {
  response: (res, statusCode, data, error, errorMessage) => {
    const status = {};
    status.timestamp = new Date();
    status.statusCode = statusCode || 200;
    status.error = error || false;
    status.errorMessage = errorMessage || null;

    const result = { status };
    result.data = data;

    return res.status(status.statusCode).json(result);
  },
};
