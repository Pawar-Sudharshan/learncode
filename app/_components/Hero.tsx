import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'

function Hero() {
  return (
    <div className='w-full relative h-screen overflow-hidden'>
        <Image src='/hero.gif' alt= 'hero' width={1000} height={1000} className='w-full h-full object-cover absolute inset-0'></Image>

        <div className='absolute w-full flex flex-col items-center mt-20'>
            <h2 className='font-bold text-7xl font-game'>Start Your</h2>
            <h2 className='font-bold text-8xl font-game text-yellow-400'
            style={
                {
                    textShadow:"2px 2px 0 #000, -2px -2px 0 #000, 2px -2px #000, -2px 2px 0 #000"
                }
            }
            >Learning Journey</h2>
            <h2 className='mt-5 font-game text-3xl'>Beginner friendly coding courses and projects!</h2>
            <SignedOut>
                <Link href='/sign-up'>
                    <Button className='font-game text-3xl p-6 mt-7' variant={'pixel'}>Get Started</Button>
                </Link>
            </SignedOut>
            <SignedIn>
                <Link href='/dashboard'>
                    <Button className='font-game text-3xl p-6 mt-7' variant={'pixel'}>Continue Learning</Button>
                </Link>
            </SignedIn>
        </div>
    </div>
  )
}

export default Hero