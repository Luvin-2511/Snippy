import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router'
import logo from '../../../assets/logobg.png'
import useAuth from '../../Auth/Hooks/useAuth'
import { useSelector } from 'react-redux'

const Icon = {
  home: filled => (
    <svg
      viewBox='0 0 24 24'
      width='24'
      height='24'
      fill={filled ? 'currentColor' : 'none'}
      stroke='currentColor'
      strokeWidth={filled ? 0 : 2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894Z' />
    </svg>
  ),
  search: (
    <svg
      viewBox='0 0 24 24'
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='10.5' cy='10.5' r='8' />
      <line x1='16.5' y1='16.5' x2='22' y2='22' />
    </svg>
  ),
  reels: (
    <svg viewBox='0 0 24 24' width='24' height='24' fill='currentColor'>
      <path d='M22.935 7.468c-.063-1.36-.307-2.142-.512-2.67a5.341 5.341 0 0 0-1.27-1.95 5.345 5.345 0 0 0-1.95-1.27c-.53-.206-1.311-.45-2.672-.513C15.333 1.012 14.976 1 12 1s-3.333.012-4.532.065c-1.36.063-2.142.307-2.67.512-.77.298-1.371.69-1.95 1.27a5.36 5.36 0 0 0-1.27 1.95c-.206.53-.45 1.311-.513 2.672C1.012 8.667 1 9.024 1 12s.012 3.333.065 4.532c.063 1.36.307 2.142.512 2.67.297.77.69 1.372 1.27 1.95.58.581 1.181.974 1.95 1.27.53.206 1.311.45 2.672.513C8.667 22.988 9.024 23 12 23s3.333-.012 4.532-.065c1.36-.063 2.142-.307 2.67-.512a5.33 5.33 0 0 0 1.95-1.27 5.356 5.356 0 0 0 1.27-1.95c.206-.53.45-1.311.513-2.672.053-1.198.065-1.555.065-4.531s-.012-3.333-.065-4.532Zm-1.998 8.972c-.05 1.07-.228 1.652-.38 2.04-.197.51-.434.874-.82 1.258a3.362 3.362 0 0 1-1.258.82c-.387.151-.97.33-2.038.379-1.162.052-1.51.063-4.441.063s-3.28-.01-4.44-.063c-1.07-.05-1.652-.228-2.04-.38a3.354 3.354 0 0 1-1.258-.82 3.362 3.362 0 0 1-.82-1.258c-.151-.387-.33-.97-.379-2.038C3.011 15.28 3 14.931 3 12s.01-3.28.063-4.44c.05-1.07.228-1.652.38-2.04.197-.51.434-.875.82-1.26a3.372 3.372 0 0 1 1.258-.819c.387-.15.97-.329 2.038-.378C8.72 3.011 9.069 3 12 3s3.28.01 4.44.063c1.07.05 1.652.228 2.04.38.51.197.874.433 1.258.82.385.382.622.747.82 1.258.151.387.33.97.379 2.038C20.989 8.72 21 9.069 21 12s-.01 3.28-.063 4.44Zm-4.584-6.828-5.25-3a2.725 2.725 0 0 0-2.745.01A2.722 2.722 0 0 0 6.988 9v6c0 .992.512 1.88 1.37 2.379.432.25.906.376 1.38.376.468 0 .937-.123 1.365-.367l5.25-3c.868-.496 1.385-1.389 1.385-2.388s-.517-1.892-1.385-2.388Z' />
    </svg>
  ),
  messages: (
    <svg
      viewBox='0 0 24 24'
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z' />
      <line x1='7.488' y1='12.208' x2='15.515' y2='7.641' />
    </svg>
  ),
  bell: (
    <svg viewBox='0 0 24 24' width='24' height='24' fill='currentColor'>
      <path d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z' />
    </svg>
  ),
  plus: (
    <svg viewBox='0 0 24 24' width='24' height='24' fill='currentColor'>
      <path d='M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z' />
    </svg>
  ),
  close: (
    <svg
      viewBox='0 0 24 24'
      width='18'
      height='18'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='21' y1='3' x2='3' y2='21' />
      <line x1='21' y1='21' x2='3' y2='3' />
    </svg>
  )
}

const AVATAR =
  'https://imgs.search.brave.com/FOrjj-LAZECzR2vyFNpfW6DE4UrfNIdP43418R-_RiA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI3LzIvdXNlci1s/aW5lLWxvZ28tcG5n/X3NlZWtsb2dvLTI3/MjU4MS5wbmc'

const NavItem = ({
  icon,
  label,
  active,
  onClick,
  as: As = 'div',
  count = null
}) => (
  <As
    onClick={onClick}
    className={`relative flex items-center gap-3 h-12 px-3 rounded-lg cursor-pointer transition-colors hover:bg-neutral-900 ${
      active ? 'font-bold bg-neutral-900' : 'font-normal'
    }`}
  >
    {count !== null && count !== undefined && count > 0 && (
      <span className='absolute left-6 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-extrabold text-black'>
        {count}
      </span>
    )}
    <span className='shrink-0'>{icon}</span>
    <span className='hidden group-hover:inline whitespace-nowrap'>{label}</span>
  </As>
)

const Sidebar = () => {
  const {
    handleLogout,
    handleAllFollowCount,
    handleAllFollowRequests,
    handleAcceptFollow,
    handleRejectFollow
  } = useAuth()
  const navigate = useNavigate()
  const { user, followRequests } = useSelector(state => state.auth)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [metaOpen, setMetaOpen] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [notiCount, setNotiCount] = useState(0)
  const location = useLocation().pathname

  useEffect(() => {
    async function getCount () {
      const data = await handleAllFollowCount()
      setNotiCount(data)
    }
    getCount()
  }, [])

  const toggleSearch = () => {
    setSearchOpen(v => !v)
    setNotifOpen(false)
  }
  const toggleNotif = async () => {
    setNotifOpen(v => !v)
    setSearchOpen(false)
    await handleAllFollowRequests()
  }
  const toggleMore = () => setMoreOpen(v => !v)
  const toggleMeta = () => setMetaOpen(v => !v)

  const overlayOpen = searchOpen || notifOpen

  return (
    <div className='text-white'>
      {/* Desktop side rail */}
      <aside
        className={`group hidden md:flex flex-col justify-between h-screen w-17 hover:w-64 z-40 bg-[#0b1014] shrink-0 border-r border-neutral-800 transition-all duration-300 ${
          overlayOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <div>
          <NavLink to='/home' className='flex h-25 items-center px-4 mb-20'>
            <img src={logo} alt='' className='h-15 w-auto object-contain' />
          </NavLink>

          <nav className='flex flex-col gap-6 px-2'>
            <NavLink to='/home'>
              {({ isActive }) => (
                <NavItem
                  icon={Icon.home(true)}
                  active={isActive}
                  label='Home'
                />
              )}
            </NavLink>
            <NavLink to='/reel'>
              {({ isActive }) => (
                <NavItem active={isActive} icon={Icon.reels} label='Reels' />
              )}
            </NavLink>
            <NavLink to='/messages'>
              <NavItem
                icon={Icon.messages}
                label='Messages'
                onClick={() => setMsgOpen(true)}
              />
            </NavLink>
            <NavItem
              icon={Icon.search}
              label='Search'
              onClick={toggleSearch}
              active={searchOpen}
            />
            <NavItem
              count={notiCount}
              icon={Icon.bell}
              label='Notifications'
              onClick={toggleNotif}
              active={notifOpen}
            />
            <NavLink to='/create-post'>
              {({ isActive }) => (
                <NavItem icon={Icon.plus} active={isActive} label='Create' />
              )}
            </NavLink>
            <NavLink to='/profile'>
              {({ isActive }) => (
                <NavItem
                  active={isActive}
                  icon={
                    <img
                      src={user?.profilePic || AVATAR}
                      alt=''
                      className='h-6 w-6 rounded-full object-cover'
                    />
                  }
                  label='Profile'
                />
              )}
            </NavLink>
          </nav>
        </div>

        {/* Bottom section: More / Also from Meta */}
        <div className='relative px-2 pb-6'>
          <NavItem
            icon={
              <svg
                viewBox='0 0 24 24'
                width='24'
                height='24'
                fill='currentColor'
              >
                <path d='M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z' />
              </svg>
            }
            label='More'
            onClick={toggleMore}
            active={moreOpen}
          />

          {moreOpen && (
            <div className='absolute bottom-14 left-2 w-64 rounded-2xl bg-neutral-900 py-2 shadow-lg'>
              {[
                'Settings',
                'Your activity',
                'Saved',
                'Switch appearance',
                'Report a problem'
              ].map(label => (
                <div
                  key={label}
                  className='flex items-center h-11 px-4 text-sm hover:bg-neutral-800 cursor-pointer'
                >
                  {label}
                </div>
              ))}
              <div className='my-1 border-t border-neutral-800' />
              <div className='flex items-center h-11 px-4 text-sm font-medium hover:bg-neutral-800 cursor-pointer'>
                Switch accounts
              </div>
              <div className='border-t border-neutral-800' />
              <div
                onClick={async () => {
                  const res = await handleLogout()
                  if (res.success) {
                    navigate('/')
                  }
                }}
                className='flex items-center h-11 px-4 text-sm font-medium hover:bg-neutral-800 cursor-pointer'
              >
                Log out
              </div>
            </div>
          )}

          <NavItem
            icon={
              <svg
                viewBox='0 0 24 24'
                width='24'
                height='24'
                fill='currentColor'
              >
                <path d='M9.5 11h5c1.379 0 2.5-1.122 2.5-2.5v-5C17 2.122 15.879 1 14.5 1h-5A2.503 2.503 0 0 0 7 3.5v5C7 9.878 8.12 11 9.5 11Zm-1 2h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm11.5 0h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Z' />
              </svg>
            }
            label='Also from Meta'
            onClick={toggleMeta}
            active={metaOpen}
          />

          {metaOpen && (
            <div className='absolute bottom-2 left-2 w-64 rounded-2xl bg-neutral-900 py-2 shadow-lg'>
              <div className='flex items-center gap-3 h-14 px-4 text-sm hover:bg-neutral-800 cursor-pointer'>
                Meta AI
              </div>
              <div className='flex items-center gap-3 h-14 px-4 text-sm hover:bg-neutral-800 cursor-pointer'>
                Threads
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile top bar: logo left, messages right */}
      <header className='md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-neutral-800 bg-[#0b1014] px-4'>
        <NavLink to='/home' className='flex items-center'>
          <img src={logo} alt='' className='h-9 w-auto object-contain' />
        </NavLink>
        <NavLink to='/messages' className='p-2'>
          {({ isActive }) => (
            <span className={isActive ? 'text-white' : 'text-neutral-200'}>
              {Icon.messages}
            </span>
          )}
        </NavLink>
      </header>

      {/* Mobile bottom bar (fewer icons) */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-neutral-800 bg-[#0b1014]'>
        <NavLink to='/home' className='p-3'>
          {({ isActive }) => (
            <span className={isActive ? 'text-white' : 'text-neutral-400'}>
              {Icon.home(isActive)}
            </span>
          )}
        </NavLink>
        <NavLink to='/reel' className='p-3'>
          {({ isActive }) => (
            <span className={isActive ? 'text-white' : 'text-neutral-400'}>
              {Icon.reels}
            </span>
          )}
        </NavLink>
        <NavLink to='/create-post' className='p-3'>
          {({ isActive }) => (
            <span className={isActive ? 'text-white' : 'text-neutral-400'}>
              {Icon.plus}
            </span>
          )}
        </NavLink>
        <button onClick={toggleNotif} className='relative p-3'>
          {notiCount > 0 && (
            <span className='absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-extrabold text-black'>
              {notiCount}
            </span>
          )}
          <span className={notifOpen ? 'text-white' : 'text-neutral-400'}>
            {Icon.bell}
          </span>
        </button>
        <NavLink to='/profile' className='p-3'>
          <img
            src={user?.profilePic || AVATAR}
            alt=''
            className='h-6 w-6 rounded-full object-cover'
          />
        </NavLink>
      </nav>

      {/* Notifications panel */}
      <aside
        className={`block fixed top-0 left-0 z-40 h-screen w-full md:w-100 border-r border-neutral-800 bg-neutral-950 p-6 transition-transform duration-300 ${
          notifOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold'>Notifications</h2>
        </div>
        <p className='text-sm font-semibold text-neutral-400 mb-3'>
          Follow Requests
        </p>
        {followRequests && followRequests.length > 0 ? (
          <div className='space-y-3'>
            {followRequests.map(follow => (
              <div
                key={follow._id}
                className='flex items-center gap-3 rounded-xl p-3 hover:bg-neutral-900 transition-colors'
              >
                {/* Profile */}
                <img
                  src={follow.follower.profilePic}
                  alt={follow.follower.username}
                  className='h-11 w-11 shrink-0 rounded-full object-cover'
                />

                {/* Username */}
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-semibold'>
                    {follow.follower.username}
                  </p>

                  <p className='text-xs text-neutral-500'>
                    wants to follow you
                  </p>
                </div>

                {/* Actions */}
                <div className='flex gap-2'>
                  <button
                    onClick={async () => {
                      await handleAcceptFollow({
                        followerId: follow.follower._id
                      })
                    }}
                    className='rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-black hover:bg-neutral-200 transition'
                  >
                    Accept
                  </button>

                  <button
                    onClick={async () => {
                      await handleRejectFollow({
                        followerId: follow.follower._id
                      })
                    }}
                    className='rounded-lg border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition'
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-neutral-500 text-center mt-8'>
            No new follow requests
          </p>
        )}
        {notifOpen && (
          <div
            onClick={() => {
              setNotifOpen(false)
            }}
            className='absolute right-3 top-3 md:-right-10 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center h-9 w-9 bg-neutral-800 hover:bg-neutral-700 active:scale-95 cursor-pointer rounded-md md:rounded-l-none md:rounded-r-md transition-all duration-150 shadow-md'
          >
            <svg
              viewBox='0 0 24 24'
              className='h-5 w-5'
              fill='none'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M15 6l-6 6 6 6' />
            </svg>
          </div>
        )}
      </aside>

      {location !== '/messages' && (
        <>
          {msgOpen && (
            <div className='hidden md:flex flex-col fixed bottom-4 right-4 w-80 h-96 rounded-xl bg-neutral-900 shadow-2xl z-50'>
              <div className='flex items-center justify-between h-14 px-4 border-b border-neutral-800'>
                <h3 className='font-bold'>Messages</h3>

                <button
                  onClick={() => setMsgOpen(false)}
                  className='p-1 hover:opacity-70'
                >
                  {Icon.close}
                </button>
              </div>

              <div className='flex-1 flex items-center justify-center text-sm font-medium'>
                No messages yet.
              </div>
            </div>
          )}

          <button
            onClick={() => setMsgOpen(true)}
            className='hidden md:flex items-center gap-3 justify-around fixed bottom-8 right-8 h-14 px-6 rounded-full bg-neutral-800 hover:bg-neutral-700 font-bold'
          >
            {Icon.messages}
            Messages
          </button>
        </>
      )}
    </div>
  )
}

export default Sidebar
