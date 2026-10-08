import { body, validationResult } from 'express-validator'

const validateUser = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: errors.array()[0]
    })
  }

  next()
}

export const registerValidator = [
  body('username')
    .notEmpty()
    .withMessage("Username shoudn't be empty !")
    .isLength({ min: 3, max: 15 })
    .withMessage('Username must be between 3 to 15 letters'),
  body('email')
    .notEmpty()
    .withMessage("Email shouldn't be empty !")
    .isEmail()
    .withMessage('Email format should be correct !'),
  body('password')
    .notEmpty()
    .withMessage("Password shouldn't be empty!")
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validateUser
]

export const loginValidator = [
  body('password')
    .notEmpty()
    .withMessage("Password shouldn't be empty!")
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validateUser
]
