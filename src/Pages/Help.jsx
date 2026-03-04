import { Divide } from 'lucide-react'
import React, { useEffect } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';

const Help = () => {
    const [arrow1, setArrow1] = useState(false)
    const [arrow2, setArrow2] = useState(false)
    const [arrow3, setArrow3] = useState(false)
    const [arrow4, setArrow4] = useState(false)
    const [arrow5, setArrow5] = useState(false)
    const [arrow6, setArrow6] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
  return (
    <div className='w-screen h-full'>
        <div className='px-15 pt-8 font-bold text-2xl'>
              What issue are you facing?
        </div>
          <div className='w-[90vw] mx-5 border-2 h-20 sm:w-[60vw] sm:mx-15 sm:h-15 flex items-center font-semibold  my-4 justify-between p-5 hover:scale-102'>
              I want to change the address for delivery of my order. Is it possible now?
              <IoIosArrowDown  onClick={()=>{setArrow1(!arrow1)}}  />
          </div>
          {
              arrow1 && <div className=' text-[#878787] py-2 px-2 sm:px-15 '>
                  The delivery address for your order can be changed depending on its status. Please check Orders Order Details for the below:
                  Approved/Processing: If this is your order status, then you can change the address through your Flipkart app.
                  Shipped: Only text change in your address will be possible. Pincode cannot be changed at this stage.
                  Delivered: As the item would have already been delivered, the address change will not be possible.
              </div>
          }
          <div className='w-[90vw] mx-5 border-2 h-20 sm:w-[60vw] sm:mx-15 sm:h-15 flex items-center font-semibold  my-4 justify-between p-5 hover:scale-102'>
              Can I get my order delivered faster?
              <IoIosArrowDown onClick={() => { setArrow2(!arrow2) }} />
          </div>
          {
              arrow2 && <div className=' text-[#878787] py-2 px-2 sm:px-15'>
                  No, the delivery date you see after the order confirmation is provided is based on factors like your address, the seller's address and the time needed by delivery partners to process and ship your order. Due to these factors, they do not have the option to change the delivery date and have it reach you earlier. However, you can track your order and its movement easily from our app or website.
              </div>
          }
          <div className='w-[90vw] mx-5 border-2 h-20 sm:w-[60vw] sm:mx-15 sm:h-15 flex items-center font-semibold  my-4 justify-between p-5 hover:scale-102'>
              Can I reinstate a cancelled order?
              <IoIosArrowDown  onClick={() => { setArrow3(!arrow3) }} />
          </div>
          {
              arrow3 && <div className=' text-[#878787] py-2 px-2 sm:px-15'>
                  No, a cancelled order can not be reinstated.
              </div>
          }
          <div className='w-[90vw] mx-5 border-2 h-20 sm:w-[60vw] sm:mx-15 sm:h-15  flex items-center font-semibold my-4 justify-between p-5 hover:scale-102'>
              Where can I get the delivery executive's contact details?
              <IoIosArrowDown onClick={() => { setArrow4(!arrow4) }} />
          </div>
          {
              arrow4 && <div className=' text-[#878787] py-2 px-2 sm:px-15'>
                  Once your order is ‘Out for delivery’, you will get the delivery executive details by visiting the Orders section of your Flipkart account.
              </div>
          }
          <div className='w-[90vw] mx-5 border-2 h-20 sm:w-[60vw] sm:mx-15 sm:h-15  flex items-center font-semibold  my-4 justify-between p-5 hover:scale-102'>
              Can I ask the delivery executive to reschedule the pickup date?
              <IoIosArrowDown onClick={() => { setArrow5(!arrow5) }} />
          </div>
          {
              arrow5 && <div className=' text-[#878787] py-2 px-2 sm:px-15'>
                  Yes. You can schedule the pickup date based on your convenience.
              </div>
          }
          <div className='w-[90vw] mx-5 border-2 h-20 sm:w-[60vw] sm:mx-15 sm:h-15 flex items-center font-semibold  my-4 justify-between p-5 hover:scale-102'>
              How do I place a request for order replacement?
              <IoIosArrowDown onClick={() => { setArrow6(!arrow6) }} />
          </div>
          {
              arrow6 && <div className='text-[#878787] py-2 px-2 sm:px-15'>
                  Place a return request in the Orders page. You will get an option to choose refund/replace/exchange as per our return policy.
              </div>
          }
          
    </div>
  )
}

export default Help