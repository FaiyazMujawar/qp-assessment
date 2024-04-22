export enum ExceptionType {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class ApiException extends Error {
  public type: ExceptionType;
  constructor(
    message: string,
    type: ExceptionType = ExceptionType.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.type = type;
  }
}