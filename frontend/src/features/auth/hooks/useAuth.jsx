import { useDispatch } from 'react-redux'
import {
  acceptFollowRequest,
  getAllFollowCount,
  getAllFollowRequest,
  login,
  logout,
  me,
  register,
  rejectFollowRequest,
  unfollow,
  verify
} from '../services/auth.api'
import { setFollowRequests, setLoading, setUser } from '../slice/auth.slice'

const useAuth = () => {
  const dispatch = useDispatch()
  const handleRegister = async ({ email, password, username }) => {
    try {
      const res = await register({ email, password, username })
      return res
    } catch (err) {
      console.log(err)
    }
  }
  const handleVerify = async ({ email, otp }) => {
    try {
      const res = await verify({ email, otp })
      dispatch(setUser(res.user))
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogin = async (identifier, password) => {
    try {
      const res = await login(identifier, password)
      dispatch(setUser(res.user))
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handleMe = async () => {
    try {
      dispatch(setLoading(true))
      const res = await me()
      dispatch(setUser(res.user))
      return res
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true))
      const res = await logout()
      dispatch(setUser(null))
      return res
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleAllFollowRequests = async () => {
    try {
      const res = await getAllFollowRequest()
      dispatch(setFollowRequests(res.follow))
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handleAllFollowCount = async () => {
    try {
      const res = await getAllFollowCount()
      return res.count
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleUnfollow = async ({followerId}) => {
    try {
      const res = await unfollow({followerId})
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handleAcceptFollow = async ({ followerId }) => {
    try {
      const res = await acceptFollowRequest({ followerId })
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handleRejectFollow = async ({ followerId }) => {
    try {
      const res = await rejectFollowRequest({ followerId })
      return res
    } catch (err) {
      console.log(err)
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleVerify,
    handleMe,
    handleRejectFollow,
    handleAcceptFollow,
    handleLogout,
    handleAllFollowCount,
    handleUnfollow,
    handleAllFollowRequests
  }
}

export default useAuth
