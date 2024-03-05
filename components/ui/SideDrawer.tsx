import { useModal } from "connectkit";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { useAccount } from "wagmi";

const SideDrawer = () => {
    const { address, isConnected} = useAccount()
    const {openProfile} = useModal()
    return (
        <div className="z-20 drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div
                className={`bg-base-100 min-h-full lg:hidden w-2/3  flex flex-col items-start justify-start py-10 px-10'
            }`}
            >
                <div className='w-full pb-8 px-4 border-b border-white/[0.3]'>
                    <h1 className='text-3xl leading-6 tracking-wide font-Tactic text-gray-50'>
                        ASTER{<span className='text-CustomGreen'>FI</span>}
                    </h1>
                </div>
                <div className='w-full px-4 my-10'>
                    <ul
                        className='flex flex-col items-start justify-start space-y-5 cursor-pointer text-start text-gray-50'
                    >
                        <a href='#benefits'>
                            <li className='SidebarBtn hover:bg-base-300'>Benefits</li>
                        </a>
                        <a href='#transactions'>
                            <li className='SidebarBtn hover:bg-base-300'>Transactions</li>
                        </a>
                        <a href='#DAO'>
                            <li className='SidebarBtn hover:bg-base-300'>DAO</li>
                        </a>
                        {/* <a href='#DAO'>
                            <li className='SidebarBtn hover:bg-base-300'>Collection</li>
                        </a>
                        <a href='#DAO'>
                            <li className='SidebarBtn hover:bg-base-300'>Marketplace<span className="badge badge-secondary">soon</span></li>
                        </a> */}
                    </ul>
                </div>

                <div className="px-4">
                    {isConnected ? (
                        <Link href='/dashboard' >
                            <button className='flex items-center justify-center px-6 py-3 space-x-2 duration-300 rounded-lg shadow-xl bg-CustomGreen text-CustomBlack font-GilroyBold shadow-CustomGreen/20 hover:bg-CustomGreen/90 hover:shadow-lg'>
                                <p>Dashboard</p>
                                <ArrowRight />
                            </button>
                        </Link>
                    ) : (
                        <button onClick={openProfile} className='flex items-center justify-center px-6 py-3 space-x-2 duration-300 rounded-lg shadow-xl bg-CustomGreen text-CustomBlack font-GilroyBold shadow-CustomGreen/20 hover:bg-CustomGreen/90 hover:shadow-lg'>
                            <p>Connect</p>
                            <ArrowRight />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SideDrawer;