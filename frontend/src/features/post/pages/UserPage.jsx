import { useEffect, useState } from 'react'
import Footer from '../../Auth/components/Footer.jsx'
import usePost from '../hooks/usePost.jsx'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

const VerifiedBadge = () => (
  <svg fill='rgb(0, 149, 246)' height='16' viewBox='0 0 40 40' width='16'>
    <path
      d='M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z'
      fillRule='evenodd'
    />
  </svg>
)

const GridIcon = () => (
  <svg
    className='w-4 h-4'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
  >
    <path d='M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z' />
  </svg>
)

const HeartIcon = () => (
  <svg
    viewBox='0 0 24 24'
    className='h-5 w-5'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinejoin='round'
  >
    <path d='M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.8 4.5 6.4 4.5c2 0 3.6 1.1 4.4 2.6l1.2 1.9 1.2-1.9c.8-1.5 2.4-2.6 4.4-2.6 3.6 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z' />
  </svg>
)

const TAGGED_ICON = (
  <svg
    className='w-7 h-7 text-white'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
    <circle cx='12' cy='7' r='4' />
  </svg>
)

const TABS = [
  { key: 'posts', icon: <GridIcon /> },
  { key: 'likes', icon: <HeartIcon /> }
]

const EmptyState = ({ icon, title, subtitle, action }) => (
  <div className='flex flex-col items-center justify-center py-16 md:py-20 gap-4'>
    <div className='w-[62px] h-[62px] rounded-full border-2 border-white flex items-center justify-center'>
      {icon}
    </div>
    <h2 className='text-2xl md:text-3xl font-extrabold tracking-tight'>
      {title}
    </h2>
    <p className='text-gray-400 text-sm text-center max-w-[280px]'>
      {subtitle}
    </p>
    {action}
  </div>
)

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('posts')
  const [followModal, setFollowModal] = useState(null)
  const [followExtract, setFollowExtract] = useState(null)
  const [followinExtract, setFollowinExtract] = useState(null)
  const [likedPost, setLikedPost] = useState([])
  const [likedLoaded, setLikedLoaded] = useState(false)
  const {
    handleGetUserPostsById,
    handleGetFollowers,
    handleGetFollowing,
    handleGetLikedPostById
  } = usePost()
  const { userId } = useParams()
  const { currOpenPosts } = useSelector(state => state.post)
  const navigate = useNavigate()

  console.log('currOpen->',currOpenPosts);
  
  useEffect(() => {
    handleGetUserPostsById({ userId })
  }, [])

  return (
    <div className='min-h-screen bg-[#0b1014] text-white flex'>
      <div className='flex-1 md:ml-18 lg:ml-10 flex flex-col items-center'>
        <div className='w-full max-w-233.75 px-4 pt-8'>
          {/* Header */}
          <div className='flex items-center gap-4 md:gap-10 mb-6 px-2 md:px-4'>
            {/* Avatar */}
            <div className='relative shrink-0'>
              <div className='w-20 h-20 md:w-[150px] md:h-[150px] rounded-full bg-[#2a2a2a] flex items-center justify-center overflow-hidden border-2 border-gray-700 cursor-pointer group'>
                <img
                  src={
                    currOpenPosts?.posts?.[0]?.user?.profilePic ||
                    'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'
                  }
                  alt='profile'
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='hidden sm:block absolute -top-1 left-0 bg-[#1a1a1a] border border-gray-700 rounded-2xl px-2 py-1 text-xs text-gray-300 whitespace-nowrap'>
                Note...
              </div>
            </div>

            {/* User info */}
            <div className='flex flex-col gap-3 flex-1 min-w-0'>
              <div className='flex items-center gap-2 flex-wrap'>
                <h1 className='text-base md:text-xl font-light tracking-wide truncate'>
                  {currOpenPosts?.posts?.[0]?.user?.username}
                </h1>
                <VerifiedBadge />
              </div>

              <div className='flex items-center gap-4 md:gap-8'>
                <div className='flex flex-col sm:flex-row sm:gap-1 items-center text-sm'>
                  <span className='font-semibold'>{currOpenPosts?.posts?.length}</span>
                  <span className='text-gray-300 text-xs sm:text-sm'>
                    posts
                  </span>
                </div>
                <div
                  onClick={async () => {
                    setFollowModal('followers')
                    if (!followExtract) {
                      const data = await handleGetFollowers({ userId })
                      setFollowExtract(data.followerList)
                    }
                  }}
                  className='flex flex-col sm:flex-row sm:gap-1 items-center text-sm cursor-pointer hover:opacity-70 transition-opacity'
                >
                  <span className='font-semibold'>{currOpenPosts?.followerCount}</span>
                  <span className='text-gray-300 text-xs sm:text-sm'>
                    followers
                  </span>
                </div>
                <div
                  onClick={async () => {
                    setFollowModal('following')
                    if (!followinExtract) {
                      const data = await handleGetFollowing({ userId })
                      setFollowinExtract(data.followingList)
                    }
                  }}
                  className='flex flex-col sm:flex-row sm:gap-1 items-center text-sm cursor-pointer hover:opacity-70 transition-opacity'
                >
                  <span className='font-semibold'>{currOpenPosts?.followingCount}</span>
                  <span className='text-gray-300 text-xs sm:text-sm'>
                    following
                  </span>
                </div>
              </div>

              {/* Name + bio — desktop only */}
              <div className='hidden sm:flex flex-col gap-1'>
                <div className='text-sm font-semibold'>{currOpenPosts?.posts?.[0]?.user?.username}</div>
                {currOpenPosts?.posts?.[0]?.user?.bio ? (
                  <p className='text-sm text-white whitespace-pre-line leading-snug'>
                    {currOpenPosts?.posts?.[0]?.user?.bio}
                  </p>
                ) : (
                  <p
                    className='text-sm text-gray-500 cursor-pointer hover:text-gray-300 transition-colors'
                  >
                    + Add bio
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Name — mobile only */}
          <div className='sm:hidden text-sm font-semibold px-2 mb-4'>
            {currOpenPosts?.posts?.[0]?.user?.username}
          </div>

          {/* Buttons */}
          <div className='flex items-center gap-2 mb-6 px-2 md:px-4'>
            <button className='flex-1 bg-[#4150f7] cursor-pointer hover:bg-[#4170f0] transition-colors text-white text-sm font-semibold py-[7px] rounded-lg'>
              Follow
            </button>
            <button className='flex-1 bg-[#262626] cursor-pointer hover:bg-[#333] transition-colors text-white text-sm font-semibold py-[7px] rounded-lg'>
              Message
            </button>
          </div>

          {/* Highlights */}
          <div className='flex items-center gap-6 px-2 md:px-4 mb-6 overflow-x-auto pb-2'>
            <div className='flex flex-col items-center gap-1 flex-shrink-0'>
              <div className='w-[67px] h-[67px] md:w-[77px] md:h-[77px] rounded-full border-2 border-gray-700 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors bg-[#1a1a1a]'>
                <svg
                  className='w-7 h-7 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                >
                  <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
              </div>
              <span className='text-xs text-gray-300'>New</span>
            </div>
          </div>

          {/* Tabs */}
          <div className='flex items-center justify-around border-t border-gray-800 mb-1'>
            {TABS.map(({ key, icon }) => (
              <button
                key={key}
                onClick={async () => {
                  setActiveTab(key)
                  if (key === 'likes' && !likedLoaded) {
                    const data = await handleGetLikedPostById({userId})
                    setLikedPost(data)
                    setLikedLoaded(true)
                  }
                }}
                className={`flex items-center gap-1 py-3 px-4 md:px-8 text-xs font-semibold tracking-widest uppercase border-t-[1px] transition-colors ${
                  activeTab === key
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          {activeTab === 'posts' &&
            (currOpenPosts?.posts?.length > 0 ? (
              <div className='grid grid-cols-3 gap-[3px] mb-10'>
                {currOpenPosts?.posts?.map(post => (
                  <div onClick={()=> {
                    navigate(`/post/${post._id}`)
                  }}
                    key={post._id}
                    className='aspect-square overflow-hidden rounded cursor-pointer group relative'
                  >
                    <img
                      src={post.content[0].url}
                      alt=''
                      className='w-full h-full object-cover group-hover:opacity-80 transition-opacity'
                    />
                  </div>
                ))}
              </div>
            ) : (
                <></>
            ))}

          {activeTab === 'likes' &&
            (likedPost?.length > 0 ? (
              <div className='grid grid-cols-3 gap-[3px] mb-10'>
                {likedPost?.map(post => (
                  <div
                    onClick={() => {
                      navigate(`/post/${post.post._id}`)
                    }}
                    key={post._id}
                    className='aspect-square overflow-hidden rounded cursor-pointer group relative'
                  >
                    <img
                      src={post.post.content[0].url}
                      alt=''
                      className='w-full h-full object-cover group-hover:opacity-80 transition-opacity'
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<HeartIcon />}
                title='Like'
                subtitle='Liked photos and videos that you want to see again.'
              />
            ))}

          {activeTab === 'tagged' && (
            <EmptyState
              icon={TAGGED_ICON}
              title='Photos of you'
              subtitle="When people tag you in photos, they'll appear here."
            />
          )}

          {/* Bottom padding — clears the mobile bottom nav */}
          <div className='h-20 md:h-4' />
        </div>

        {/* Followers / Following dialog */}
        {followModal && (
          <div
            onClick={() => setFollowModal(null)}
            className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4'
          >
            <div
              onClick={e => e.stopPropagation()}
              className='bg-[#1a1f24] border border-gray-800 rounded-xl w-full max-w-md max-h-[70vh] flex flex-col'
            >
              {/* Header */}
              <div className='relative flex items-center justify-center py-3 border-b border-gray-800'>
                <h2 className='text-sm font-semibold capitalize'>
                  {followModal}
                </h2>
                <button
                  onClick={() => setFollowModal(null)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity'
                >
                  <svg
                    viewBox='0 0 24 24'
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  >
                    <path d='M18 6L6 18M6 6l12 12' />
                  </svg>
                </button>
              </div>

              {/* Search */}
              <div className='px-4 pt-3'>
                <div className='flex items-center gap-2 bg-[#262626] rounded-lg px-3 py-2'>
                  <svg
                    viewBox='0 0 24 24'
                    className='h-4 w-4 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <circle cx='11' cy='11' r='7' />
                    <path d='M21 21l-4.35-4.35' strokeLinecap='round' />
                  </svg>
                  <input
                    type='text'
                    placeholder='Search'
                    className='bg-transparent text-sm outline-none w-full placeholder-gray-500'
                  />
                </div>
              </div>

              {/* Body */}
              <div className='flex-1 overflow-y-auto px-4 py-2 mt-2'>
                {followModal === 'following' ? (
                  followinExtract?.length > 0 ? (
                    followinExtract.map(item => (
                      <div key={item._id} className='flex items-center justify-between py-2'>
                        <div
                          onClick={() => {
                            setFollowModal(null)
                            navigate(`/user/${item.followee._id}`)
                          }}
                          className='flex items-center gap-3 cursor-pointer min-w-0'
                        >
                          <img
                            src={
                              item.followee.profilePic ||
                              'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'
                            }
                            alt=''
                            className='w-11 h-11 rounded-full object-cover flex-shrink-0'
                          />
                          <span className='text-sm font-semibold truncate'>
                            {item.followee.username}
                          </span>
                        </div>
                        <button className='bg-[#262626] hover:bg-[#333] transition-colors text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex-shrink-0'>
                          Following
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className='flex flex-col items-center justify-center gap-3 text-center py-12'>
                      <div className='w-16 h-16 rounded-full border-2 border-white flex items-center justify-center'>
                        <svg
                          viewBox='0 0 24 24'
                          className='h-7 w-7'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.5'
                        >
                          <circle cx='9' cy='8' r='3.5' />
                          <path d='M3.5 20a5.5 5.5 0 0 1 11 0' />
                          <path d='M15 8h5M17.5 5.5v5' strokeLinecap='round' />
                        </svg>
                      </div>
                      <h3 className='text-xl font-bold'>People you follow</h3>
                      <p className='text-gray-400 text-sm max-w-[260px]'>
                        Once they follow people, you'll see them here.
                      </p>
                    </div>
                  )
                ) : followExtract?.length > 0 ? (
                  followExtract.map(item => (
                    <div key={item._id} className='flex items-center justify-between py-2'>
                      <div
                        onClick={() => {
                          setFollowModal(null)
                          navigate(`/user/${item.follower._id}`)
                        }}
                        className='flex items-center gap-3 cursor-pointer min-w-0'
                      >
                        <img
                          src={
                            item.follower.profilePic ||
                            'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'
                          }
                          alt=''
                          className='w-11 h-11 rounded-full object-cover flex-shrink-0'
                        />
                        <span className='text-sm font-semibold truncate'>
                          {item.follower.username}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center gap-3 text-center py-12'>
                    <div className='w-16 h-16 rounded-full border-2 border-white flex items-center justify-center'>
                      <svg
                        viewBox='0 0 24 24'
                        className='h-7 w-7'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'
                      >
                        <circle cx='9' cy='8' r='3.5' />
                        <path d='M3.5 20a5.5 5.5 0 0 1 11 0' />
                        <path d='M15 8h5M17.5 5.5v5' strokeLinecap='round' />
                      </svg>
                    </div>
                    <h3 className='text-xl font-bold'>No followers yet</h3>
                    <p className='text-gray-400 text-sm max-w-[260px]'>
                      When people follow them, you'll see them here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  )
}

export default UserPage