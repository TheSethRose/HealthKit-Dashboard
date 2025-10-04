import { body, param, query, ValidationChain } from 'express-validator';

/**
 * Validation rules for user registration
 */
export const validateUserRegistration: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
];

/**
 * Validation rules for user login
 */
export const validateUserLogin: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

/**
 * Validation rules for health data sync
 */
export const validateHealthDataSync: ValidationChain[] = [
  body('timestamp')
    .isISO8601()
    .withMessage('Valid ISO 8601 timestamp is required'),
  body('steps')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Steps must be a non-negative integer'),
  body('heartRate')
    .optional()
    .isObject()
    .withMessage('Heart rate data must be an object'),
  body('sleep')
    .optional()
    .isObject()
    .withMessage('Sleep data must be an object'),
  body('workouts')
    .optional()
    .isArray()
    .withMessage('Workouts must be an array'),
  body('activitySummary')
    .optional()
    .isObject()
    .withMessage('Activity summary must be an object'),
  body('bodyMeasurements')
    .optional()
    .isObject()
    .withMessage('Body measurements must be an object'),
  body('vitalSigns')
    .optional()
    .isObject()
    .withMessage('Vital signs must be an object'),
  body('nutrition')
    .optional()
    .isObject()
    .withMessage('Nutrition data must be an object'),
];

/**
 * Validation rules for user ID parameter
 */
export const validateUserId: ValidationChain[] = [
  param('userId')
    .isString()
    .withMessage('User ID must be a string')
    .isLength({ min: 1 })
    .withMessage('User ID is required'),
];

/**
 * Validation rules for date range query parameters
 */
export const validateDateRange: ValidationChain[] = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Limit must be between 1 and 1000'),
];

/**
 * Validation rules for trends endpoint
 */
export const validateTrends: ValidationChain[] = [
  ...validateUserId,
  ...validateDateRange,
  query('metric')
    .optional()
    .isIn(['steps', 'heartRate', 'sleep', 'calories', 'distance'])
    .withMessage('Metric must be one of: steps, heartRate, sleep, calories, distance'),
];

/**
 * Validation rules for workouts endpoint
 */
export const validateWorkouts: ValidationChain[] = [
  ...validateUserId,
  ...validateDateRange,
  query('type')
    .optional()
    .isString()
    .withMessage('Workout type must be a string'),
];
