import { body } from 'express-validator'
// Middleware for validation
export function bodyValidation(){
    return [body('title').notEmpty().withMessage("Title is required").isLength({min:3, max:20}).withMessage("at latest 3 chars"),
        body('price').notEmpty().withMessage("price is required").isLength({min:1}).withMessage("at list add 1 num")]
}