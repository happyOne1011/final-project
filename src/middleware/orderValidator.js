import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateOrderId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('ID is not a positive integer'),

  handleValidationErrors,
];

export const validateCreateOrder = [
  
  body('items')
    .exists({ values: 'falsy' })
    .withMessage('Items array is required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),

  
  body('items.*.productId')
    .exists({ values: 'falsy' })
    .withMessage('productId is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('productId must be a positive integer'),
    
  
  body('items.*.quantity')
    .exists({ values: 'falsy' })
    .withMessage('quantity is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('quantity must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateOrder = [
  body('status')
    .exists({ values: 'falsy' })
    .withMessage('Status is required')
    .bail()
    .isString()
    .withMessage('Status must be a string')
    .bail()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be one of: pending, in-progress, completed'),

  handleValidationErrors,
];