module.exports = {
  errorHandler(err, req, res, next) {
    if (err instanceof Error) {
      if (err.status === 1) {
        err.status = 401;
        err.message = '帳號或密碼錯誤';
      }
      res.status(err.status || 500).json({
        status: 'error',
        message: `${err.message}`,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: `${err}`,
      });
    }
    next(err);
  },
};
