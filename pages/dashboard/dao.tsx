import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import Image from "next/image";
import MissingImage from "@/public/images/dashboard/back.jpg";

const dao = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full px-3 ">
        <Image
          className="rounded-3xl"
          src={MissingImage}
          alt="dao is missing"
        />
        <div className="w-full mt-5 text-2xl text-center font-GilroyBold">
          DAO is imminent, and its arrival is eagerly anticipated...
        </div>
      </div>
    </DashboardLayout>
  );
};

export default dao;
