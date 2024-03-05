import { minifyAddress } from "@/utils/helpers";
import { EvmNft } from "@moralisweb3/common-evm-utils";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useAccount } from "wagmi";
import { IRarity, IOpenSeaAsset } from "@/interfaces/opensea";
import { globals } from "@/config/globals";

type Props = {
  nft: EvmNft;
};

const NFTCard = ({ nft }: Props) => {
  const { address } = useAccount();
  const [nftImage, setNftImage] = useState<string | undefined>(
    "/images/unrevealed.webp"
  );
  const [openseaImage, setOpenseaImage] = useState<string | undefined>(
    undefined
  );
  const [rarity, setRarity] = useState<null | IRarity>(null);
  const [asset, setAsset] = useState<null | IOpenSeaAsset>(null);
  const [owner, setOwner] = useState<null | string>(null);

  async function refreshOpenseaMetadata() {
    try {
      const response = await axios.get(
        `/api/opensea-refresh?tokenId=${nft?.tokenId}`
      );
      const openseaData = response.data;
      if (openseaData.error) {
        console.log(openseaData.error);
      } else {
        console.log(openseaData.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getLocalNftImage() {
    try {
      const { data } = await axios.get(
        `${globals.env.asterfiApiUrl}tokens/${nft?.tokenId}`
      );
      return data?.data[0]?.imageUrl || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async function updateLocalImageUrlDb() {
    try {
      await axios.get(
        `${globals.env.asterfiApiUrl}tokens/${nft?.tokenId}/refresh`
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function getOpenseaAsset() {
    try {
      let tryingNumber = 0;
      do {
        const response = await axios.get(
          `/api/opensea-assetv1?tokenId=${nft?.tokenId}`
        );


        
        const openseaData = response.data;
        if (String(openseaData.data.image_url).includes(".gif")) {
          await refreshOpenseaMetadata();
          await new Promise((resolve) => setTimeout(resolve, 850));
          tryingNumber++;
        } else if (
          tryingNumber > 2 ||
          !String(openseaData.data.image_url).includes(".gif")
        ) {
          setAsset(openseaData.data);
          setRarity(openseaData.data.rarity_data);
          setOpenseaImage(openseaData.data.image_thumbnail_url);
          break;
        }
      } while (tryingNumber < 3);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!nft || !address) return;
    setOwner(nft?.ownerOf?.equals(address) ? "You" : minifyAddress(address));
    setNftImage(
      nft.media?.status === "processing" || "host_unavailable"
        ? nft?.media?.originalMediaUrl
        : nft.media?.mediaCollection?.low.url
    );
  }, [nft, address]);

  useEffect(() => {
    if (!nft) return;
    getOpenseaAsset();
    updateLocalImageUrlDb();
  }, [nft]);

  return (
    <div className="w-full mt-4 overflow-hidden sm:w-72 md:w-52 xl:w-60 h-fit card bg-base-200 lg:mt-0">
      <Link href={`/nfts/${nft.tokenId}`}>
        <figure className="relative px-8 pt-4 pb-2">
          <div
            title={`NFT Ranking calculated ${moment(
              rarity?.calculated_at
            ).fromNow()}`}
            className="absolute flex items-center justify-center p-2 pt-3 text-xs font-bold rounded-bl text-base-100 mask mask-hexagon bg-accent top-2 right-2"
          >
            {rarity?.rank ?? <LoaderIcon />}
          </div>
          <img
            className="cursor-pointer mask mask-squircle"
            src={openseaImage || nftImage || "/images/unrevealed.webp"}
            alt=""
          />
        </figure>
      </Link>

      <div className="p-4 shadow-md card-body">
        <div className=" card-title">
          <div>
            {`${nft?.name} #${nft?.tokenId}`}
            <div className="flex w-full text-base-content/60">
              <span className="text-xs font-bold ">Owned by&nbsp;</span>
              <span className="text-xs font-bold">{owner}</span>
            </div>
          </div>
        </div>
        <Link
          href={asset?.permalink! || "#"}
          target="_blank"
          className="flex w-full space-x-2"
        >
          <Image
            src="/images/dashboard/opensea.png"
            alt="Opensea"
            width={20}
            height={20}
          />
          <p className="text-sm">Opensea</p>
        </Link>
        <div className="justify-end pt-4 card-actions">
          <Link
            href={`/nfts/${nft?.tokenId}`}
            className="w-full hover:bg-accent-focus btn btn-sm bg-accent text-base-100"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
