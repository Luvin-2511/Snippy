import Imagekit from '@imagekit/nodejs'
import CONFIG from '../config/config.js'

const imageKit = new Imagekit({
  privateKey: CONFIG.IMAGEKIT_PRIVATE_KEY
})

export async function uploadContent (file) {
  return await imageKit.files.upload({
    file: file.buffer.toString('base64'),
    fileName: file.originalname,
    folder: '/snippy/posts'
  })
}

export async function uploadReel (file) {
  return await imageKit.files.upload({
    file: file.buffer.toString('base64'),
    fileName: file.originalname,
    folder: '/snippy/reels'
  })
}

export async function uploadProfilePic (file) {
  return await imageKit.files.upload({
    file: file.buffer.toString('base64'),
    fileName: file.originalname,
    folder: '/snippy/profile'
  })
}

export default imageKit
