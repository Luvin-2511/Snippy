import { useParams } from 'react-router'
import Post from '../components/Post'
import { useEffect, useState } from 'react'
import usePost from '../hooks/usePost'

const PostPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const { handleGetPost } = usePost()

  useEffect(() => {
    const getPost = async ({postId}) => {
      const data = await handleGetPost({ postId })
      setPost(data.post)
    }
    getPost({postId})
  }, [postId])
  

  return (
    <div className='min-h-screen w-full bg-[#0b1014] flex justify-center'>
      <Post
        postData={post}
        userId=''
        handleDeletePost={() => {}}
        handleLikePost={() => {}}
        handleUnlikePost={() => {}}
      />
    </div>
  )
}

export default PostPage
