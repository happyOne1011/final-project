import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('ID is not a positive integer'),

  handleValidationErrors,
];

export const validateCreateProduct = [
  body('name')
    .exists({values: 'falsy'})
    .withMessage('Product Name is required')
    .bail()
    .isString()
    .withMessage('Product Name must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage('Product Name must be at least 3 characters'),
    
  body('price')
    .exists({ values: 'falsy' })
    .withMessage('Price is required')
    .bail()
    .isFloat({ min: 0 }) 
  .withMessage('Price must be a positive number'),

  body('stock')
    .exists({ values: 'falsy' })
    .withMessage('stock is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('stock must be a positive integer'),

  body('categoryId')
    .exists({ values: 'falsy' })
    .withMessage('categoryId is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('categoryId must be a positive integer'),
    
  handleValidationErrors,
];

export const validateUpdateProduct = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('price').exists({ values: 'falsy' }),
      body('stock').exists({ values: 'falsy' }),
      body('categoryId').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, price, stock, categoryId) must be provided' },
  ),

  body('name')
    .optional()
    .isString()
    .withMessage('Product Name must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage('Product Name must be at least 3 characters'),
    
  body('price')
    .optional()
    .isFloat()
    .withMessage('Price must be a decimal')
    .bail()
    .isLength({ min: 0 }),

  body('stock')
    .optional()
    .isInt({ min: 1 })
    .withMessage('stock must be a positive integer'),

  body('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('categoryId must be a positive integer'),

  handleValidationErrors,
];
