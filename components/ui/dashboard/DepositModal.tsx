import { Add } from 'iconsax-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useAccount, useBalance, useContractWrite, useWaitForTransaction } from 'wagmi'
// import { parseEther } from 'ethers/lib/utils.js'
import { LoaderIcon, toast } from 'react-hot-toast'
import { parseEther } from 'viem'
import { globals } from '@/config/globals'
import CollectionABI from '@/contracts/collectionABI.json'



interface DepositModalProps {
  tokenId: string;
  Modal: boolean;
  setMayRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  Switch: () => void;
}

function DepositModal(props: DepositModalProps) {
  const { address } = useAccount()
  const { data, isLoading: balanceIsLoading } = useBalance({ address })
  const [value, setValue] = useState(0)
  const { tokenId } = props
  const [status, setStatus] = useState('')

  const { write: deposit, data: dapositData, isLoading: depositing } = useContractWrite({
    address: globals.contracts.collectionAddress,
    abi: CollectionABI,
    functionName: 'DepositNFT',
    args: [tokenId],
    onSuccess: () => {
      setStatus('pending')
      toast.success('Waiting for confirmation')
    },
    onError: (error) => {
      setStatus('')
      console.log(error.stack?.split("\n"))
      switch (error.stack?.split("\n")[1]) {
        case 'NotOwnerOfNFT':
          toast.error('You are not the owner of this NFT')
          break;
        default:
          toast.error('Deposit failed')
      }
    },
    onMutate: () => {
      setStatus('sending')
    },
  })

  const { isLoading: txIsLoading } = useWaitForTransaction({
    hash: dapositData?.hash,
    onSuccess: () => {
      setStatus('')
      toast.success('Deposit successful')
      props.setMayRefetch(true)
    },
    onError: () => {
      setStatus('')
      toast.error('Confirmation failed')
    },
  })

  useEffect(() => {
    setValue(0)
  }, [props.Modal])

  const handleDeposit = async () => {
    if (value === 0) return
    if (value > (data as unknown as number)) {
      toast.error('Insufficient Balance')
    }
    deposit({
      value: parseEther(`${value}`),
    })
  }


  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <>
      <div
        onClick={() => props.Switch()}
        className={` ${props.Modal
          ? 'w-full min-h-screen px-4 md:px-0 fixed top-0 flex cursor-pointer items-center justify-center left-0 bg-base-300/60 backdrop-blur-sm z-40'
          : 'hidden'
          }`}
      ></div>
      <div
        className={`w-[95%] md:w-1/2 max-w-[600px] bg-base-300 duration-300 h-fit py-6  z-50 rounded-3xl shadow-2xl fixed left-1/2 transform -translate-x-1/2 ${props.Modal
          ? 'top-1/2 -translate-y-1/2 opacity-100'
          : 'opacity-0 top-1/2 -translate-y-[300%] 2xl:-translate-y-[800%]'
          }`}
      >
        <div className='flex items-center justify-between w-full px-6 pb-4 text-2xl border-b border-neutral'>
          <h1>Deposit</h1>
          <Add
            onClick={() => props.Switch()}
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
              onClick={() => {
                setValue(Number(data?.formatted))
              }}
              className='py-2 px-4 border text-accent duration-300 select-none cursor-pointer hover:bg-accent hover:text-accent-content border-accent absolute z-10 right-4  top-[.6rem] rounded-xl'
            >
              MAX
            </div>
            <input
              // displayType='input'
              // thousandSeparator={true}
              max={data?.formatted}
              min={0}
              className={`relative
              ${value > (Number(data?.formatted) || 0) ? ' ring-red-500' : ' focus:ring-accent'}
              w-full py-5 pt-10 pl-4 duration-300 text-accent outline-none h-14 font-GilroyBold rounded-xl bg-base-100 focus:ring-1  focus:ring-inset 
              `}
              // suffix=' ETH'
              // defaultValue={'0'}
              type='number'
              value={parseFloat(value.toString())}
              onChange={(e) => {
                const inputValue = parseFloat(e.target.value)
                const maxAmount = parseFloat(data?.formatted || '0')
                setValue(Math.abs(inputValue))
              }}

            // allowLeadingZeros={false}
            // onValueChange={(values) => {
            //   const { formattedValue, value } = values
            //   setValue(Number(formattedValue))
            //   setPureValue(Number(value))
            // }}
            />
            <span className='absolute right-24 text-xl text-neutral-content top-[30%]'>ETH</span>
          </div>
          {/* Input style End */}
          <div className='flex items-center justify-start px-4 my-3 space-x-3'>
            <h4 className='text-CustomGrayDarker'>Balance :</h4>
            <p>{balanceIsLoading ? 'Loading...' : data?.formatted}</p>
          </div>
        </div>
        <div className='px-6'>
          <button
            onClick={handleDeposit}
            className='w-full btn btn-accent'
            disabled={depositing || txIsLoading}
          >
            {txIsLoading || depositing && <LoaderIcon />}
            {status === '' && 'Deposit'}
            {status === 'pending' && 'Confirming...'}
            {status === 'sending' && 'Sending...'}
          </button>
        </div>
      </div>
    </>
  )
}

export default DepositModal
