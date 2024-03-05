import { LogoutCurve, ProfileCircle } from "iconsax-react";
import Logo from "../Logo";
import { useAccount, useDisconnect } from "wagmi";
import { useModal } from "connectkit";
import WalletConnectButton from "../WalletConnectButton";

const NavTop = () => {

    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { openProfile } = useModal()
    return (
        <div className='w-full px-4 py-4 border-b-2 border-base-300'>
            <Logo />
            {address ? <div className='flex items-center justify-between mt-4 text-accent'>
                <div onClick={openProfile} className='flex space-x-2 cursor-pointer'>
                    <ProfileCircle size={22} />
                    <p className='flex items-center text-sm font-Gilroy'>
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                </div>
                <LogoutCurve
                    size='22'
                    className='cursor-pointer'
                    onClick={() => disconnect()}
                />
            </div> : <div className="my-4"><WalletConnectButton /></div>}
        </div>
    );
}

export default NavTop;