import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import usePost from '../hooks/usePost'
import { useNavigate } from 'react-router'

const EditProfile = () => {
  const { user } = useSelector(state => state.auth)
  const [previewImage, setPreviewImage] = useState(null)
  const photoInputRef = useRef()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()
  const navigate = useNavigate()
  const { handleProfileUpdate } = usePost()

  const handlePhotoChange = e => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }
  return (
    <div className='min-h-screen bg-[#0b1014] text-white flex'>
      <div className='flex-1 ml-0 md:ml-[72px] lg:ml-[244px] flex flex-col items-center'>
        <div className='w-full max-w-[660px] px-4 py-10'>
          <h1 className='text-2xl font-bold mb-8'>Edit profile</h1>

          {/* Avatar card */}
          <div className='flex items-center justify-between bg-[#262626] rounded-2xl px-4 py-3 mb-8'>
            <div className='flex items-center gap-3'>
              <div className='w-14 h-14 rounded-full bg-[#3a3a3a] overflow-hidden flex-shrink-0'>
                <img
                  src={
                    user.profilePic ||
                    'https://imgs.search.brave.com/4ylGyFHftwb4L0lI8e0UjPik144OMB1G-kzHqx0P_DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLWNp/cmNsZS1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMTAxOTAwMTku/cG5nP2Y9d2VicCZ3/PTEyOA'
                  }
                  alt='profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <p className='text-sm font-semibold'>{user.username}</p>
                <p className='text-sm text-gray-400'>{user.email}</p>
              </div>
            </div>
            <label
              className='bg-[#0095f6] cursor-pointer hover:bg-[#1aa3ff] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-xl'
              htmlFor='photo'
            >
              Change Photo
            </label>
            <input
              {...register('profilePic', {
                onChange: handlePhotoChange
              })}
              id='photo'
              type='file'
              hidden
            />
          </div>

          {/* Bio */}
          <div className='mb-8'>
            <h2 className='text-base font-bold mb-3'>Bio</h2>
            <div className='relative bg-[#262626] rounded-xl overflow-hidden'>
              <textarea
                {...register('bio', {
                  maxLength: {
                    value: 100,
                    message: 'Exceeded max length'
                  }
                })}
                placeholder='Bio'
                rows={4}
                className='w-full bg-transparent text-white placeholder:text-gray-500 text-sm px-4 pt-3 pb-7 resize-none focus:outline-none'
              >
                {user.bio}
              </textarea>
              <span className='absolute bottom-2 right-3 text-xs text-gray-500'>
                100
              </span>
            </div>
          </div>

          {errors.bio && (
            <p className='text-red text-xl'>{errors.bio.message}</p>
          )}
          {errors.profilePic && (
            <p className='text-red text-xl'>{errors.profilePic.message}</p>
          )}

          {/* Submit */}
          <button
            type='submit'
            onClick={handleSubmit(async data => {
              const { profilePic, bio } = data
              const formData = new FormData()
              formData.append('bio', bio)
              if (profilePic?.[0]) {
                formData.append('profilePic', profilePic[0])
              }

              const res = await handleProfileUpdate(formData)
              if (res.success) {
                navigate('/profile')
              }
            })}
            className={`w-full ${
              isSubmitting
                ? 'cursor-not-allowed bg-black'
                : 'bg-[#0095f6] hover:bg-[#1aa3ff] cursor-pointer'
            }  bg-[#0095f6] hover:bg-[#1aa3ff] active:bg-[#0081d6] transition-colors text-white text-sm font-bold py-3 rounded-xl`}
          >
            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
