import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const Public = () => {
  const { user, loading } = useSelector(state => state.auth)

  if (loading) {
    return <div
        className={`
          loadingLiner
          ${loading ? 'animate-[Loading_0.7s_linear_forwards]' : ''}
          transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}
      ></div>
  }

  if (user) {
    return <Navigate to='/home' replace/>
  }

  return <Outlet />
}

export default Public
