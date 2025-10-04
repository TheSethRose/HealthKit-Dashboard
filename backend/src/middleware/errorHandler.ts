import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

/**
 * Global error handler middleware
 * Handles various types of errors and returns appropriate responses
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error caught by global handler:', err);

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'A record with this data already exists',
        field: err.meta?.target,
      });
      return;
    }

    // Record not found
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'The requested record was not found',
      });
      return;
    }

    // Foreign key constraint violation
    if (err.code === 'P2003') {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid reference to related data',
      });
      return;
    }
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Invalid data provided',
    });
    return;
  }

  // JWT errors (handled in auth middleware, but just in case)
  if (err.name === 'JsonWebTokenError') {
    res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Invalid token',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Token has expired',
    });
    return;
  }

  // Validation errors (from express-validator or custom validation)
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message,
    });
    return;
  }

  // Default error response
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : 'Error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      name: err.name,
    }),
  });
};

/**
 * Async handler wrapper to catch errors in async route handlers
 * Usage: app.get('/route', asyncHandler(async (req, res) => { ... }))
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
