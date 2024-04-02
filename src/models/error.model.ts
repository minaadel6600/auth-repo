class HttpError extends Error {
    statusCode: number;
    constructor(message = 'Something went wrong', _statusCode = 500) {
      super(message);
      this.statusCode = _statusCode; 
    }
  }
  
export default HttpError;
