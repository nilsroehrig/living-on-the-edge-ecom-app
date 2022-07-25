export class UnexpectedStatusError extends Error {
  constructor(status: number, options?: ErrorOptions) {
    super(`Unexpected HTTP Status: ${status}`, options);
  }
}

export class InternalServerError extends Error {
  constructor(options?: ErrorOptions) {
    super('500 Internal Server Error', options);
  }
}
