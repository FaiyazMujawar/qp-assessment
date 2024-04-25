export enum ExceptionType {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class ApiException extends Error {
  public type: ExceptionType;
  public errors: any[] = [];
  constructor(
    message: string,
    type: ExceptionType = ExceptionType.INTERNAL_SERVER_ERROR,
    errors: any[] = []
  ) {
    super(message);
    this.type = type;
    this.errors = errors;
  }
}
