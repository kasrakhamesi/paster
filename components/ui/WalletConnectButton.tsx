import { ConnectKitButton } from "connectkit";

const WalletConnectButton = () => {
    return (
        <div>
            <ConnectKitButton mode="dark"  showAvatar customTheme={{
                "--ck-connectbutton-background":"rgb(175, 221, 75)",
                "--ck-connectbutton-color": "rgb(45, 45, 45)",
                "--ck-connectbutton-hover-background": "rgb(162, 201, 70)",
                "--ck-connectbutton-hover-color": "rgb(45, 45, 45)",
                "--ck-connectbutton-active-background": "rgb(162, 201, 70)",
                "--ck-connectbutton-active-color": "rgb(45, 45, 45)",
                // "--ck-connectbutton-border-radius": "0",
                "--ck-connectbutton-box-shadow": "none",

            }} />
        </div>
    );
}

export default WalletConnectButton;