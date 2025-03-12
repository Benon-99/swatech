export const errorHandler = (err, req, res, next) => {
  console.error('[ErrorHandler]', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  // Default error status and message
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    status = 401;
    message = 'Unauthorized';
  } else if (err.name === 'NotFoundError') {
    status = 404;
    message = 'Resource not found';
  }

  // Send error response
  res.status(status).json({
    error: {
      message,
      status,
      // Only include stack trace in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
