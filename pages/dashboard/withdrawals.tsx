import { useState } from "react";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import DataLoader from "@/components/ui/dashboard/DataLoader";
import NoWithdrawals from "@/components/ui/dashboard/NoWithdrawals";
import PageHeader from "@/components/ui/dashboard/PageHeader";
import Pagination from "@/components/ui/dashboard/Pagination";
import WithdrawalTable from "@/components/ui/dashboard/WithdrawalTable";
import { getWithdrawals } from "@/api/withdrawals";

function Withdrawals() {
  const title = "Withdrawals";
  const sub = "View your Withdrawals";

  const [data, setData] = useState<{
    totalCount: number;
    withdrawals: Withdrawal[];
  }>({
    totalCount: 0,
    withdrawals: [],
  });

  const [page, setPage] = useState(1);

  return (
    <DashboardLayout>
      <DataLoader
        load={() => getWithdrawals(page)}
        deps={[page]}
        setData={setData}
      >
        {!data.withdrawals.length ? (
          <NoWithdrawals />
        ) : (
          <div className="flex flex-col w-full h-full p-2 py-8 space-y-6 lg:p-4">
            <PageHeader title={title} sub={sub} />
            <div className="px-6 py-6 bg-base-300 rounded-3xl">
              <WithdrawalTable withdrawals={data.withdrawals} />
            </div>
            <Pagination
              totalCount={data.totalCount}
              pageSize={10}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </DataLoader>
    </DashboardLayout>
  );
}

export default Withdrawals;
