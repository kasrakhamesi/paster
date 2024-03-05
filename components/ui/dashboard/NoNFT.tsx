import { globals } from "@/config/globals";

const NoNFT = () => {
  return (
    <div className="w-full px-3">
      <div
        className="w-full h-72 rounded-3xl lg:rounded-[50px]"
        style={{
          backgroundImage: "url(/images/dashboard/back.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="w-full mt-5 text-2xl text-center font-GilroyBold">
        Unfortunately, it appears that you do not have any Asterfi in your
        wallet. We suggest acquiring one from OpenSea to resolve this issue.
      </div>
      <a href={globals.env.openseaAsterfiPage}>
        <button className="flex items-center justify-center py-4 mx-auto mt-10 space-x-2 duration-300 rounded-lg shadow-xl bg-CustomGreen text-CustomBlack font-GilroyBold px-9 shadow-CustomGreen/20 hover:bg-CustomGreen/90 hover:shadow-lg">
          <p>OPENSEA</p>
        </button>
      </a>
    </div>
  );
};

export default NoNFT;
