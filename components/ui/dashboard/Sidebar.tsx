import React, { useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import StakingAd from './StakingAd'
import NavTop from './NavTop'
import SideNav from './SideNav'
import Link from 'next/link'
import { Home3 } from 'iconsax-react'

type Props = {
  condition: boolean
}

function Sidebar(props: Props) {

  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  useEffect(() => {
    if (chain !== chains[0]) switchNetwork
  }, [])

  const { address } = useAccount()

  return (
    <div className={`w-3/4 bg-base-200  max-w-[400px]  lg:w-72 min-h-screen fixed top-0 lg:sticky lg:left-0 duration-300 border-r-2 border-base-300 z-[32] ${props.condition ? 'left-0' : '-left-[100%]'} `}>
      <div className='flex flex-col justify-between min-h-screen overflow-y-auto '>
        <div className='flex flex-col items-start justify-between space-y-2'>
          <NavTop />
          <div className='px-6 py-2'>
            <h1 className=' font-GilroyRegular tracking-[.2rem]'>
              MENU
            </h1>
          </div>
          {!address &&
            <div className='flex flex-col w-full px-6 my-2'>
              <Link href={'/'}>
                <button
                  className={`SidebarBtn`}
                >
                  <Home3 size={22} />
                  <p>Home</p>
                </button>
              </Link>
            </div>
          }
          {address && <SideNav />}
        </div >
        {/* {address && <StakingAd />} */}
      </div>
    </div >
  )
}

export default Sidebar
