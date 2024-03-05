import { ArchiveBox, ArrangeVertical, BoxTick, Image } from "iconsax-react";
import { IInformation } from "@/interfaces/projectInfo";

export const informationData: IInformation[] = [
  {
    title: "NFTs",
    content: `Exercise full authority over your Non-Fungible Tokens (NFTs) and ERC20 investment portfolios.`,
    position: "left",
    icon: <Image size={25} variant="Bold" />,
  },
  {
    title: "Transaction",
    content: `Monitor and evaluate the most recent transactions to gain insightful information.`,
    position: "left",
    icon: <ArrangeVertical size={20} variant="Bold" />,
  },
  {
    title: "DAO",
    content: `Make a determination and cast your vote to choose the next concept for the project.`,
    position: "left",
    icon: <BoxTick size={25} variant="Bold" />,
  },
];
