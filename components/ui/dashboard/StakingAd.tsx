import Image from "next/image";
import Link from "next/link";

const StakingAd = () => {
    return (
        <div className='flex px-0 py-4'>
            <div className=' p-6 rounded-2xl bg-primary flex items-center justify-center flex-col space-y-2 bg-[url("/images/dashboard/union.png")]'>
                <Image src="/images/dashboard/stake-safe.png" alt="safe" width={100} height={100} />
                <h1 className='text-2xl '>
                    Exciting news
                </h1>
                <p className='px-0 font-sans text-xs '>
                    Attention all Asterfi holders!
                    You may be eligible for an airdrop if you stake your NFTs until the end of june 2023.
                    This airdrop is due to our partnership with APE$ and will be proportional to your staking period.
                    Don’t miss out on this opportunity!
                </p>
                <Link href="/dashboard/stake" className=' btn btn-sm'>Stake Now</Link>
            </div>
        </div>
    );
}

export default StakingAd;