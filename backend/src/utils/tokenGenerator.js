import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'

export function tokenGenerator (userId) {
  const token = jwt.sign(
    {
      userId: userId
    },
    CONFIG.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  )
  return token
}
