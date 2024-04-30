export class ApiResponse<T> {
  data: T;
  error?: IError = null;
  statusCode: number;

  constructor(data: T, error?: IError, statusCode?: number) {
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }
}

type IError = {
  message: string;
};
