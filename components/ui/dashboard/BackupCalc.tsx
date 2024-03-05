import { globals } from "@/config/globals";
import { useEvmTokenMetadata, useEvmTokenPrice } from "@moralisweb3/next";
import { LoaderIcon } from "react-hot-toast";
import { formatEther, formatUnits } from "viem";
import { useContractRead } from "wagmi";

const BackupCalc = ({ id }: { id: string | string[] | undefined }) => {

    const { data: backupToken, isLoading: loadingBackupToken } = useContractRead({
        address: globals.contracts.collectionAddress,
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "nftInfos",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "revealed",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint8",
                        "name": "tokenDecimal",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "backupLimit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "backupAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "tokenBackup",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        functionName: 'nftInfos',
        args: [id?.toString()],
        enabled: !!id
    })


    const tokenAddress = (backupToken as any)?.[4] as string
    const amount = Number(formatUnits((backupToken as any)?.[3] as bigint, (backupToken as any)?.[1] as number || 0))

    const { data: tokenMetadata, isFetching: loadingTokenMeta } = useEvmTokenMetadata({
        addresses: [tokenAddress],
    })

    const { data: tokenPrice } = useEvmTokenPrice({ address: tokenAddress })
    const price = tokenPrice?.usdPrice

    return (


        <div className="tooltip tooltip-accent" data-tip={price && amount ?
            `(${(price * amount).toFixed(2)}$)` : '0.00$'}>
            <div className='flex items-center'>
                <h2 className='flex text-xl text-accent font-GilroyBlack '>
                    {amount > 0 ? `${amount.toFixed(4)}` : amount}
                </h2>
                <span className='font-sans text-xs font-normal text-accent-focus'>{tokenMetadata?.[0].token?.symbol}</span>
            </div>
        </div>

    );
}

export default BackupCalc;