import { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import ChatBox from '../components/ChatBox.jsx'
import { useSelector } from 'react-redux'
import useChat from '../hooks/useChat.jsx'
import { useEffect } from 'react'
import { socket } from '../../../socket/socket.js'

const getOtherUser = (chat, myId) =>
  String(chat.participant.user1._id) === String(myId)
    ? chat.participant.user2
    : chat.participant.user1

const Messages = () => {
  const [threads, setThreads] = useState({})
  const { user } = useSelector(state => state.auth)
  const { loading, allChats } = useSelector(state => state.chat)
  const { handleGetAllChats, handleGetMessages } = useChat()
  const [active, setActive] = useState(null)
  const [draft, setDraft] = useState('')

  const activeChat = allChats?.find(chat => chat._id === active)
  const activeUser = activeChat ? getOtherUser(activeChat, user._id) : null

  const messages = (active ? threads[active] || [] : []).map(m => ({
    me: String(m.sender) === String(user._id),
    text: m.message
  }))

  const openChat = async chatId => {
    setActive(chatId)
    setDraft('')
    const res = await handleGetMessages({ chatId })
    if (res?.messages) {
      setThreads(prev => ({ ...prev, [chatId]: [...res.messages].reverse() }))
    }
  }

  const send = () => {
    const text = draft.trim()
    if (!text || !active) return
    socket.emit('sendMessage', { chatId: active, message: text }, res => {
      if (!res.success) console.error(res.message)
    })
    setDraft('')
  }

  useEffect(() => {
    if (!user) return

    const onNewMessage = ({ chatId, newMessage }) => {
      setThreads(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), newMessage]
      }))
      handleGetAllChats()
    }

    socket.connect()
    socket.on('newMessage', onNewMessage)

    return () => {
      socket.off('newMessage', onNewMessage)
      socket.disconnect()
    }
  }, [user?._id])

  useEffect(() => {
    handleGetAllChats()
  }, [])

  return (
    <div className='flex h-dvh w-full bg-[#0b0f14] text-white lg:pl-20'>
      {/* Sidebar */}
      <aside
        className={`${
          active ? 'hidden md:flex' : 'flex'
        } w-full flex-col border-r border-white/10 md:max-w-[400px]`}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 pb-3 pt-8'>
          <button className='flex items-center gap-2 text-xl font-bold'>
            {user.username}
            <svg
              viewBox='0 0 24 24'
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M6 9l6 6 6-6' />
            </svg>
          </button>
          <button className='text-white/90 transition hover:text-white'>
            <svg
              viewBox='0 0 24 24'
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5' />
              <path d='M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className='px-3'>
          <div className='flex items-center gap-3 rounded-full bg-white/[0.08] px-4 py-3'>
            <svg
              viewBox='0 0 24 24'
              className='h-5 w-5 text-white/60'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
            >
              <circle cx='11' cy='11' r='7' />
              <path d='M20 20l-3.5-3.5' />
            </svg>
            <span className='text-base text-white/50'>Search</span>
          </div>
        </div>

        {/* Note */}
        <div className='px-6 pt-6'>
          <div className='relative inline-flex w-[72px] flex-col items-center'>
            <div className='absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white/10 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur'>
              Your turn…
            </div>
            <div className='mt-6 flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-neutral-200'>
              <img
                className='h-full w-full object-cover'
                src={
                  user.profilePic ||
                  'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'
                }
                alt='profile_Pic'
              />
            </div>
            <span className='mt-1.5 text-xs text-white/60'>Your note</span>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex items-center justify-between px-6 pb-2 pt-6'>
          <span className='text-base font-semibold'>Messages</span>
        </div>

        {/* Chat list */}
        <div className='flex-1 overflow-y-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {allChats?.map(chat => {
            const other = getOtherUser(chat, user._id)
            return (
              <div
                key={chat._id}
                onClick={() => openChat(chat._id)}
                className={`flex cursor-pointer items-center gap-3 px-6 py-3 transition hover:bg-white/[0.05] ${
                  active === chat._id ? 'bg-white/[0.08]' : ''
                }`}
              >
                {/* <Avatar name={other.username} /> */}
                <img className='h-12 w-12 rounded-full' src={other?.profilePic || 'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'} alt="" />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-[15px] font-medium'>
                    {other.username}
                  </p>
                  <p className='truncate text-sm text-white/50'>
                    {chat.lastMessage}
                    {chat.lastMessageAt && (
                      <span className='text-white/40'>
                        {' '}
                        ·{' '}
                        {new Date(chat.lastMessageAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </aside>

      {/* Right pane */}
      <main
        className={`${
          active ? 'flex' : 'hidden md:flex'
        } min-w-0 flex-1 flex-col mt-13 mb-13 md:mb-0 lg:mb-0 lg:mt-0 md:mt-0`}
      >
        {activeUser && (
          <ChatBox
            chat={{ name: activeUser.username,profilePic:activeUser.profilePic }}
            messages={messages}
            draft={draft}
            onDraftChange={setDraft}
            onSend={send}
            onBack={() => setActive(null)}
          />
        )}
      </main>
    </div>
  )
}

export default Messages
