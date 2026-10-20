const PostSkeleton = () => {
  return (
    <div className='flex items-center justify-center w-full py-3 px-4 animate-pulse'>
      <div className='w-full max-w-[500px] border-b border-gray-800 pb-4 mb-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-full bg-gray-800' />
            <div className='flex flex-col gap-1.5'>
              <div className='h-3 w-24 rounded bg-gray-800' />
              <div className='h-2 w-12 rounded bg-gray-800' />
            </div>
          </div>
          <div className='h-5 w-5 rounded bg-gray-800' />
        </div>

        {/* Image */}
        <div className='w-full aspect-square rounded-sm mt-3 bg-gray-800' />

        {/* Action icons row */}
        <div className='mt-3 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='h-7 w-7 rounded-full bg-gray-800' />
            <div className='h-7 w-7 rounded-full bg-gray-800' />
            <div className='h-7 w-7 rounded-full bg-gray-800' />
          </div>
          <div className='h-7 w-7 rounded-full bg-gray-800' />
        </div>

        {/* Likes */}
        <div className='h-3 w-16 rounded bg-gray-800 mt-3' />

        {/* Caption */}
        <div className='flex flex-col gap-2 mt-3'>
          <div className='h-3 w-full rounded bg-gray-800' />
          <div className='h-3 w-3/5 rounded bg-gray-800' />
        </div>

        {/* View comments */}
        <div className='h-3 w-28 rounded bg-gray-800 mt-3' />

        {/* Comment input */}
        <div className='h-3 w-40 rounded bg-gray-800 mt-4' />
      </div>
    </div>
  )
}

export default PostSkeleton
