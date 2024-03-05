import { InfoCircle } from "iconsax-react";

const InfoBox = () => {
    return (
        <div className="">
            <h2 className="flex items-center gap-2 text-lg font-bol">
                <InfoCircle /> Infobox
            </h2>
            <p className="mt-5 font-sans font-light text-left ">
                The <b>'Token Invested'</b> section displays the underlying
                crypto assets that support your NFT. By revealing your item from
                the 'My Nfts' section, your investment will be anonymously
                transferred to one of the ten listed cryptocurrencies in the
                White Paper. Through this section, you can view the real-time
                balance of your holdings and withdraw your assets and burn your
                Asterfis at any time by accessing the 'My Nfts' section.{' '}
            </p>
        </div>
    );
}

export default InfoBox;