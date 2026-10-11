import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createReelController, deleteReelController, fetchFeedController } from '../controller/reel.controller.js'
import upload from '../utils/multer.js'

const reelRouter = Router()
reelRouter.use(authMiddleware)

reelRouter.post('/create',upload.single('reel'),createReelController)
reelRouter.post('/delete/:reelId',deleteReelController)
reelRouter.get('/feed',fetchFeedController)

export default reelRouter