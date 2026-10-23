import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import usePost from '../hooks/usePost'
import { useNavigate } from 'react-router'
import useReel from '../../reel/hooks/useReel'

const MAX_CAPTION = 2000
const MAX_FILES = 10

const ImageVideoIcon = () => (
  <svg
    width='80'
    height='70'
    viewBox='0 0 80 70'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      x='2'
      y='10'
      width='52'
      height='42'
      rx='4'
      stroke='white'
      strokeWidth='2.5'
      fill='none'
    />
    <circle
      cx='16'
      cy='24'
      r='5'
      stroke='white'
      strokeWidth='2.5'
      fill='none'
    />
    <path
      d='M2 40 L18 26 L32 38 L42 30 L54 40'
      stroke='white'
      strokeWidth='2.5'
      strokeLinejoin='round'
      fill='none'
    />
    <rect
      x='44'
      y='28'
      width='34'
      height='28'
      rx='4'
      stroke='white'
      strokeWidth='2.5'
      fill='#3a3a3a'
    />
    <polygon points='56,38 56,50 68,44' fill='white' />
  </svg>
)

const ReelIcon = () => (
  <svg width='60' height='80' viewBox='0 0 60 80' fill='none'>
    <rect
      x='2'
      y='2'
      width='56'
      height='76'
      rx='8'
      stroke='white'
      strokeWidth='2.5'
    />
    <polygon points='24,32 24,48 38,40' fill='white' />
  </svg>
)

const BackIcon = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M19 12H5M5 12L12 19M5 12L12 5' />
  </svg>
)

const ChevronIcon = ({ direction }) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline
      points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}
    />
  </svg>
)

