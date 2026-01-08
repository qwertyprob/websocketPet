export abstract class BaseError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = new.target.name; 
    Object.setPrototypeOf(this, new.target.prototype); 
  }
}
