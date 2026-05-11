import React, { useEffect, useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react'

const Help = () => {
    // We can use an active index instead of 6 different states to make it exclusively open one at a time, 
    // or keep an object to allow multiple to be open. Let's use an active state for exclusive accordion.
    const [activeIndex, setActiveIndex] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    const faqData = [
        {
            question: "I want to change the address for delivery of my order. Is it possible now?",
            answer: "The delivery address for your order can be changed depending on its status. Please check Orders > Order Details: \n\n• Approved/Processing: You can change the address through your app.\n• Shipped: Only minor text changes in your address will be possible. Pincode cannot be changed at this stage.\n• Delivered: Address change will not be possible."
        },
        {
            question: "Can I get my order delivered faster?",
            answer: "No, the delivery date provided after order confirmation is based on factors like your address, the seller's address, and processing time. Due to these factors, the delivery date cannot be expedited. However, you can track your order easily from our app or website."
        },
        {
            question: "Can I reinstate a cancelled order?",
            answer: "No, a cancelled order cannot be reinstated. You will need to place a new order for the items."
        },
        {
            question: "Where can I get the delivery executive's contact details?",
            answer: "Once your order is ‘Out for delivery’, you will receive the delivery executive details by visiting the Orders section of your account."
        },
        {
            question: "Can I ask the delivery executive to reschedule the pickup date?",
            answer: "Yes. You can schedule the pickup date based on your convenience directly through the app or by contacting the delivery executive."
        },
        {
            question: "How do I place a request for order replacement?",
            answer: "Place a return request in the Orders page. You will get an option to choose refund/replace/exchange as per our return policy."
        }
    ]
    
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-50 p-4 rounded-full">
                        <MessageCircleQuestion className="w-12 h-12 text-indigo-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">How can we help?</h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto">
                    Find answers to frequently asked questions below, or contact our support team if you need further assistance.
                </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
                {faqData.map((faq, index) => {
                    const isActive = activeIndex === index;
                    
                    return (
                        <div 
                            key={index} 
                            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                                isActive ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md'
                            }`}
                        >
                            <button 
                                onClick={() => toggleAccordion(index)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                            >
                                <span className={`font-semibold text-lg pr-4 ${isActive ? 'text-indigo-700' : 'text-slate-800'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                                </div>
                            </button>
                            
                            <div 
                                className={`px-6 transition-all duration-500 ease-in-out ${isActive ? 'max-h-96 opacity-100 py-4 border-t border-indigo-50/50' : 'max-h-0 opacity-0 py-0'}`}
                            >
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Contact Support Card */}
            <div className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl w-full">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Still need help?</h3>
                    <p className="text-slate-400 max-w-md">Our support team is always ready to assist you with any questions or concerns.</p>
                </div>
                <button className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap">
                    <HelpCircle className="w-5 h-5" />
                    Contact Support
                </button>
            </div>

        </div>
    )
}

export default Help