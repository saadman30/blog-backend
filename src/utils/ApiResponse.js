class ApiResponse {
  constructor(success, statusCode, message, data) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
  }

  static success(statusCode, message, data) {
    return new ApiResponse(true, statusCode, message, data);
  }

  static failure(statusCode, message, data) {
    return new ApiResponse(false, statusCode, message, data);
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

// const ApiResponse = require("./path/to/ApiResponse");

// // Inside an Express route handler
// const data = { /* ... your data ... */ };
// const response = ApiResponse.success(200, 'Operation successful', data);
// response.send(res);

// const ApiResponse = require('./path/to/ApiResponse');

// // Inside an Express route handler
// const errorData = { /* ... error details ... */ };
// const response = ApiResponse.failure(404, 'Resource not found', errorData);
// response.send(res);

export { ApiResponse };
