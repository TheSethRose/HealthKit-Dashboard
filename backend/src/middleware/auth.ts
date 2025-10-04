import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

/**
 * Middleware to authenticate JWT tokens
 * Extracts token from Authorization header and verifies it
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Access token is required',
    });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined in environment variables');
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Server configuration error',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Token has expired',
      });
      return;
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: 'Invalid token',
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Token verification failed',
    });
  }
};

/**
 * Generate JWT token for authenticated user
 */
export const generateToken = (userId: string, email: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { userId, email },
    secret,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};
