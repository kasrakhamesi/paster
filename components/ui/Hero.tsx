import React from "react";
import WallectConnectHeroButton from "./DynamicWalletHero";
import TextGradient from "./TextGradient";
import City from "./City";

function Hero() {
  return (
    <div className="grid w-full h-full gap-5 my-5 pt-36 place-items-center lg:grid-cols-2 lg:mt-10 ">
      <div className="order-2 lg:order-1 ">
        <TextGradient
          text="Invest in your Visions"
          class="lg:text-[80px] lg:leading-[84px]"
        />
        <p className="my-6 text-xl">
          Take control of your Asterfis and make decisions regarding its
          utilization, growth, and progression, either for sustenance, death, or
          even expansion.
        </p>
        <div className="grid max-w-md mx-auto my-8 md:mx-0 lg:grid-cols-2 lg:gap-12">
          {/* <WalletConnectButtonHero /> */}
          <WallectConnectHeroButton />
        </div>
      </div>
      <div className="relative flex items-center justify-center order-1 w-full lg:order-2">
        <div className="w-full transition-all duration-200 ease-out md:max-w-md ">
          <City />
        </div>
      </div>
    </div>
  );
}

export default Hero;
