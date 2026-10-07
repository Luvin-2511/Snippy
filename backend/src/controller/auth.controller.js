import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { tokenGenerator } from '../utils/tokenGenerator.js'
import { sendOtp } from '../utils/sendotp.js'
import { uploadProfilePic } from '../services/storage.service.js'
import followModel from '../models/follow.model.js'

/**
 * @route POST api/auth/register
 * @description Registers an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function registerController (req, res, next) {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return next({
        status: 400,
        message: 'Fill all fields correctly !'
      })
    }

    const isUserExisting = await userModel.findOne({
      $or: [{ email }, { username }]
    })
    if (isUserExisting) {
      return next({
        status: 409,
        message: 'Incorrect email or password !'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
      username,
      email,
      password: passwordHash
    })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = await bcrypt.hash(otp, 10)

    user.otp = otpHash
    user.otpExpirationTime = Date.now() + 10 * 60 * 1000

    await user.save()
    await sendOtp(email, otp)

    return res.status(201).json({
      success: true,
      message: 'Verification Email sent to your Account !'
    })
  } catch (err) {
    next(err)
  }
}

/**
 * @route POST api/auth/verify-user
 * @description Sets user verification to true when correct otp is entered
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function verificationController (req, res, next) {
  try {
    const { email, otp } = req.body
    if (!otp) {
      return next({
        status: 400,
        message: 'Enter otp !'
      })
    }

    const user = await userModel.findOne({ email }).select('+otp')
    if (!user) {
      return next({
        status: 404,
        message: "User doesn't exist !"
      })
    }

    if (user.otpExpirationTime < Date.now()) {
      return next({
        status: 400,
        message: 'OTP has expired'
      })
    }

    const isValidOtp = await bcrypt.compare(otp, user.otp)
    if (!isValidOtp) {
      return next({
        status: 400,
        message: 'Invalid Otp !'
      })
    }

    user.isVerified = true
    user.otp = undefined
    user.otpExpirationTime = undefined

    await user.save()

    const token = tokenGenerator(user._id)
    console.log('-----------------------', token)
    res.cookie(
      'token',
      token
      //     , {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict'
      // }
    )

    return res.status(201).json({
      success: true,
      message: 'User Verified successfully !'
    })
  } catch (err) {
    next(err)
  }
}

/**
 * @route POST api/auth/login
 * @description Login an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function loginController (req, res, next) {
  try {
    const { identifier, password } = req.body
    if (!identifier && !password) {
      return next({
        status: 400,
        message: 'All fields are Required !'
      })
    }

    const user = await userModel
      .findOne({
        $or: [{ email: identifier }, { username: identifier }]
      })
      .select('+password')

    if (!user) {
      return next({
        status: 400,
        message: 'Incorrect email or password !'
      })
    }

    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) {
      return next({
        status: 400,
        message: 'Incorrect email or password !'
      })
    }

    const token = tokenGenerator(user._id)
    res.cookie(
      'token',
      token
      //      {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict'
      // }
    )

    return res.status(201).json({
      success: true,
      message: 'User logged in successfully !',
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        isVerified: user.isVerified,
        profilePic: user.profilePic
      }
    })
  } catch (err) {
    next(err)
  }
}

/**
 * @route POST api/auth/me
 * @description Gets the user detail
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFuntion} next
 */
export async function getMeController (req, res, next) {
  try {
    const { userId } = req.user
    if (!userId) {
      return next({
        status: 404,
        message: 'Id not found !'
      })
    }

    const user = await userModel.findById(userId)
    if (!user) {
      return next({
        status: 404,
        message: 'User not found !'
      })
    }

    const followerCount = await followModel.countDocuments({
      followee: userId
    })
    const followingCount = await followModel.countDocuments({
      follower: userId
    })

    const userData = {
      ...user.toObject(),
      followerCount,
      followingCount
    }

    return res.status(200).json({
      success: true,
      message: 'User fetched successfully !',
      user:userData
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @route POST api/auth/logout
 * @description Logs out an user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function logoutController (req, res, next) {
  try {
    res.clearCookie('token')
    return res.status(200).json({
      success: true,
      message: 'User logged out successfully !'
    })
  } catch (error) {
    next(error)
  }
}
