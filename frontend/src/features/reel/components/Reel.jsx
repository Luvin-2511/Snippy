import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

const HeartIcon = () => (
  <svg
    viewBox='0 0 24 24'
    className='h-7 w-7'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinejoin='round'
  >
    <path d='M12 20.5s-7.5-4.6-9.3-9.3C1.4 7.7 3.4 4.5 6.7 4.5c2 0 3.7 1.1 5.3 3 1.6-1.9 3.3-3 5.3-3 3.3 0 5.3 3.2 4 6.7-1.8 4.7-9.3 9.3-9.3 9.3z' />
  </svg>
)

const CommentIcon = () => (
  <svg
    viewBox='0 0 24 24'
    className='h-7 w-7'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinejoin='round'
  >
    <path d='M12 3.5c-5 0-8.5 3.4-8.5 7.8 0 2 .8 3.8 2.1 5.1L4.8 20.5l4-1.6c1 .3 2 .4 3.2.4 5 0 8.5-3.4 8.5-7.8S17 3.5 12 3.5z' />
  </svg>
)

const RepostIcon = () => (
  <svg
    viewBox='0 0 24 24'
    className='h-7 w-7'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M17 3l3 3-3 3' />
    <path d='M4 11V9.5A3.5 3.5 0 0 1 7.5 6H20' />
    <path d='M7 21l-3-3 3-3' />
    <path d='M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H4' />
  </svg>
)

const SendIcon = () => (
  <svg
    viewBox='0 0 24 24'
    className='h-7 w-7'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinejoin='round'
  >
    <path d='M21 3L3 9.5l7.5 3L13.5 21 21 3z' />
    <path d='M10.5 12.5L21 3' />
  </svg>
)

const BookmarkIcon = () => (
  <svg
    viewBox='0 0 24 24'
    className='h-7 w-7'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinejoin='round'
  >
    <path d='M6 3.5h12v17l-6-4.5-6 4.5v-17z' />
  </svg>
)

const MutedIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='currentColor'>
    <path d='M3 9v6h4l5 4V5L7 9H3z' />
    <path
      d='M16 9l5 6m0-6l-5 6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      fill='none'
    />
  </svg>
)

const UnMutedIcon = () => (
  <svg viewBox='0 0 24 24' className='h-5 w-5' fill='currentColor'>
    <path d='M3 9v6h4l5 4V5L7 9H3z' />
    <path
      d='M16 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      fill='none'
    />
  </svg>
)

const Action = ({ icon, count }) => (
  <div className='flex flex-col items-center gap-1 text-white'>
    {icon}
    {count !== undefined && <span className='text-xs'>{count}</span>}
  </div>
)

const Reel = ({ reel, isActive }) => {
  const navigate = useNavigate()
  const [reelPlay, setReelPlay] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const reelRef = useRef()

  useEffect(() => {
    if (!isActive) {
      setReelPlay(false)
      reelRef.current?.pause()
      return
    }
    setReelPlay(true)
  }, [isActive])

  useEffect(() => {
    if (!reelRef.current) return

    if (reelPlay) {
      reelRef.current.play().catch(() => {})
    } else {
      reelRef.current.pause()
    }
  }, [reelPlay])

  return (
    <div className='flex h-full snap-start w-full items-center justify-center p-0 md:p-4'>
      <div className='relative flex h-full w-full items-end gap-6 md:h-[calc(100vh-2rem)] md:w-auto'>
        {/* Author + caption */}
        <div className='hidden w-[380px] pl-10 pb-2 lg:block'>
          <div
            onClick={() => {
              navigate(`/user/${reel.user._id}`)
            }}
            className='flex items-center gap-3'
          >
            <img
              className='flex h-12 w-12 items-center object-cover justify-center rounded-full bg-white'
              src={reel.user.profilePic}
            />
            <span className='text-base font-semibold text-white'>
              {reel.user.username}
            </span>
            <svg
              viewBox='0 0 24 24'
              className='h-4 w-4 text-sky-500'
              fill='currentColor'
            >
              <path d='M12 1l2.5 2 3.2-.3 1.2 3 3 1.2-.3 3.2L23 12l-2 2.5.3 3.2-3 1.2-1.2 3-3.2-.3L12 23l-2.5-2-3.2.3-1.2-3-3-1.2.3-3.2L1 12l2-2.5-.3-3.2 3-1.2 1.2-3 3.2.3L12 1z' />
              <path
                d='M8 12.2l2.6 2.6L16 9.4'
                stroke='white'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-white/60'>•</span>
            <button className=' cursor-pointer text-base font-semibold text-indigo-400'>
              Follow
            </button>
          </div>
          <p className='mt-4 text-base leading-snug text-white'>
            {reel.reel.caption}
          </p>
        </div>

        {/* Video card */}
        <div
          onClick={() => {
            setReelPlay(prev => !prev)
          }}
          className='relative h-full w-full self-center flex items-center overflow-hidden bg-black md:h-auto md:w-auto md:rounded-xl md:bg-gradient-to-b md:shadow-2xl md:shadow-black/50'
        >
          <video
            className='block h-full w-full object-cover md:h-auto md:w-auto md:max-h-[calc(100vh-2rem)] md:object-contain'
            ref={reelRef}
            src={reel.reel.url}
            muted={isMuted}
            loop
            playsInline
          />
          <div
            className={` ${
              reelPlay && 'scale-0 transition-all transition-300'
            } absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm`}
          >
            <svg
              viewBox='0 0 24 24'
              className='ml-1 h-8 w-8 text-white'
              fill='currentColor'
            >
              <path d='M7 4.5v15l13-7.5L7 4.5z' />
            </svg>
          </div>

          {/* Mute button */}
          <button
            onClick={e => {
              e.stopPropagation()
              setIsMuted(prev => !prev)
            }}
            className='cursor-pointer absolute top-4 right-4 md:top-auto md:bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white'
          >
            {isMuted ? <MutedIcon /> : <UnMutedIcon />}
          </button>

          {/* Mobile-only author overlay */}
          <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pr-16 lg:hidden'>
            <span className='text-sm font-semibold text-white'>
              {reel.user.username}
            </span>
            <p className='mt-1 line-clamp-2 text-sm text-white'>
              {reel.reel.caption}
            </p>
          </div>
        </div>

        {/* Action rail */}
        <div className='absolute right-3 bottom-4 z-10 flex flex-col items-center gap-5 drop-shadow-md md:static md:pb-2 md:drop-shadow-none'>
          <Action icon={<HeartIcon />} count='0' />
          <Action icon={<CommentIcon />} count='0' />
          <Action icon={<RepostIcon />} count='0' />
          <Action icon={<SendIcon />} />
          <Action icon={<BookmarkIcon />} />
          <div className='flex gap-1 text-white'>
            <span className='h-1 w-1 rounded-full bg-white' />
            <span className='h-1 w-1 rounded-full bg-white' />
            <span className='h-1 w-1 rounded-full bg-white' />
          </div>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg border-2 border-white/80 bg-white'>
            <div className='h-3.5 w-3.5 -rotate-12 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-600' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reel