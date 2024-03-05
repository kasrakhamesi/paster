import React, { Dispatch, SetStateAction } from 'react'
import Logo from './Logo'
import { Sling as Hamburger } from 'hamburger-react'
import WalletConnectButton from './WalletConnectButton'
import ThemeChange from './ThemeChange'
import Link from 'next/link'

type Props = {
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}





function Navbar({ isOpen, setOpen }: Props) {

  return (
    <div className='w-full py-5 shadow-2xl bg-primary text-base-800'>
      <div className='w-full max-w-[1240px] px-10 mx-auto flex items-center justify-between'>
        <Logo />
        <ul className='items-center justify-center hidden space-x-4 cursor-pointer xl:space-x-10 lg:flex '>
          <button onClick={() => {
            const el = document.getElementById('benefits')
           scrollTo({
              top: el?.offsetTop! - 100,
              behavior: 'smooth'
            })

          }} >
            <li className=''>Benefits</li>
          </button>{' '}
          <button onClick={() => {
            const el = document.getElementById('transactions-table')
            scrollTo({
              top: el?.offsetTop! - 100,
              behavior: 'smooth'
            })

          }} >
            <li className=''>Transactions</li>
          </button>{' '}
          <button onClick={() => {
            const el = document.getElementById('DAO')
            scrollTo({
              top: el?.offsetTop! -40,
              behavior: 'smooth'
            })

          }}>
            <li className=''>DAO</li>
          </button>
          {/* <Link href='#DAO'>
            <li className=''>Collection</li>
          </Link> */}
          {/* <Link href='#DAO'>
            <li className='relative'>Marketplace<span className='absolute p-1 text-xs -top-1 badge badge-secondary'>soon</span></li>
          </Link> */}
        </ul>

        <div className='hidden lg:block'>
          {/* <WalletConnectButton /> */}
          <WalletConnectButton />
          {/* <ThemeChange /> */}
        </div>
        <label htmlFor="my-drawer" className="block drawer-button lg:hidden">
          <Hamburger color='#C5FF4B' toggled={isOpen} toggle={e => setOpen(e)} />
        </label>
      </div>
    </div>
  )
}

export default Navbar
