import { useEffect, useRef, useState } from 'react'
import useReel from '../hooks/useReel'
import { useSelector } from 'react-redux'
import Reel from '../components/Reel'

const Feed = () => {
  const feedRef = useRef(null)
  const { reels } = useSelector(state => state.reel)
  const [activeReelId, setActiveReelId] = useState(null)
  const { handleFetchFeed } = useReel()
  useEffect(() => {
    handleFetchFeed()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
             setActiveReelId(entry.target.dataset.id)
          }
        })
      },
      {
        root: feedRef.current,
        threshold: 0.8
      }
    )

    const items = feedRef.current.querySelectorAll('[data-reel]')
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [reels])

  return (
    <main
      ref={feedRef}
      className='mt-14 h-[calc(100dvh-7rem)] md:mt-0 md:ml-17 md:h-dvh scrollbar-none overflow-y-auto overscroll-contain snap-y snap-mandatory bg-black'
    >
      {reels.map(reel => {
        return (
          <div
            key={reel._id}
            data-reel
            data-id={reel._id}
            className='h-[calc(100dvh-7rem)] md:h-dvh snap-start snap-always'
          >
            <Reel reel={reel} isActive={activeReelId === reel._id} />
          </div>
        )
      })}
    </main>
  )
}

export default Feed