import { STATUS_CODES } from "@/types/statusCodes";
import { BaseError } from "./baseError";

export class NotFoundError extends BaseError {
  statusCode = STATUS_CODES.NOT_FOUND;

  constructor(entity: string) {
    super(`${entity} not found`);
  }
}

export class BadRequestError extends BaseError {
  statusCode = STATUS_CODES.BAD_REQUEST;
  constructor(message?: string) {
    super(`${message} || Bad request!`);
  }
}
