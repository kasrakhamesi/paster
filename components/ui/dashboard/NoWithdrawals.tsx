const NoWithdrawals = () => {
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
        You do not have any withdrawal.
      </div>
    </div>
  );
};

export default NoWithdrawals;
