class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    errors = [], // to share multiple errors
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = false;
    this.success = false;
    this.errors = errors;

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
