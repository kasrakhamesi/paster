import { EvmNft } from "@moralisweb3/common-evm-utils";
import { useEvmTokenPrice } from "@moralisweb3/next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { formatEther, formatUnits } from "viem";

type Props = {
    nft: EvmNft,
    tm: any,
    tokenMetadata: any,
    idx: number,
    backupTokens: any
}

const BackupTokenItem = ({ nft, tm, tokenMetadata, idx, backupTokens }: Props) => {


    console.log(tm)

    const [tokenAddress, setTokenaddress] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const moralisImage = nft?.media?.mediaCollection?.low.url && !nft?.media?.mediaCollection?.low.url.endsWith("gif") ? nft?.media?.mediaCollection?.low.url : nft?.media?.originalMediaUrl
    useEffect(() => {
        if (!backupTokens) return
        setTokenaddress(backupTokens?.[idx]?.result?.[4])
        setAmount(Number(formatUnits(backupTokens?.[idx]?.result?.[3] as bigint, backupTokens?.[idx]?.result?.[1] as number || 0)))
    }, [backupTokens])

    const { data } = useEvmTokenPrice({ address: tokenAddress })
    const price = data?.usdPrice

    const [tokenLogo, setTokenLogo] = useState<string>("")

    useEffect(() => {
        if (!tm) return

        switch (tm?.token.name) {
            case 'Ethereum Name Service':
                setTokenLogo('/images/dashboard/ens.webp')
                break;
            case 'Uniswap V2':
                setTokenLogo('/images/dashboard/uniswap.png')
                break;
            case 'Ape Token':
                setTokenLogo('/images/dashboard/ApeCoin.png')
                break;
            default:
                setTokenLogo(tm?.token.logo)
        }
    }, [tm])

    return (
        <Link href={`/nfts/${nft?.tokenId}`} key={nft?.tokenId} className='flex items-center justify-between w-full'>
            <div className="flex items-center space-x-4">
                <img src={moralisImage} alt={" Asterfi #" + nft?.tokenId}
                    className='h-16 md:h-24 mask mask-squircle'
                />
                <div className='flex flex-col space-y-1'>
                    <h2 className='font-bold font-GilroyBold'>{nft?.name + " #" + nft?.tokenId}</h2>
                    {tm && <div className='flex flex-col space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <img src={tokenLogo} alt={tm?.token.name}
                                className='hidden w-8 h-8 sm:block' />
                            <p className='text-sm lg:hidden xl:block'>{tokenMetadata && tokenMetadata[idx]?.token.name}</p>
                            <h2 className="hidden text-lg lg:block xl:hidden font-GilroyBold md:text-xl text-asterfiPink">
                                {price ? <>
                                    {(price * amount).toFixed(2)}
                                    <span className="text-pink-400">$</span>
                                </>
                                    : <LoaderIcon />}
                            </h2>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <h2 className='flex space-x-1 text-xl font-GilroyBlack '>
                                {amount > 0 ? `${amount.toFixed(4)}` : amount}
                            </h2>
                            <p className='font-sans text-xs font-normal'>{tm?.token?.symbol}</p>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className="lg:hidden xl:block">
                <h2 className="text-lg font-GilroyBold md:text-xl text-asterfiPink">
                    {price ? <>
                        {(price * amount).toFixed(2)}
                        <span className="text-pink-400">$</span>
                    </>
                        : <LoaderIcon />}
                </h2>
            </div>
        </Link>
    );
}

export default BackupTokenItem;