import mongoose from 'mongoose'
import likeModel from '../models/like.model.js'
import postModel from '../models/post.model.js'
import imageKit, { uploadContent } from '../services/storage.service.js'
import followModel from '../models/follow.model.js'

/**
 * @route POST api/post/create
 * @description User can create a Post
 */
export async function createPostController (req, res, next) {
  try {
    const { userId } = req.user
    const { caption } = req.body
    const files = req.files

    if (!files || files.length === 0 || !caption) {
      return next({
        status: 400,
        message: 'All fields are required !'
      })
    }

    const uploadedImages = await Promise.all(
      files.map(async file => {
        return uploadContent(file)
      })
    )

    const content = uploadedImages.map(img => {
      return {
        url: img.url,
        type: img.fileType === 'image' ? 'image' : 'video',
        fileId: img.fileId
      }
    })

    const post = await postModel.create({
      user: userId,
      caption,
      content
    })

    return res.status(201).json({
      success: true,
      message: 'Post created successfully !',
      post
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET api/post/all-posts
 * @description Gets all posts
 */
export async function getAllPostsController (req, res, next) {
  try {
    const { userId } = req.user
    const currentUserId = new mongoose.Types.ObjectId(userId)

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const posts = await postModel.aggregate([
      // Pagination first
      {
        $sort: {
          createdAt: -1
        }
      },

      {
        $skip: skip
      },

      {
        $limit: limit
      },

      // Get all likes of each post
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'post',
          as: 'likes'
        }
      },

      // Calculate total likes
      {
        $addFields: {
          likeCount: {
            $size: '$likes'
          }
        }
      },

      // Check whether current user liked the post
      {
        $lookup: {
          from: 'likes',

          let: {
            postId: '$_id',
            currentUser: currentUserId
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$post', '$$postId']
                    },
                    {
                      $eq: ['$user', '$$currentUser']
                    }
                  ]
                }
              }
            }
          ],

          as: 'userLike'
        }
      },

      // Convert userLike array into boolean
      {
        $addFields: {
          isLiked: {
            $gt: [
              {
                $size: '$userLike'
              },
              0
            ]
          }
        }
      },

      // Get post owner
      {
        $lookup: {
          from: 'users',

          localField: 'user',
          foreignField: '_id',

          as: 'user'
        }
      },

      // Convert user array into object
      {
        $unwind: '$user'
      },

      // Only return required user fields
      {
        $project: {
          'user.password': 0,
          'user.email': 0,
          'user.createdAt': 0,
          'user.updatedAt': 0,

          likes: 0,
          userLike: 0
        }
      }
    ])

    return res.status(200).json({
      success: true,
      message: 'All posts fetched successfully !',
      posts,
      page,
      limit
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET api/post/user-posts
 * @description Gets all posts created by the user
 */
export async function getPostOfUserController (req, res, next) {
  try {
    const { userId } = req.user

    if (!userId) {
      return next({
        status: 400,
        message: 'UserId is not present !'
      })
    }

    const posts = await postModel
      .find({
        user: userId
      })
      .sort({
        createdAt: -1
      })

    if (posts.length === 0) {
      return next({
        status: 404,
        message: 'No posts created by user !'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'All Posts of user fetched !',
      posts
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET api/post/user-posts
 * @description Gets all posts created by the user
 */
export async function getPostOfUserByIdController (req, res, next) {
  try {
    const { userId } = req.params

    if (!userId) {
      return next({
        status: 400,
        message: 'UserId is not present !'
      })
    }

    const [followerCount, followingCount] = await Promise.all([
      followModel.countDocuments({ followee: userId }),
      followModel.countDocuments({ follower: userId })
    ])

    const posts = await postModel
      .find({
        user: userId
      })
      .sort({
        createdAt: -1
      })
      .populate('user', 'username profilePic bio')

    if (!posts) {
      return next({
        status: 400,
        message: 'Something went wrong !'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'All Posts of user fetched!',
      posts,
      followerCount,
      followingCount
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET api/post/:postId
 * @description Gets particular post
 */
export async function getPostController (req, res, next) {
  try {
    const { postId } = req.params

    if (!postId) {
      return next({
        status: 404,
        message: 'Post id not found !'
      })
    }

    const post = await postModel
      .findById(postId)
      .populate('user', 'username profilePic')

    if (!post) {
      return next({
        status: 404,
        message: 'Post not found !'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully !',
      post
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route DELETE api/post/:postId
 * @description Delete particular post
 */
export async function deletePostController (req, res, next) {
  try {
    const { userId } = req.user
    const { postId } = req.params

    if (!postId) {
      return next({
        status: 404,
        message: 'Post id not found !'
      })
    }

    const post = await postModel.findOneAndDelete({
      user: userId,
      _id: postId
    })

    if (!post) {
      return next({
        status: 404,
        message: 'Post not found !'
      })
    }

    for (const file of post.content) {
      await imageKit.files.delete(file.fileId)
    }

    await likeModel.deleteMany({
      post: postId
    })

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully !',
      post
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/post/:postId/like
 * @description User likes a post
 */
export async function likePostController (req, res, next) {
  try {
    const { userId } = req.user
    const { postId } = req.params

    if (!postId) {
      return next({
        status: 404,
        message: 'Post id not found !'
      })
    }

    const post = await postModel.exists({
      _id: postId
    })

    if (!post) {
      return next({
        status: 404,
        message: 'Post not found!'
      })
    }

    const existingLike = await likeModel.findOne({
      user: userId,
      post: postId
    })

    if (existingLike) {
      return res.status(200).json({
        success: true,
        liked: true,
        message: 'Post already liked'
      })
    }

    await likeModel.create({
      user: userId,
      post: postId
    })

    return res.status(201).json({
      success: true,
      liked: true,
      message: 'Post liked successfully !'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route DELETE api/post/:postId/like
 * @description User unlikes a post
 */
export async function unlikePostController (req, res, next) {
  try {
    const { userId } = req.user
    const { postId } = req.params

    if (!postId) {
      return next({
        status: 404,
        message: 'Post id not found !'
      })
    }

    const like = await likeModel.findOneAndDelete({
      user: userId,
      post: postId
    })

    if (!like) {
      return res.status(200).json({
        success: true,
        liked: false,
        message: 'Post was already unliked'
      })
    }

    return res.status(200).json({
      success: true,
      liked: false,
      message: 'Post unliked successfully !'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET api/post/liked-posts
 * @description Fetches all the liked post
 */
export async function getAllLikedPosts (req, res, next) {
  try {
    const { userId } = req.user
    if (!userId) {
      return next({
        status: 400,
        message: 'Something went wrong !'
      })
    }

    const likedPost = await likeModel
      .find({
        user: userId
      })
      .populate('post', {
        content: { $slice: 1 }
      }).sort({ _id: -1 })

    if (!likedPost) {
      return next({
        status: 404,
        message: 'No liked posts found !'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'All liked posts fetched',
      post: likedPost
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route GET api/post/liked-posts
 * @description Fetches all the liked post
 */
export async function getAllLikedPostsById (req, res, next) {
  try {
    const { userId } = req.params
    if (!userId) {
      return next({
        status: 400,
        message: 'Something went wrong !'
      })
    }

    const likedPost = await likeModel
      .find({
        user: userId
      })
      .populate('post', {
        content: { $slice: 1 }
      }).sort({ _id: -1 })

    if (!likedPost) {
      return next({
        status: 404,
        message: 'No liked posts found !'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'All liked posts fetched',
      post: likedPost
    })
  } catch (error) {
    next(error)
  }
}
