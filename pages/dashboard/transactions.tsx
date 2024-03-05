import TransactionTable from "@/components/ui/MyTransactionsTable";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";

function Transaction() {
  return (
    <DashboardLayout>
      <div className="w-full min-h-screen">
        <div className="relative flex items-center justify-center w-full overflow-hidden h-36 ">
          <h1 className="text-2xl z-10 backdrop-blur-[25.5px] bg-black/[0.2] px-12 py-4 rounded-xl font-Tactic text-gray-50 tracking-wide leading-6">
            ASTER{<span className="text-CustomGreen">FI</span>}
          </h1>

          <div className="h-36 w-36 bg-[#10ED10] absolute blur-[133.5px] -bottom-12 z-0"></div>
          <img
            src="/images/transactions-bg.png"
            className="absolute object-fill h-64 scale-105 bg-top brightness-125 -bottom-24"
            alt="img"
          />
        </div>
        <TransactionTable />
      </div>
    </DashboardLayout>
  );
}

export default Transaction;
