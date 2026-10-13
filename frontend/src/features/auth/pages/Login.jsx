import { Link, useNavigate } from 'react-router'
import Footer from '../components/Footer'
import '../styles/auth.style.css'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()
  const { handleLogin } = useAuth()

  return (
    <div className='bg-[#0c1115] min-h-screen w-full flex flex-col justify-between'>
      <div
        className={`
          loadingLiner
          ${isSubmitting ? 'animate-[Loading_0.7s_linear_forwards]' : ''}
          transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}
      ></div>
      <div
        className='flex flex-col md:flex-row items-center justify-center
                      md:px-40 lg:pt-40
                      py-10 md:py-20 md:gap-10'
      >
        {/* LEFT IMAGE - hidden on phone */}
        <div className='hidden md:flex md:w-1/2 justify-center items-center'>
          <img
            className='md:w-[28vw] lg:w-[35vw]'
            src='./src/assets/Landing.png'
            alt=''
          />
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit(async data => {
            const { identifier, password } = data
            const res = await handleLogin(identifier, password)
            reset()
            if (res.success) {
              navigate('/home')
            }
          })}
          className='w-full md:w-2/3 flex flex-col items-center'
        >
          {/* LOGO */}
          <div className='flex items-center justify-center mb-6'>
            <img
              className='h-60 md:h-[13vw] lg:h-[8vw]'
              src='./src/assets/logobg.png'
              alt=''
            />
          </div>

          <div
            className='w-full text-3xl
                          text-white py-2 font-bold rounded-lg
                          flex items-center justify-center gap-3
                           mb-4'
          >
            Sign in
          </div>

          {errors.password && (
            <p className='text-sm text-red-500'>{errors.password.message}</p>
          )}
          {errors.identifier && (
            <p className='text-sm text-red-500'>{errors.identifier.message}</p>
          )}

          {/* INPUT FIELDS */}
          <div className='flex flex-col gap-4 w-[90vw] md:w-[30vw] lg:w-[20vw] mt-4'>
            <input
              className='rounded-xl text-white bg-[#121212]
              placeholder-[#A8A886]
              border border-gray-600
              px-4 py-3
              lg:rounded
              lg:text-sm
              text-sm md:text-base'
              type='text'
              placeholder='Username or email'
              {...register('identifier', {
                required: 'Username or email is required'
              })}
            />

            <input
              className='rounded-xl text-white bg-[#121212]
              placeholder-[#A8A886]
              border border-gray-600
                         px-4 py-3
                         lg:rounded
                         lg:text-sm
                         text-sm md:text-base'
              type='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters'
                }
              })}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            disabled={isSubmitting}
            type='submit'
            className={` ${
              isSubmitting
                ? 'bg-black hover:bg-black cursor-not-allowed'
                : 'bg-[#3847d0] hover:bg-[#2837c0] cursor-pointer'
            }  mt-5
            text-[#AFAFB3]
            rounded-md font-bold
                       w-[90vw] md:w-[30vw] lg:w-[20vw]
                       py-3 md:py-2 `}
          >
            {isSubmitting ? 'Logging account...' : 'Sign in'}
          </button>

          {/* FORGOT PASSWORD */}
          <div className='text-gray-400 text-sm mt-4 hover:underline cursor-pointer'>
            Forgot Password?
          </div>

          {/* SIGN UP */}
          <div className='text-white text-sm mt-4'>
            Don't have an account?{' '}
            <Link to='/register' className='text-blue-400'>
              Sign up
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default Login
