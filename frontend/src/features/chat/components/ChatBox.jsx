import { useEffect, useRef } from 'react'
import Avatar from './Avatar.jsx'

const ChatBox = ({ chat, messages, draft, onDraftChange, onSend, onBack }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.name, messages.length])

  return (
    <>
      {/* Header */}
      <div className='flex items-center gap-3 border-b border-white/10 px-4 py-3 md:px-6'>
        <button onClick={onBack} className='mr-1 md:hidden'>
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M15 5l-7 7 7 7' />
          </svg>
        </button>
        <img
          className='h-12 w-12 rounded-full object-cover'
          src={
            chat.profilePic ||
            'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'
          }
          alt=''
        />

        <div className='min-w-0 flex-1'>
          <p className='truncate text-[15px] font-semibold'>{chat.name}</p>
          <p className='text-xs text-white/50'>
            {chat.online ? 'Active now' : 'Active recently'}
          </p>
        </div>
        <div className='flex items-center gap-5 text-white/90'>
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z' />
          </svg>
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <rect x='2' y='6' width='14' height='12' rx='3' />
            <path d='M16 10.5l6-3v9l-6-3' />
          </svg>
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
          >
            <circle cx='12' cy='12' r='9.5' />
            <path d='M12 11v6' strokeLinecap='round' />
            <circle cx='12' cy='7.5' r='0.6' fill='currentColor' />
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div className='flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-6 md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <div className='mb-6 flex flex-col items-center text-center'>
          <img
            className='h-20 w-20 rounded-full object-cover'
            src={
              chat.profilePic ||
              'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'
            }
            alt=''
          />
          <p className='mt-3 text-lg font-semibold'>{chat.name}</p>
          <p className='text-sm text-white/50'>Snippy</p>
          <button className='mt-3 rounded-lg bg-white/10 px-4 py-1.5 text-sm font-semibold transition hover:bg-white/20'>
            View profile
          </button>
        </div>

        {messages.map((m, i) => {
          const nextSame = messages[i + 1]?.me === m.me
          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                m.me ? 'justify-end' : 'justify-start'
              }`}
            >
              {!m.me && (
                <div className='w-7 shrink-0'>
                  {!nextSame && (
                    <Avatar
                      name={chat.name}
                      color={chat.color}
                      size='h-7 w-7'
                      text='text-xs'
                    />
                  )}
                </div>
              )}
              <div
                className={`max-w-[75%] break-words rounded-3xl px-4 py-2 text-[15px] leading-snug md:max-w-[60%] ${
                  m.me ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white'
                }`}
              >
                {m.text}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className='px-4 pb-5 pt-2 md:px-6'>
        <div className='flex items-center gap-3 rounded-full border border-white/15 px-4 py-2.5'>
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6 shrink-0 text-white/80'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          >
            <circle cx='12' cy='12' r='9.5' />
            <path d='M8 14.5s1.5 2 4 2 4-2 4-2' />
            <circle cx='9' cy='10' r='0.8' fill='currentColor' />
            <circle cx='15' cy='10' r='0.8' fill='currentColor' />
          </svg>
          <input
            value={draft}
            onChange={e => onDraftChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSend()}
            placeholder='Message...'
            className='min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder-white/50 outline-none'
          />
          {draft.trim() ? (
            <button
              onClick={onSend}
              className='text-[15px] font-semibold text-indigo-400 transition hover:text-indigo-300'
            >
              Send
            </button>
          ) : (
            <svg
              viewBox='0 0 24 24'
              className='h-6 w-6 shrink-0 text-white/80'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='3' y='4' width='18' height='16' rx='3' />
              <circle cx='9' cy='10' r='1.6' />
              <path d='M21 16l-5-5-9 9' />
            </svg>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatBox
