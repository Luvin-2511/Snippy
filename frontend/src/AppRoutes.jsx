import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Authlayout from './features/shared/layout/Authlayout'
import Mainlayout from './features/shared/layout/Mainlayout'
import Home from './features/post/pages/Home'
import Public from './features/shared/components/Public'
import { useEffect } from 'react'
import useAuth from './features/auth/hooks/useAuth'
import Protected from './features/shared/components/Protected'
import Profile from './features/post/pages/Profile'
import EditProfile from './features/post/pages/EditProfile'
import CreatePost from './features/post/pages/CreatePost'
import Feed from './features/reel/pages/Feed'
import Messages from './features/chat/pages/Messages'
import UserPage from './features/post/pages/UserPage'
import PostPage from './features/post/pages/PostPage'

const AppRoutes = () => {
  const { handleMe } = useAuth()
  useEffect(() => {
    handleMe()
  }, [])

  const router = createBrowserRouter([
    {
      path: '',
      element: <Public />,
      children: [
        {
          path: '',
          element: <Authlayout />,
          children: [
            {
              path: '',
              element: <Login />
            },
            {
              path: '/register',
              element: <Register />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <Protected />,
      children: [
        {
          path: '',
          element: <Mainlayout />,
          children: [
            {
              path: 'home',
              element: <Home />
            },
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'edit-profile',
              element: <EditProfile />
            },
            {
              path: 'create-post',
              element: <CreatePost />
            },
            {
              path: 'reel',
              element: <Feed />
            },
            {
              path: 'messages',
              element: <Messages />
            },
            {
              path: 'user/:userId',
              element: <UserPage />
            },
            {
              path: 'post/:postId',
              element: <PostPage />
            },
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default AppRoutes
