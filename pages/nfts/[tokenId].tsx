import TextGradient from "@/components/ui/TextGradient";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayoutDis";
import { globals } from "@/config/globals";
import { IOpenSeaAsset } from "@/interfaces/opensea";
import { calculatePercentile, minifyAddress } from "@/utils/helpers";
import {
  useEvmNFTMetadata,
  useEvmReSyncMetadata,
  useEvmSyncNFTContract,
} from "@moralisweb3/next";
import axios from "axios";
import { useRouter } from "next/router";
import { cache, useContext, useEffect, useState } from "react";
import { LoaderIcon, toast } from "react-hot-toast";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { Blur, MoneyRecive, Refresh, Stickynote, Tag2 } from "iconsax-react";
import { ThemeContext } from "@/context/ThemeContext";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import NFTTransfers from "@/components/ui/dashboard/NFTTransfers";
import NFTDetailsBackup from "@/components/ui/dashboard/NFTDetailsBackup";
import CollectionABI from "@/contracts/collectionABI.json";
import DepositModal from "@/components/ui/dashboard/DepositModal";
import { GetServerSidePropsContext } from "next";
import { set } from "nprogress";

// get tokenId from getServerSideProps

const NFTPage = ({ tokenId }: { tokenId: string }) => {
  const { address } = useAccount();
  //const address = "0xE562C7921f5B17a1C83b3cb255611847Fb83A41E";
  //const address = "0xE562C7921f5B17a1C83b3cb255611847Fb83A41E";

  // const router = useRouter()
  const [depositModal, setDepositModal] = useState(false);
  // const tokenId = router.query.tokenId
  const [asset, setAsset] = useState<null | IOpenSeaAsset>(null);
  const [image, setImage] = useState<null | string>(null);
  const [nftName, setNftName] = useState<string>("");
  const [openseaError, setOpenseaError] = useState<boolean>(false);
  const [openseaLoading, setOpenseaLoading] = useState<boolean>(true);
  const [revealed, setRevealed] = useState<boolean | undefined>(undefined);
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const [loadingBackupTokenMetadata, setLoadingBackupTokenMetadata] =
    useState<boolean>(false);
  const [errorOpenseaRefresh, setErrorOpenseaRefresh] =
    useState<boolean>(false);
  const [revealStatus, setRevealStatus] = useState<string>("Reveal");
  const [mayRefetch, setMayRefetch] = useState<boolean>(false);
  const [traits, setTraits] = useState<any>();
  const {
    data: nftMetadata,
    isFetching: loadingNFTMetadata,
    fetch: refetchNFTMetadata,
    error: errorNFTMetadata,
  } = useEvmNFTMetadata({
    address: globals.contracts.collectionAddress,
    tokenId,
    mediaItems: true,
    normalizeMetadata: true,
  });

  const depositModalHandler = () => {
    setDepositModal(!depositModal);
  };

  useEffect(() => {
    if (depositModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [depositModal]);

  async function refreshMoralisMetadata() {
    setRevealStatus("Refreshing Metadata...");
    try {
      const response = await axios.get(`/api/resync?tokenId=${tokenId}`);
      const moralisData = response.data;
      if (moralisData.error) {
        console.log(moralisData.error);
      } else {
        setTimeout(() => {
          refetchNFTMetadata();
          setRevealStatus("Reveal");
        }, 5000);
      }
    } catch (error) {
      setRevealStatus("Reveal");
      toast.error("Could not refresh metadata. Please try again later.");
    }
  }

  async function refreshOpenseaMetadata() {
    setRevealStatus("Refreshing Metadata...");
    try {
      const response = await axios.get(
        `/api/opensea-refresh?tokenId=${tokenId}`
      );
      refreshMoralisMetadata();
      const openseaData = response.data;
      if (openseaData.error) {
        setErrorOpenseaRefresh(true);
        console.log(openseaData.error);
      } else {
        setTimeout(() => {
          getOpenseaAsset(true);
        }, 5000);
        setErrorOpenseaRefresh(false);
      }
    } catch (error: any) {
      console.log(error);
      setErrorOpenseaRefresh(true);
    }
  }

  const {
    write: revealNFT,
    data: revealData,
    isLoading: revealingNFT,
  } = useContractWrite({
    address: globals.contracts.collectionAddress,
    abi: CollectionABI,
    functionName: "RevealNFT",
    args: [tokenId],
    gas: 300_000n,
    onError: (error) => {
      setRevealStatus("Reveal");
      switch (error.stack?.split("\n")[1]) {
        case "NotOwnerOfNFT":
          toast.error("You are not the owner of this NFT.");
          break;
        default:
          toast.error("Something went wrong. Please try again later.");
          break;
      }
    },
    onSuccess: (result) => {
      setRevealStatus("Reveal");
      console.log(result);
      toast.success("Let's wait for a few confirmations.");
    },
    onMutate: () => {
      setRevealStatus("Revealing...");
      console.log("Mutate");
    },
  });

  useWaitForTransaction({
    hash: revealData?.hash,
    onSuccess(data) {
      console.log(data);
      toast.success("NFT revealed successfully!");

      setRevealStatus("Refreshing Metadata...");
      refreshMoralisMetadata();
      refreshOpenseaMetadata();
    },
  });

  async function getOpenseaAsset(needManualRefresh: boolean = false) {
    try {
      const response = await axios.get(
        `/api/opensea-assetv1?tokenId=${tokenId}`
      );
      const openseaData = response.data;
      if (openseaData.error) {
        setOpenseaError(true);
      } else {
        if (
          String(openseaData.data.image_url).includes(".gif") &&
          !needManualRefresh
        ) {
          await refreshOpenseaMetadata();
          await refreshMoralisMetadata();
        } else if (
          !String(openseaData.data.image_url).includes(".gif") ||
          needManualRefresh
        ) {
          setAsset(openseaData.data);
          setImage(openseaData.data.image_url);
          setNftName(openseaData.data.name);
        }
        setTraits(
          openseaData.data?.traits ||
            (nftMetadata?.metadata as any)?.attributes ||
            []
        );
      }
    } catch (error) {
      setOpenseaError(true);
    } finally {
      setRevealStatus("Reveal");
      setOpenseaLoading(false);
    }
  }

  const moralisImage =
    nftMetadata?.media?.mediaCollection?.low.url &&
    !nftMetadata?.media?.mediaCollection?.low.url.endsWith("gif")
      ? nftMetadata?.media?.mediaCollection?.low.url
      : nftMetadata?.media?.originalMediaUrl;

  useEffect(() => {
    if (!tokenId) return;
    refreshMoralisMetadata();
    refetchNFTMetadata();
    getOpenseaAsset();
  }, [tokenId]);

  useEffect(() => {
    if (!nftMetadata) return;
    if ((nftMetadata?.metadata as unknown as any).attributes.length > 1) {
      setRevealed(true);
      //TODO checkReveal
      setLoadingBackupTokenMetadata(true);
    } else setRevealed(false);
  }, [nftMetadata]);

  useEffect(() => {
    if (asset && asset?.traits) setTraits(asset?.traits);
  }, [asset]);

  useEffect(() => {
    if (traits?.length > 1) {
      setRevealed(true);
    }
  }, [traits]);

  const description =
    asset?.asset_contract.description ||
    (nftMetadata?.metadata as any)?.description ||
    "No description provided.";

  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
  const [openAcc3, setOpenAcc3] = useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  const { theme } = useContext(ThemeContext);

  function Icon({ open }: { open: boolean }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  const handleReveal = () => {
    revealNFT();
  };

  const handleDeposit = () => {
    console.log("deposit modal");
    setDepositModal(true);
  };

  return (
    <DashboardLayout>
      <div className="flex w-full h-full space-x-0 space-y-0 lg:space-x-4">
        <div className="flex flex-col w-full space-y-4 md:w-1/2 lg:w-1/3 ">
          {/* NFT Image box */}
          <div className="flex flex-col w-full p-2 space-y-4 border border-1 border-neutral rounded-xl">
            <div className="flex justify-between">
              <div className="flex space-x-1">
                <p>status: </p>
                <p className="text-secondary">
                  {" "}
                  {revealStatus !== "Reveal"
                    ? revealStatus
                    : revealed
                    ? "Revealed"
                    : "Unrevealed"}
                </p>
              </div>
              <div className="tooltip" data-tip="Ethereum">
                <img
                  src="/images/ethereum/ethereum.svg"
                  alt=""
                  className="w-6 h-6"
                />
              </div>
            </div>
            {openseaLoading && loadingNFTMetadata ? (
              <img
                src={image || moralisImage || "/images/unrevealed.webp"}
                alt=""
                className="object-contain w-full mask mask-squircle"
              />
            ) : (
              <img
                src={image || moralisImage || "/images/unrevealed.webp"}
                alt=""
                className="object-contain w-full mask mask-squircle"
              />
            )}
            <div className="flex space-x-4">
              <div
                className="tooltip tooltip-right whitespace-break-spaces"
                data-tip={
                  asset
                    ? `${calculatePercentile(
                        asset.rarity_data.rank
                      )}\n Rarity Rank: ${asset.rarity_data.rank}/2000`
                    : "loading..."
                }
              >
                <div className="px-2 py-1 border rounded-xl border-1 border-neutral">
                  {asset ? `# ${asset?.rarity_data.rank}` : <LoaderIcon />}
                </div>
              </div>
            </div>
          </div>

          {/* NFT Name */}
          <div className="flex justify-between">
            <div className="flex flex-col w-full space-y-2 md:hidden">
              {!nftName || !nftMetadata ? (
                <LoaderIcon />
              ) : (
                <TextGradient
                  text={nftMetadata?.name + " #" + nftMetadata?.tokenId}
                />
              )}
              {nftMetadata && (
                <h2 className="">
                  Owned by{" "}
                  <span className="text-asterfiBlue">
                    {address && nftMetadata?.ownerOf?.equals(address)
                      ? "You"
                      : minifyAddress(nftMetadata!.ownerOf!.checksum)}
                  </span>
                </h2>
              )}
              {revealed && (
                <NFTDetailsBackup
                  mayRefetch={mayRefetch}
                  setMayRefetch={setMayRefetch}
                  id={tokenId}
                  revealed={revealed}
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          {revealed === undefined ? (
            <div></div>
          ) : (
            <div className="flex flex-col space-y-2">
              {!revealed && (
                <button
                  disabled={revealingNFT}
                  className="btn flex-nowrap btn-info"
                  onClick={handleReveal}
                >
                  {revealingNFT ? <LoaderIcon /> : <Blur />}
                  {revealStatus}
                </button>
              )}

              {revealed && (
                <button
                  onClick={handleDeposit}
                  className="btn btn-accent flex-nowrap text-base-100"
                >
                  <MoneyRecive />
                  Deposite
                </button>
              )}
              {revealed && (
                <button onClick={refreshOpenseaMetadata} className="btn">
                  <Refresh />
                  Refresh Metadata
                </button>
              )}
            </div>
          )}
          {/* Description */}
          <Accordion open={openAcc1} icon={<Icon open={openAcc1} />}>
            <AccordionHeader
              className="text-base-content hover:text-asterfiBlue"
              onClick={handleOpenAcc1}
            >
              <div className="flex items-center space-x-2">
                <Stickynote size="25" />
                <span>Description</span>
              </div>
            </AccordionHeader>
            <AccordionBody className="text-md font-Gilroy text-base-content">
              {!description ? (
                <LoaderIcon />
              ) : showFullDescription ? (
                description
              ) : (
                description.slice(0, 200) + "..."
              )}
              <button
                className="ml-1 text-accent"
                onClick={() => setShowFullDescription((prev) => !prev)}
              >{`Read ${showFullDescription ? "Less" : "More"}`}</button>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="md:hidden"
            open={openAcc2}
            icon={<Icon open={openAcc2} />}
          >
            <AccordionHeader
              className="text-base-content hover:text-asterfiBlue"
              onClick={handleOpenAcc2}
            >
              <div className="flex items-center space-x-2">
                <Tag2 size="25" />
                <span>Traits</span>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
                {!traits ? (
                  <LoaderIcon />
                ) : (
                  traits.map((trait: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center w-full py-2 mx-auto bg-base-300 rounded-xl`}
                      >
                        <div className="flex items-center space-x-2">
                          <p className="font-bold uppercase text-asterfiBlue">
                            {trait?.trait_type}
                          </p>
                        </div>
                        <p className="font-bold capitalize text-base-content">
                          {trait?.value}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="md:hidden"
            open={openAcc3}
            icon={<Icon open={openAcc3} />}
          >
            <AccordionHeader
              className="text-base-content hover:text-asterfiBlue"
              onClick={handleOpenAcc3}
            >
              <div className="flex items-center space-x-2">
                <Stickynote size="25" />
                <span>Token Activity</span>
              </div>
            </AccordionHeader>
            <AccordionBody className="text-base-content">
              <NFTTransfers
                tokenId={tokenId}
                imageUrl={image || moralisImage || "/images/unrevealed.webp"}
              />
            </AccordionBody>
          </Accordion>
        </div>
        <div className="flex-col hidden md:flex md:w-1/2 lg:w-2/3">
          <div className="flex justify-between">
            <div className="flex-col space-y-2">
              {/* NFT Name */}
              {!nftName || !nftMetadata ? (
                <LoaderIcon />
              ) : (
                <TextGradient
                  text={
                    nftName || nftMetadata?.name + " #" + nftMetadata?.tokenId
                  }
                />
              )}

              {/* NFT Owner */}
              {nftMetadata && (
                <h2 className="">
                  Owned by{" "}
                  <span className="text-asterfiBlue">
                    {address && nftMetadata?.ownerOf?.equals(address!)
                      ? "You"
                      : minifyAddress(nftMetadata!.ownerOf!.checksum)}
                  </span>
                </h2>
              )}
            </div>
            {revealed && (
              <div className="flex justify-end w-1/3 min-w-fit">
                <NFTDetailsBackup
                  mayRefetch={mayRefetch}
                  setMayRefetch={setMayRefetch}
                  id={tokenId}
                  revealed={revealed}
                />
              </div>
            )}
          </div>
          <Accordion
            className=""
            open={openAcc2}
            icon={<Icon open={openAcc2} />}
          >
            <AccordionHeader
              className="text-base-content hover:text-asterfiBlue"
              onClick={handleOpenAcc2}
            >
              <div className="flex items-center space-x-2">
                <Tag2 size="25" />
                <span>Traits</span>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
                {!traits ? (
                  <LoaderIcon />
                ) : (
                  traits.map((trait: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center w-full py-2 mx-auto  bg-base-300 rounded-xl`}
                      >
                        <div className="flex items-center space-x-2">
                          <p className="font-bold uppercase text-asterfiBlue">
                            {trait?.trait_type}
                          </p>
                        </div>
                        <p className="font-bold capitalize text-base-content">
                          {trait?.value}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="hidden md:block"
            open={openAcc3}
            icon={<Icon open={openAcc3} />}
          >
            <AccordionHeader
              className="text-base-content hover:text-asterfiBlue"
              onClick={handleOpenAcc3}
            >
              <div className="flex items-center space-x-2">
                <Stickynote size="25" />
                <span>Token Activity</span>
              </div>
            </AccordionHeader>
            <AccordionBody className="text-base-content">
              <NFTTransfers
                tokenId={tokenId}
                imageUrl={image || moralisImage || "/images/unrevealed.webp"}
              />
            </AccordionBody>
          </Accordion>
        </div>
      </div>
      <DepositModal
        setMayRefetch={setMayRefetch}
        Modal={depositModal}
        Switch={depositModalHandler}
        tokenId={tokenId}
      />
    </DashboardLayout>
  );
};

export default NFTPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const tokenId = context.query.tokenId;
  console.log("tokenId", tokenId);
  return {
    props: {
      tokenId,
    },
  };
}
