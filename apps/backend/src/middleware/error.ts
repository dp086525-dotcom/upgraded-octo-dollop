import type { NextFunction, Request, Response } from 'express';

export function asyncHandler<T extends Request>(fn: (req: T, res: Response, next: NextFunction) => Promise<unknown>) {
  return (req: T, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(error);
  res.status(500).json({ message: error.message || 'Internal server error' });
}
