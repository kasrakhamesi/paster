import { Fragment, useContext, useState } from "react";

import { Stickynote, Tag, Tag2 } from "iconsax-react";
import { LoaderIcon } from "react-hot-toast";
import { ITrait } from "@/interfaces/opensea";
import { ThemeContext } from "@/context/ThemeContext";
import NFTTransfers from "./NFTTransfers";

type Props = {
    description: string;
    traits: ITrait[];
}

export default function NFTDetailsAccordion({ description, traits }: Props) {



    return (
        <>


        </>
    );
}