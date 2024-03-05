import { globals } from "@/config/globals"
import { minifyAddress } from "@/utils/helpers"
import { zeroAddress } from "viem";
import Moment from 'react-moment'
import { useEvmNFTMetadata } from "@moralisweb3/next";
import Link from "next/link";
import { EvmNftTransfer } from "@moralisweb3/common-evm-utils";
import { useAccount } from "wagmi";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const MyTransactionTableItem = ({ transaction }: { transaction: EvmNftTransfer }) => {
  const { data: metadata, isFetching, error } = useEvmNFTMetadata({
    address: globals.contracts.collectionAddress,
    tokenId: transaction.tokenId, normalizeMetadata: true, mediaItems: true
  })

  const nftImage = metadata?.media?.status === 'success' ? metadata?.media?.mediaCollection?.low.url : metadata?.media?.originalMediaUrl
  const { address } = useAccount()

  enum TransactionType {
    Burn = 'Burn',
    Mint = 'Mint',
    Stake = 'Stake',
    Unstake = 'Unstake',
    Transfer = 'Transfer'
  }

  const fromAddress = transaction?.fromAddress?.checksum;
  const toAddress = transaction?.toAddress?.checksum;

  const transactionType = toAddress === zeroAddress ? TransactionType.Burn :
    fromAddress === zeroAddress ? TransactionType.Mint :
      toAddress === globals.contracts.stakingAddress ? TransactionType.Stake :
        fromAddress === globals.contracts.stakingAddress ? TransactionType.Unstake : TransactionType.Transfer;

  const image = transactionType === TransactionType.Burn ? '/images/burn.png' :
    transactionType === TransactionType.Mint ? '/images/mint.png' :
      transactionType === TransactionType.Stake ? '/images/lock.png' :
        transactionType === TransactionType.Unstake ? '/images/unlock.png' : '/images/transfer.png'


  const { theme } = useContext(ThemeContext)
  return (
    <tr className='hover' data-theme={theme === 'cupcake' ? 'dark' : 'cupcake'}>
      <td>
        <div className="relative flex items-center space-x-3">
          <div className=" avatar">
            <div className="w-12 h-12 mask mask-squircle">
              <img
                src={nftImage || image}
                className='relative object-contain sm:block mask mask-squircle'
                alt=''
              />

            </div>
          </div>
          {nftImage && <img
            src={image}
            className='absolute w-5 h-5 -bottom-3 -left-3'
            alt={transactionType}
          />}
        </div>
      </td>

      {/* Transaction type */}
      <td className='items-center hidden h-full font-bold text-asterfiBlue sm:table-cell'>
        {transactionType}
      </td>
      <td className='font-bold text-asterfiBlue'>
        <Link href={`/nfts/${transaction.tokenId}`}>
          {transaction.tokenId}
        </Link>
      </td>
      {/* From Address */}
      <td className=''>
        <a
          target='_blank'
          href={
            fromAddress === zeroAddress ? "#" :
              globals.env.etherscanAddressBaseURL + fromAddress
          }
          rel='noreferrer'
        >
          {fromAddress && fromAddress === address ? "You" : minifyAddress(fromAddress!)}
        </a>
      </td>
      <td className=''>
        <a
          target='_blank'
          href={
            globals.env.etherscanAddressBaseURL + toAddress
          }
          rel='noreferrer'
        >
          {toAddress && toAddress === address ? "You" : minifyAddress(toAddress)}
        </a>
      </td>
      <td className='hidden text-asterfiBlue sm:table-cell'>
        <Moment fromNow>{transaction?.blockTimestamp}</Moment>
      </td>
      <td className=''>
        <a
          href={globals.env.etherscanTrxBaseURL + transaction?.transactionHash}
          target='_blank'
          rel='noreferrer'
        >
          {transaction?.transactionHash && minifyAddress(transaction?.transactionHash)}
        </a>
      </td>
    </tr>
  )
}

export default MyTransactionTableItem
