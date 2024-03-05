
import { ThemeContext } from '@/context/ThemeContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
// w-full max-w-[1240px] mx-auto px-10

export const supportedTokens = [
  { id: 0, logo: 'btc', alt: 'bitcoin', width: 72, height: 96 },
  { id: 1, logo: 'eth', alt: 'ether', width: 72, height: 96 },
  { id: 2, logo: 'ape', alt: 'apecoin', width: 72, height: 96 },
  { id: 3, logo: 'uni', alt: 'uniswap', width: 72, height: 96 },
  { id: 4, logo: 'matic', alt: 'matic', width: 72, height: 96 },
  { id: 5, logo: 'ens', alt: 'ens', width: 72, height: 96 },
  { id: 6, logo: 'link', alt: 'chainlink', width: 72, height: 96 },
  { id: 7, logo: 'aave', alt: 'avalanch', width: 72, height: 96 },
  { id: 8, logo: 'ftm', alt: 'fantom', width: 72, height: 96 },
  { id: 9, logo: 'bat', alt: 'bat', width: 72, height: 96 },
]

function NFTList() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className=' border-y border-y-white/[0.3] w-full h-full my-10'>
      <div className='max-w-[1240px] mx-auto px-10 grid  grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-10  py-6'>
        {supportedTokens.map(token => <img key={token.id} src={`/images/${token.logo}.png`}
          className={`mx-auto ${theme === "dark" ? "" : "invert"}`} alt={token.alt} />)}
      </div>
    </div>
  )
}

export default NFTList
