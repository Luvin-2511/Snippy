import followModel from '../models/follow.model.js'
import userModel from '../models/user.model.js'
import { uploadProfilePic } from '../services/storage.service.js'

/**
 * @route POST api/user/follow-request/:followeeId
 * @description User can follow other user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function followRequestController (req, res, next) {
  try {
    const { userId: followerId } = req.user
    const { followeeId } = req.params

    if (!followerId || !followeeId) {
      return next({
        status: 400,
        message: 'Invalid Request !'
      })
    }

    if (followerId === followeeId) {
      return next({
        status: 400,
        message: "You can't follow yourself"
      })
    }

    const followee = await userModel.findById(followeeId)
    if (!followee) {
      return next({
        status: 404,
        message: "User doesn't exist. Please check again!"
      })
    }

    const follower = await userModel.findById(followerId)
    if (!follower) {
      return next({
        status: 400,
        message: "User doesn't exist .Please check again !"
      })
    }

    const follow = await followModel.create({
      follower: followerId,
      followee: followeeId,
      status: 'pending'
    })

    return res.status(200).json({
      success: true,
      message: 'Follow request sent successfully !',
      follow
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/user/follow/:followerId/accept
 * @description User can follow other user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function followAcceptController (req, res, next) {
  try {
    const { userId: followeeId } = req.user
    const { followerId } = req.params

    if (!followerId || !followeeId) {
      return next({
        status: 400,
        message: 'Invalid Request !'
      })
    }

    const follow = await followModel.findOneAndUpdate(
      {
        follower: followerId,
        followee: followeeId,
        status: 'pending'
      },
      {
        $set: { status: 'followed' }
      },
      {
        new: true
      }
    )

    if (!follow) {
      return next({
        status: 404,
        message: 'Follow request not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User followed successfully !',
      follow
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/user/follow/:followerId/reject
 * @description User can follow other user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function followRejectController (req, res, next) {
  try {
    const { userId: followeeId } = req.user
    const { followerId } = req.params

    if (!followerId || !followeeId) {
      return next({
        status: 400,
        message: 'Invalid Request !'
      })
    }

    const follow = await followModel.findOneAndDelete({
      follower: followerId,
      followee: followeeId,
      status: 'pending'
    })

    if (!follow) {
      return next({
        status: 404,
        message: 'Follow request not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User rejected successfully !',
      follow
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/user/unfollow/:followerId
 * @description User can follow other user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function unfollowController (req, res, next) {
  try {
    const { userId: followeeId } = req.user
    const { followerId } = req.params

    if (!followerId || !followeeId) {
      return next({
        status: 400,
        message: 'Invalid Request !'
      })
    }

    const follow = await followModel.findOneAndDelete({
      follower: followerId,
      followee: followeeId,
      status: 'followed'
    })

    return res.status(200).json({
      success: true,
      message: 'User unfollowed successfully !',
      follow
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route PATCH api/user/profile-update
 * @description Updates the users profile image and bio
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function profileUpdateController (req, res, next) {
  try {
    const { userId } = req.user
    const { bio } = req.body
    const file = req.file
    if (!userId || !bio) {
      return next({
        status: 400,
        message: 'Something went Wrong! Try again'
      })
    }
    const updatedData = { bio }
    if (file) {
      const { url } = await uploadProfilePic(file)
      updatedData.profilePic = url
    }
    const user = await userModel.findByIdAndUpdate(userId, updatedData, {
      new: true
    })

    if (!user) {
      return next({
        status: 400,
        message: 'Something went Wrong! Cannot update profile'
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Profile updated',
      user
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route Get api/user/follow-requests
 * @description description
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getAllFollowRequest (req, res, next) {
  try {
    const { userId } = req.user
    if (!userId) {
      return next({
        status: 400,
        message: 'Something went wrong'
      })
    }

    const follow = await followModel
      .find({
        status: 'pending',
        followee: userId
      })
      .populate('follower', 'username profilePic')

    if (!follow) {
      return res.status(200).json({
        success: true,
        message: 'No new follow requests !'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Requests fetched !',
      follow
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route Get api/user/request-count
 * @description gets count of follow Request
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getFollowRequestCount (req, res, next) {
  try {
    const { userId } = req.user

    const count = await followModel.countDocuments({
      followee: userId,
      status: 'pending'
    })

    res.status(200).json({
      success: true,
      count
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/user/followers/:userId
 * @description Gets all followers list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getFollowerList (req, res, next) {
  try {
    const { userId } = req.params
    const followerList = await followModel.find({
      followee:userId
    }).populate('follower','username profilePic')

    return res.status(200).json({
      success:true,
      message:"All followers fetched",
      followerList
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/user/following/:userId
 * @description Gets all following list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getFollowingList (req, res, next) {
  try {
    const { userId } = req.params
    const followingList = await followModel.find({
      follower:userId
    }).populate('followee','username profilePic')

    return res.status(200).json({
      success:true,
      message:"All followers fetched",
      followingList
    })
  } catch (error) {
    next(error)
  }
}
