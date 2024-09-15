import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err.message,
    });
  }

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
