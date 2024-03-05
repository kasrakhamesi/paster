import Image from 'next/image'
import React, { useState } from 'react'
import bgImage from '@/public/images/transactions-bg.png'

const data = [
  {
    id: 1,
    title: 'Submission of Proposal',
    content: `A proposal is shared within the DAO.
    Voting by Owners: All owners of the DAO have the opportunity to cast their vote in favor of the idea.`,
  },
  {
    id: 2,
    title: 'Voting by Owners',
    content: `All owners of the DAO have the opportunity to cast their vote in favor of the idea.`,
  },
  {
    id: 3,
    title: 'Implementation of Winning Concept',
    content: `The proposal that receives the highest number of votes will be implemented.`,
  },
]
function Control() {
  const [Status, setStatus] = useState(1)
  return (
    <div className='grid gap-10 pt-20 lg:grid-cols-2' id='DAO'>
      <div>
        <h1 className='my-2 text-3xl lg:text-5xl font-GilroyBlack '>
          You're in control
        </h1>
        <p className='max-w-[700px] text-accent  my-6'>
          As a constituent of the Decentralized Autonomous Organization, you will have the privilege to participate in the decision-making process and cast your vote for the prospective concepts of the Asterfi.
        </p>

        <div className='flex flex-col items-start justify-start w-full h-full space-y-5 '>
          {/* Accordion  */}

          {data.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setStatus(item.id)}
                className='relative z-20 flex items-start justify-start w-full px-6 py-4 space-x-6 overflow-hidden bg-CustomGray/30 backdrop-blur-xl rounded-2xl'
              >
                <div className='min-w-[40px] min-h-[40px] bg-accent rounded-2xl flex items-center justify-center text-CustomBlack'>
                  {item.id}
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <h3 className='text-xl font-bold cursor-pointer '>{item.title}</h3>
                  <p
                    className={` text-sm max-w-[300px] ${Status === item.id ? 'block' : 'hidden'
                      }`}
                  >
                    {item.content}
                  </p>
                </div>
                <div
                  className={`w-[20%] h-full duration-500 bg-CustomGreen/60  blur-3xl -z-10 absolute top-1/2  transform  -translate-y-1/2 ${Status === item.id ? 'left-1/2 -translate-x-1/2' : ' left-0'
                    }`}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
      {/* IMage Container */}
      <div className='relative w-full h-full min-h-[400px] flex items-center justify-center'>
        {/* <div className='h-36 w-36 bg-black absolute blur-[133.5px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'></div> */}
        <div className='h-36 w-36 bg-[#10ED10] absolute blur-[133.5px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'></div>
        <Image
          width={300}
          height={300}
          src={bgImage}
          className=''
          alt='img'
        />
      </div>
      {/* IMage Container */}
    </div>
  )
}

export default Control
