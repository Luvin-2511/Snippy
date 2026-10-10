import { Router } from 'express'
import { createPostController, deletePostController, getAllLikedPosts, getAllLikedPostsById, getAllPostsController, getPostController, getPostOfUserByIdController, getPostOfUserController, likePostController, unlikePostController } from '../controller/post.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import upload from '../utils/multer.js'

const postRouter = Router()
postRouter.use(authMiddleware)

postRouter.post('/create', upload.array('content', 10), createPostController)
postRouter.get('/liked-posts',getAllLikedPosts)
postRouter.get('/liked-posts/:userId',getAllLikedPostsById)
postRouter.post('/:postId/like', likePostController)
postRouter.delete('/:postId/unlike', unlikePostController)
postRouter.get('/all-posts', getAllPostsController)
postRouter.get('/user-posts', getPostOfUserController)
postRouter.get('/user-posts/:userId', getPostOfUserByIdController)
postRouter.get('/:postId', getPostController)
postRouter.delete('/:postId',deletePostController)

export default postRouter
