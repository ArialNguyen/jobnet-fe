'use client'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/useRedux'
import React from 'react'
import { setLoading } from '@/features/loading/loadingSlice'
import '@/app/globals.css';
type Props = {}

export default function TestPage({}: Props) {
  const dispatch = useAppDispatch()
  
  return (
    <div className='bg-black w-96 flex flex-col'>
      <div className=' bg-gray-500 text-amber-400'>test</div>
      <Button onClick={() => { dispatch(setLoading(true)) }}>Open Modal</Button>
    </div>
  )
}