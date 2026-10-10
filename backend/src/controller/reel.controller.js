import reelModel from '../models/reel.model.js'
import imageKit, { uploadReel } from '../services/storage.service.js'

/**
 * @route POST api/reel/create
 * @description Creates a reel
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createReelController (req, res, next) {
  try {
    const { userId } = req.user
    const file = req.file
    const { caption } = req.body

    if (!file || !caption || !userId) {
      return next({
        status: 400,
        message: 'Something went wrong .Try again later'
      })
    }

    const { url, fileId } = await uploadReel(file)
    if (!url) {
      return next({
        status: 400,
        message: 'Failed to upload images !'
      })
    }

    const reel = await reelModel.create({
      user: userId,
      reel: {
        url,
        caption,
        fileId
      }
    })
    if (!reel) {
      return next({
        status: 400,
        message: 'Failed to upload reel'
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Reel created successfully',
      reel
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/reel/delete/:reelId
 * @description Deletes a reel
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function deleteReelController (req, res, next) {
  try {
    const { reelId } = req.params
    const { userId } = req.user
    if (!reelId || !userId) {
      return next({
        status: 400,
        message: 'Try again later !'
      })
    }

    const reel = await reelModel.findOneAndDelete(
      {
        user: userId,
        _id: reelId
      },
      {
        new: true
      }
    )
    if (!reel) {
      return next({
        status: 404,
        message: 'Reel not found !'
      })
    }

    await imageKit.files.delete(reel.reel.fileId)
    return res.status(201).json({
      success: true,
      message: 'Reel deleted successfully !'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/reel/feed
 * @description Fetches feed for user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function fetchFeedController (req, res, next) {
  try {
    const { cursor } = req.query
    const limit = 10
    const query = cursor ? { _id: { $lt: cursor } } : {}

    const reels = await reelModel
      .find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .populate('user', 'username profilePic')

    const nextCursor =
      reels.length === limit ? reels[reels.length - 1]._id : null

    if (!reels) {
      return next({
        status: 404,
        message: 'Reel not found !'
      })
    }

    return res.status(200).json({
      success: true,
      reels,
      nextCursor
    })
  } catch (error) {
    next(error)
  }
}
