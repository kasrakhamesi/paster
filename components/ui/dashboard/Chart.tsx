import { Calendar, Clock, I3Dcube } from "iconsax-react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";


interface DataItem {
  name: string;
  date: string;
  time: string;
  amt: number;
}

const data: DataItem[] = [
  {
    name: "Test 1",
    date: "Jul, 2022",
    time: "16:45:30",
    amt: 25963,
  },
  {
    name: "Test 2",
    date: "Jul, 2022",
    time: "16:45:30",
    amt: 15963,
  },
  {
    name: "Test 3",
    date: "Jul, 2022",
    time: "16:45:30",
    amt: 22963,
  },
  {
    name: "Test 4",
    date: "Jul, 2022",
    time: "16:45:30",
    amt: 12963,
  },
  {
    name: "Test 5",
    date: "Jul, 2022",
    time: "16:45:30",
    amt: 20963,
  },
  {
    name: "Test 6",
    date: "Jul, 2022",
    time: "16:45:30",
    amt: 10963,
  },
  {
    name: "Test 7",
    date: "Jul, 2022",
    time: "16:45:30",
    amt: 20963,
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; payload: DataItem }[];
  label?: string;
}

function Chart() {
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as DataItem;
      return (
        <div
          className="select-none ring-0 border-0 outline-0 bg-black/[0.06px] shadow-2xl flex-col text-gray-50 px-6 pr-10 flex items-start 
         justify-start backdrop-blur-[42.5px] py-6 rounded-r-2xl relative"
        >
          <div className="w-2 h-full bg-[#1BCF92] absolute top-0 left-0 z-50"></div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-start">
              <Calendar size={24} />
              <p className="ml-2">{payload[0].payload.date}</p>
            </div>
            <div className="flex items-center justify-start">
              <Clock size={24} />
              <p className="ml-2">{payload[0].payload.time}</p>
            </div>
          </div>
          <div className="flex flex-col mt-5 space-y-2">
            <div className="flex justify-center text-[#9E9E9E] items-center font-GilroyThin">
              <I3Dcube size={20} />
              <p className="ml-2 text-sm">Total Worth</p>
            </div>
            <div>
              <p className="text-xl text-CustomGreen">
                <NumericFormat
                  value={payload[0].value}
                  displayType="text"
                  thousandSeparator=","
                />
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null
  };

  return (
    // <div className="w-1/2 min-h-[300px] rounded bg-CustomGray">
    <ResponsiveContainer
      width={`100%`}
      height={400}
      className="rounded-3xl overflow-hidden select-none bg-[#0E111C]"
    >
      <AreaChart
        width={600}
        height={400}
        margin={{
          top: 70,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        data={data}
      >
        {/* <XAxis dataKey="name" /> */}
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1BCF92" stopOpacity={1} />
            <stop offset="95%" stopColor="#1D202D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type={"monotone"}
          dataKey="amt"
          strokeWidth={4}
          stroke="#1BCF92"
          fill="url(#color)"
          activeDot={{ r: 8 }}
        />

        <Tooltip cursor={false} content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
    // </div>
  );
}

export default Chart;
