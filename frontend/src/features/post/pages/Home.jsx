import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePost from '../hooks/usePost'
import Post from '../components/Post'
import PostSkeleton from '../components/PostSkeleton'
import { setPosts } from '../slices/post.slice'

const Feed = () => {
  const { posts, loading } = useSelector(state => state.post)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { handleGetPosts, handleDeletePost, handleLikePost, handleUnlikePost } =
    usePost()
  useEffect(() => {
    handleGetPosts()
  }, [])

  if (loading) {
    return (
      <div className='flex flex-col gap-5 justify-center items-center'>
        {Array(3)
          .fill(0)
          .map(() => {
            return <PostSkeleton />
          })}
      </div>
    )
  }

  const onDelete = async ({ postId }) => {
    const res = await handleDeletePost({ postId })
    if (res.success) {
      dispatch(setPosts(posts.filter(post => post._id !== postId)))
    }
    return res
  }

  return (
    <main className='min-w-full min-h-screen bg-[#0b1014] flex'>
      <div className='flex-1 mt-10 lg:mt-0 md:mt-0 flex flex-col items-center py-4'>
        <>
          {posts &&
            posts?.map(postData => {
              return (
                <Post
                  handleDeletePost={onDelete}
                  handleLikePost={handleLikePost}
                  handleUnlikePost={handleUnlikePost}
                  key={postData._id}
                  postData={postData}
                  userId={user._id}
                />
              )
            })}
        </>
        {/* } */}
      </div>
    </main>
  )
}

export default Feed
