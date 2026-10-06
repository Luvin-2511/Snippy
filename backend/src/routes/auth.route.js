import { Router } from 'express'
import {
  getMeController,
  loginController,
  logoutController,
  registerController,
  verificationController
} from '../controller/auth.controller.js'
import {
  loginValidator,
  registerValidator
} from '../validators/auth.validator.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
const authRouter = Router()

authRouter.post('/register', registerValidator, registerController)
authRouter.post('/login', loginValidator, loginController)
authRouter.post('/logout', authMiddleware, logoutController)
authRouter.get('/me', authMiddleware, getMeController)
authRouter.post('/verify-user', verificationController)
// authRouter.post('/profile', verificationController)

export default authRouter
