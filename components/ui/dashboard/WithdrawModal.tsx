import { Add } from 'iconsax-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import useWithdraw from '@/hooks/useWithdraw'
import { toast } from 'react-hot-toast'
import { parseUnits } from 'viem'

interface Props {
  Modal: boolean;
  Switch: () => void;
  balance: string;
  limit: string;
  tokenId: string;
  decimal: number;
  symbol: string;
}

function WithdrawModal({ tokenId, decimal, Modal, Switch, balance, limit, symbol }: Props) {

  // const [value, setValue] = useState(0)
  const [pureValue, setPureValue] = useState("0")
  const [willBurn, setWillBurn] = useState(false)
  const [burnChecked, setBurnChecked] = useState(false)
  const { callWithdraw, isLoading, status } = useWithdraw(
    tokenId,
    parseUnits(pureValue as `${number}` || "0", decimal)
  )

  useEffect(() => {
    // setValue(0)
    setPureValue("0")
    setWillBurn(false)
  }, [Modal])

  const handleWithdraw = async () => {
    if (+pureValue === 0) return

    if (+pureValue > +balance) {
      toast.error('Insufficient Balance')
      return
    }

    if (willBurn && !burnChecked) {
      toast.error('Please check the burn box')
      return
    }
    callWithdraw.write()
  }

  useEffect(() => {
    if (+balance - +pureValue <= +limit) {
      setWillBurn(true)
    } else {
      setWillBurn(false)
    }
  }, [pureValue, balance, limit])

  return (
    <>
      <div
        onClick={() => Switch()}
        className={` ${Modal
          ? 'w-full min-h-screen px-4 md:px-0 fixed top-0 flex cursor-pointer items-center justify-center left-0 bg-base-300/70 z-40'
          : 'hidden'
          }`}
      ></div>
      <div
        className={`w-[95%] md:w-1/2 max-w-[600px]  bg-base-300 duration-300 h-fit py-6  z-50 rounded-3xl shadow-2xl fixed left-1/2 transform -translate-x-1/2 ${Modal
          ? 'top-1/2 -translate-y-1/2 opacity-100'
          : 'opacity-0 top-1/2 -translate-y-[300%] 2xl:-translate-y-[800%]'
          }`}
      >
        <div className='flex items-center justify-between w-full px-6 pb-4 text-2xl border-b border-neutral'>
          <h1>Withdraw</h1>
          <Add
            onClick={() => Switch()}
            size={32}
            className='duration-200 rotate-45 cursor-pointer hover:text-accent-focus'
          />
        </div>
        <div className='w-full px-6 my-6'>
          {/* Input style */}
          <div className='relative'>
            <label className='absolute z-10 top-1 left-4 font-GilroyThin '>
              Amount
            </label>
            <div
              className='py-2 px-4 border text-accent duration-300 select-none cursor-pointer hover:text-accent-focus border-accent absolute z-10 right-4  top-[.6rem] rounded-xl'
              onClick={() => {
                setPureValue(balance)
              }}
            >
              MAX
            </div>
            <input
              className={`relative
              ${Number(pureValue) > (Number(balance)) ? ' ring-red-500' : ' focus:ring-accent'}
              w-full py-5 pt-10 pl-4 duration-300 text-accent outline-none h-14 font-GilroyBold rounded-xl bg-base-100 focus:ring-1  focus:ring-inset 
              `}
              value={pureValue}
              type='number'
              onChange={(e) => {
                const inputValue = parseFloat(e.target.value)
                setPureValue(Math.abs(Number(inputValue)).toString())
              }}
            />
          </div>
          {/* Input style End */}
          <div className='flex items-center justify-start px-4 my-3 space-x-3'>
            <h4 className=''>Unlocked Balance :</h4>
            <p>
              <NumericFormat
                value={(Number(balance) - Number(limit)) - 1 < 0 ? 0 : (Number(balance) - Number(limit)) - 1}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' ' + symbol || ''}
              />
            </p>
          </div>
          <div className='flex items-center justify-start px-4 my-3 space-x-3'>
            <h4 className=''>Full Balance :</h4>
            <p>
              <NumericFormat
                value={balance}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' ' + symbol || ''}
              />
            </p>
          </div>
          <div className='flex items-center justify-start px-4 my-3 space-x-3'>
            <h4 className=''>Balance Limit :</h4>
            <p>
              <NumericFormat
                value={limit}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' ' + symbol || ''}
              />
            </p>
          </div>
          {willBurn && (
            <div className='flex items-center justify-start my-3 space-x-3 '>
              <div className='w-full p-5 text-error bg-base-100 rounded-xl '>
                <span>
                  When you whithraw your backuplimit your NFT will be burned and
                  10% will be sended to the project treasury. Are you sure about
                  that?
                </span>
                <div className='flex items-center mt-3 '>
                  <input
                    type='checkbox'
                    id='burn'
                    className='w-4 h-4 mr-3 accent-red-500'
                    checked={burnChecked}
                    onChange={(e) => {
                      setBurnChecked(e.target.checked)
                    }}
                  />
                  <label htmlFor='burn'>
                    Yes, withdraw the entire backup amount and burn my NFT.
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='px-6'>
          <button
            onClick={handleWithdraw}
            disabled={isLoading}
            className={`${willBurn && !burnChecked
              ? 'bg-red-500 hover:bg-red-500/90 '
              : 'bg-accent hover:bg-accent-focus '
              } text-accent-content w-full py-4   text-xl shadow-2xl shadow-CustomGreen/20 hover:shadow-xl duration-300 font-GilroyBold rounded-lg`}
          >
            <span>
              {status === '' && 'Withdraw'}
              {status === 'pending' && 'Confirming...'}
              {status === 'sending' && 'Sending...'}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default WithdrawModal