export default function CreatePost () {
  const { user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.post)
  const { loading: reelLoading } = useSelector(state => state.reel)
  const [files, setFiles] = useState([])
  const [caption, setCaption] = useState('')
  const [previews, setPreviews] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [tab, setTab] = useState('post')
  const fileInputRef = useRef(null)
  const { handleCreatePost } = usePost()
  const { handleCreateReel } = useReel()

  const activePreview = previews[activeIndex] ?? null

  const handleFiles = files => {
    const incomingFiles = Array.from(files).slice(
      0,
      MAX_FILES - previews.length
    )

    if (incomingFiles.length === 0) return

    const incomingPreview = incomingFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image'
    }))
    setFiles(prev => [...prev, ...incomingFiles])
    setPreviews(prev => [...prev, ...incomingPreview])
    setActiveIndex(previews.length)
  }

  const handleSelect = e => {
    if (e.target.files?.length) handleFiles(e.target.files)
    e.target.value = ''
  }

  const removeActive = () => {
    URL.revokeObjectURL(previews[activeIndex].url)
    setFiles(prev => prev.filter((_, i) => i !== activeIndex))
    setPreviews(prev => prev.filter((_, i) => i !== activeIndex))
    setActiveIndex(i => Math.max(0, i - 1))
  }

  const handleClearAll = () => {
    previews.forEach(p => URL.revokeObjectURL(p.url))
    setPreviews([])
    setActiveIndex(0)
    setCaption('')
  }
  void handleClearAll

  const navigate = useNavigate()
  const onSubmit = async () => {
    const formData = new FormData()
    formData.append('caption', caption)
    let res
    if (tab === 'reel') {
      formData.append('reel', files[0])
      res = await handleCreateReel(formData)
    } else {
      files.forEach(file => {
        formData.append('content', file)
      })
      res = await handleCreatePost(formData)
    }
    if (res.success) {
      setCaption('')
      setFiles([])
      setPreviews([])
      navigate('/home')
    }
  }

  const goPrev = () => setActiveIndex(i => Math.max(0, i - 1))
  const goNext = () => setActiveIndex(i => Math.min(previews.length - 1, i + 1))

  return (
    <>
      <div className='flex items-center justify-center min-h-dvh bg-[#121212] p-3 pb-20 md:p-0'>
        <div className='flex flex-col md:flex-row rounded-2xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-2xl w-full max-w-[820px] md:min-h-[540px]'>
          {/* LEFT */}
          <div className='relative w-full md:flex-1 flex flex-col items-center justify-center bg-[#181818] overflow-hidden min-h-[360px] md:min-h-[540px]'>
            <button
              onClick={() => {
                navigate('/home')
              }}
              className='absolute top-3.5 left-3.5 z-10 w-9 h-9 rounded-lg bg-[#0095f6] hover:bg-[#1aa3ff] active:bg-[#0081d6] active:scale-[0.98] text-white flex items-center justify-center transition-colors'
            >
              <BackIcon />
            </button>

            {activePreview ? (
              <div
                className={`relative h-[360px] md:h-[540px] ${
                  tab === 'reel'
                    ? 'aspect-[9/16] rounded-xl overflow-hidden'
                    : 'w-full'
                }`}
              >
                {activePreview.type === 'image' ? (
                  <img
                    src={activePreview.url}
                    alt='preview'
                    className='w-full h-full object-contain bg-[#111]'
                  />
                ) : (
                  <video
                    src={activePreview.url}
                    controls
                    className='w-full h-full object-contain bg-[#111]'
                  />
                )}

                {/* Remove current slide */}
                <button
                  onClick={removeActive}
                  className='absolute top-3 right-3 w-[30px] h-[30px] rounded-full bg-black/60 hover:bg-black/85 text-white text-xl leading-none flex items-center justify-center backdrop-blur-md transition-colors'
                >
                  ×
                </button>

                {/* Carousel arrows — only when there's more than one slide */}
                {previews.length > 1 && (
                  <>
                    {activeIndex > 0 && (
                      <button
                        onClick={goPrev}
                        className='absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-colors'
                      >
                        <ChevronIcon direction='left' />
                      </button>
                    )}
                    {activeIndex < previews.length - 1 && (
                      <button
                        onClick={goNext}
                        className='absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-colors'
                      >
                        <ChevronIcon direction='right' />
                      </button>
                    )}

                    {/* Dots */}
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5'>
                      {previews.map((_, i) => (
                        <span
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            i === activeIndex ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Add more — only while under the cap */}
                {previews.length < MAX_FILES && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className='absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white text-lg leading-none flex items-center justify-center backdrop-blur-md transition-colors'
                  >
                    +
                  </button>
                )}
              </div>
            ) : (
              <div className='flex flex-col items-center gap-[18px] p-10'>
                {tab === 'reel' ? <ReelIcon /> : <ImageVideoIcon />}
                <p className='m-0 text-white/75 text-lg font-light tracking-tight'>
                  {tab === 'reel'
                    ? 'Select videos to share as a reel'
                    : 'Select photos and videos to share'}
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='inline-flex items-center justify-center px-[22px] py-[9px] rounded-lg bg-[#0095f6] hover:bg-[#1aa3ff] active:bg-[#0081d6] active:scale-[0.98] text-white text-sm font-semibold tracking-wide transition-colors'
                >
                  Select from computer
                </button>
                <p className='m-0 text-white/30 text-xs'>
                  {tab === 'reel'
                    ? 'Add a reel'
                    : `Up to ${MAX_FILES} photos or videos`}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className='w-full md:w-[300px] flex flex-col border-t md:border-t-0 md:border-l border-white/10'>
            <div className='border-b border-white/10'>
              <div className='py-4 px-5 text-center text-white/90 text-[15px] font-semibold'>
                {tab === 'post' ? 'Create new post' : 'Create new reel'}
              </div>
              <div className='flex'>
                {['post', 'reel'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 text-[13px] font-semibold border-b-2 transition-colors ${
                      tab === t
                        ? 'text-white border-white'
                        : 'text-white/40 border-transparent hover:text-white/70'
                    }`}
                  >
                    {t === 'post' ? 'Post' : 'Reel'}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center gap-2.5 px-4 py-3 border-b border-white/10'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 via-pink-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0'>
                {user.username[0].toUpperCase()}
              </div>
              <span className='text-[13px] font-semibold text-white/90'>
                {user.username}
              </span>
              <span className='text-sm text-gray-500 truncate min-w-0'>
                {user.email}
              </span>
            </div>

            <div className='flex-1 flex flex-col px-4 pt-3.5'>
              <input
                value={caption}
                onChange={e => setCaption(e.target.value.slice(0, MAX_CAPTION))}
                placeholder={
                  tab === 'reel'
                    ? 'Write a reel caption...'
                    : 'Write a caption...'
                }
                className='flex-1 bg-transparent border-none outline-none text-white/85 text-[13.5px] leading-relaxed min-h-[80px] md:min-h-[155px] placeholder-white/25'
              />
              <div className='flex justify-between items-center py-2 border-t border-white/10 mt-1.5'>
                <span className='text-lg leading-none cursor-pointer'>😊</span>
                <span className='text-[11px] text-white/25'>
                  {caption.length} / {MAX_CAPTION.toLocaleString()}
                </span>
              </div>
            </div>

            <div className='px-4 pt-3.5 pb-[18px] border-t border-white/10'>
              <button
                onClick={onSubmit}
                disabled={previews.length === 0 || loading || reelLoading}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  loading || reelLoading
                    ? 'bg-black text-white cursor-not-allowed'
                    : previews.length > 0
                    ? 'bg-[#0095f6] hover:bg-[#1aa3ff] active:bg-[#0081d6] active:scale-[0.98] text-white'
                    : 'bg-[#0095f6]/25 text-white/30 cursor-not-allowed'
                }`}
              >
                {loading || reelLoading
                  ? 'Posting...'
                  : tab === 'reel'
                  ? 'Share reel'
                  : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*,video/*'
        multiple
        className='hidden'
        onChange={handleSelect}
      />
    </>
  )
}