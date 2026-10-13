import { Link, useNavigate } from 'react-router'
import Footer from '../components/Footer'
import '../styles/auth.style.css'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { useRef } from 'react'

const Register = () => {
  const { handleRegister, handleVerify } = useAuth()
  const navigate = useNavigate()
  const inputsRef = useRef([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm()

  return (
    <div className='bg-[#0c1115] min-h-screen scrollbar-none flex flex-col justify-between'>
      <div
        className={`loadingLiner ${
          isSubmitting ? 'animate-[Loading_0.7s_linear_forwards]' : ''
        }
          transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}
      ></div>
      <div
        className='flex flex-col items-center justify-center
                      py-10 md:py-16 lg:py-20'
      >
        {/* REGISTER CARD */}
        {isSubmitSuccessful ? (
          <div
            className='min-w-[clamp(20rem,25vw,50rem)] md:w-[26vw] lg:w-[22vw]
                     border border-[#ffffff31]
                     flex flex-col items-center
                     px-6 py-8'
          >
            <h3 className='text-xl font-bold text-white mb-4'>
              Verify your email
            </h3>
            <p className='text-white font-semibold text-center'>
              Thanks for signing up! Enter the 6 digit code we've sent you in
              your mailbox !
            </p>
            <div className='otp-boxes flex w-[100%] gap-2 mt-5'>
              {Array(6)
                .fill(0)
                .map((_, ind) => {
                  const field = register(`code.${ind}`)
                  return (
                    <input
                      {...field}
                      ref={el => {
                        field.ref(el)
                        inputsRef.current[ind] = el
                      }}
                      key={ind}
                      className='rounded text-center font-extrabold py-2 border-2 w-1/6 border-white text-4xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white'
                      type='text'
                      onChange={e => {
                        if (e.target.value && ind < 5) {
                          inputsRef.current[ind + 1].focus()
                        }
                      }}
                      onKeyDown={e => {
                        if (
                          e.key === 'Backspace' &&
                          !e.currentTarget.value &&
                          ind > 0
                        ) {
                          inputsRef.current[ind - 1].focus()
                        }
                      }}
                      inputMode='numeric'
                      maxLength={1}
                    />
                  )
                })}
            </div>
            <button
              onClick={handleSubmit(async data => {
                const { email, code } = data
                let otp = code.join('')
                const res = await handleVerify({ email, otp })
                reset()
                if(res.success) {
                  navigate('/home')
                }
              })}
              className='mt-5
            text-[#fff] bg-blue-600 hover:bg-blue-500
            rounded-md font-bold
                       w-[90vw] md:w-[30vw] lg:w-[20vw]
                       py-3 md:py-2 cursor-pointer'
            >
              Verify
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(async data => {
              const res = await handleRegister({ ...data })
              console.log('data------------>', data)
              console.log('res------------>', res)
            })}
            className='min-w-[clamp(20rem,25vw,50rem)] md:w-[26vw] lg:w-[22vw]
                     border border-[#ffffff31]
                     flex flex-col items-center
                     px-6 py-8'
          >
            {/* LOGO */}
            <img
              className='h-[10rem] md:h-[8vw] lg:h-[6vw] mb-4'
              src='./src/assets/logobg.png'
              alt=''
            />

            <div
              className='w-full text-3xl
                          text-white py-2 font-bold rounded-lg
                          flex items-center justify-center gap-3
                           '
            >
              Sign up
            </div>

            {/* TEXT */}
            <p className='text-gray-400 text-sm text-center mb-2 '>
              Sign up to see photos and videos from your friends.
            </p>

            {/* FACEBOOK BUTTON */}

            {/* INPUTS */}
            <div className='flex flex-col gap-4 w-full'>
              <input
                className='rounded-md text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-3 text-sm'
                type='email'
                placeholder='Email'
                {...register('email', {
                  required: 'Email is required'
                })}
              />

              <input
                className='rounded-md text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-3 text-sm'
                type='password'
                placeholder='Password'
                {...register('password', {
                  required: 'Password is required'
                })}
              />

              <input
                className={`rounded-md text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-3 text-sm`}
                type='text'
                placeholder='Username'
                {...register('username', {
                  required: 'Username is required'
                })}
              />
            </div>
            {errors.username && (
              <p className='text-sm mt-2 text-red-500'>
                {errors.username.message}
              </p>
            )}
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}

            {/* SMALL TEXT */}
            <p className='text-gray-400 text-xs text-center mt-5'>
              People who use our service may have uploaded your contact
              information.{' '}
              <span className='text-blue-400 cursor-pointer'>Learn More</span>
            </p>

            <p className='text-gray-400 text-xs text-center mt-3'>
              By signing up, you agree to our{' '}
              <span className='text-blue-400 cursor-pointer'>Terms</span>,{' '}
              <span className='text-blue-400 cursor-pointer'>
                Privacy Policy
              </span>{' '}
              and{' '}
              <span className='text-blue-400 cursor-pointer'>
                Cookies Policy
              </span>
              .
            </p>

            {/* SIGN UP BUTTON */}
            <button
              type='submit'
              disabled={isSubmitting}
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
              {isSubmitting ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
        )}
        {/* LOGIN CARD */}
        <div
          className='w-[90vw] md:w-[26vw] lg:w-[22vw]
                        border border-[#ffffff31]
                        text-white
                        flex items-center justify-center
                        mt-4 py-5 text-sm'
        >
          Have an account?{' '}
          <Link to='/' className='text-blue-400 ml-2 font-semibold'>
            Log in
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Register
