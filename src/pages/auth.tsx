/* eslint-disable @next/next/no-img-element */
import { FcGoogle } from 'react-icons/fc'
import { getSession, signIn } from 'next-auth/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

const Auth = () => {
  
  return (
    <div className='flex md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='relative flex flex-col w-full min-h-screen md:w-[70vw] items-center justify-center mx-auto px-6 md:px-0'>
        <div className='w-full md:w-1/2 md:hidden'>
          <Link href='/'>
            <button className='text-white hover:text-black p-5 rounded-full hover:bg-white w-fit transition-all cursor-pointer'>
              <AiOutlineArrowLeft size={25} />
            </button>
          </Link>
        </div>
        <img
          src={'/images/loginMan.svg'}
          className='xl:w-1/2 lg:w-3/4'
          alt='login illustration'
        />
        <div className='py-4 text-[#BECACA] grid grid-cols-1  justify-between gap-4 w-full md:w-1/2'>
          <button
            className='border-white border-2 dark:bg-white bg-black py-3 rounded-md px-auto justify-center gap-3 flex flex-row items-center font-bold dark:text-gray-700 text-white'
            onClick={() => {
              void signIn('google', { callbackUrl: '/pricing' })
            }}
          >
            <FcGoogle fontSize={25} />
            Login with Google
          </button>

        </div>
      </div>
    </div>
  )
}

export default Auth