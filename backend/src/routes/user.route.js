import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
  followAcceptController,
  followRejectController,
  followRequestController,
  getAllFollowRequest,
  getFollowerList,
  getFollowingList,
  getFollowRequestCount,
  unfollowController
} from '../controller/user.controller.js'
import { profileUpdateController } from '../controller/user.controller.js'
import upload from '../utils/multer.js'
const userRouter = Router()

userRouter.use(authMiddleware)

userRouter.patch('/follow/:followerId/accept', followAcceptController)
userRouter.delete('/follow/:followerId/reject', followRejectController)
userRouter.post('/follow-request/:followeeId', followRequestController)
userRouter.delete('/unfollow/:followerId', unfollowController)
userRouter.get('/follow-requests', getAllFollowRequest)
userRouter.get('/request-count', getFollowRequestCount)
userRouter.get('/followers/:userId', getFollowerList)
userRouter.get('/following/:userId', getFollowingList)
userRouter.patch(
  '/profile-update',
  upload.single('profilePic'),
  profileUpdateController
)

export default userRouter
