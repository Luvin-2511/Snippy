const Footer = () => {
  const footerLinks = [
    'About',
    'Blog',
    'Jobs',
    'Help',
    'API',
    'Privacy',
    'Terms',
    'Locations',
    'Snippy Lite',
    'Snippy AI',
    'Snippy AI Articles',
    'Threads',
    'Contact Uploading & Non-Users',
    'Snippy Verified'
  ]
  
  return (
    <div>
      <div className='footer w-[60vw] relative bottom-[1.7vw] h-[2vw] m-auto'>
        <div className='first flex items-center justify-center gap-[0.9vw]'>
          {footerLinks.map((footerTag, idx) => {
            return (
              <div
                key={idx}
                className='cont text-gray-400 font-sm text-[0.69vw] cursor-pointer hover:underline'
              >
                {footerTag}
              </div>
            )
          })}
        </div>
        <div className='second flex items-center justify-center gap-[1vw] mt-[1.2vw]'>
          <div className='cont text-gray-400 font-sm text-[0.69vw]'>
            English
          </div>
          <div className='cont text-gray-400 font-sm text-[0.69vw]'>
            © 2026 Snippy from Luvin
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
