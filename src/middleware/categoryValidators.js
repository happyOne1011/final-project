import {param, body} from 'express-validator';
import {handleValidationErrors} from './handleValidationErrors.js';


export const validateCategoryId =[
    param('id')
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('ID must be a positive integer'),

    handleValidationErrors,
];
export const validateCreateCategory = [
body('name')
    .exists({values: 'falsy'})
    .withMessage('Category Name is required')
    .bail()
    .isString()
    .withMessage('Category Name must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage('Category Name must be at least 3 characters')
    .bail(),
    

    handleValidationErrors,
];

export const validateUpdateCategory =[
body('name')
    .exists({values: 'falsy'})
    .withMessage('Category Name is required')
    .bail()
    .isString()
    .withMessage('Category Name must be a string')
    .bail()
    .trim()
    .escape()
    .isLength({min: 3})
    .withMessage('Name must be at least 3 characters')
    .bail(),
    

    handleValidationErrors,
];