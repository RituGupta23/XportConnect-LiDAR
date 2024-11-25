import React from "react";

const mockTrackingData = [
  {
    status: "Order Confirmed",
    date: "Fri, 22nd Dec '24",
    details: [
      { time: "9:09pm", description: "Your order has been placed." },
      { time: "11:05am", description: "Seller has processed your order." },
      { time: "11:06am", description: "Your item has been picked up by the courier partner." },
    ],
  },
  {
    status: "Shipped",
    date: "Sat, 23rd Dec '24",
    details: [
      { time: "1:00pm", description: "Your item has been shipped." },
      { time: "12:55pm", description: "Your item has arrived at a distribution center in Frankfurt, Germany." },
      { time: "12:46am", description: "Your item has left the distribution center in Frankfurt, Germany." },
      { time: "6:50am", description: "Your item has arrived at a processing facility in Kolkata, India." },
    ],
  },
  {
    status: "Out For Delivery",
    date: "Sun, 24th Dec '24",
    details: [{ description: "Item yet to be delivered." }],
  },
  {
    status: "Delivery Expected",
    date: "By Sun, 26th Dec",
    details: [{ description: "Item yet to be delivered." }],
  },
];

function TrackingTimeline() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#232F3E]">Tracking Timeline</h1>
      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-2 top-0 w-1 h-full bg-gradient-to-b from-yellow-500 to-[#F3F3F3] rounded-md"
          aria-hidden="true"
        ></div>
        {mockTrackingData.map((item, index) => (
          <div
            key={index}
            className={`mb-6 pl-8 relative bg-[#F3F3F3] p-4 rounded-md shadow-md`}
          >
            {/* Timeline Circle */}
            <div
              className={`absolute -left-4 w-6 h-6 rounded-full ${
                index < 2 ? "bg-yellow-500 border-[#232F3E]" : "bg-gray-300 border-gray-400"
              } border-4 flex items-center justify-center`}
            >
              {index < 2 && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#232F3E]"></div>
              )}
            </div>
            <h2 className="text-lg font-semibold text-[#232F3E] flex items-center">
              {item.status}
              <span className="ml-2 text-sm text-[#131A22] font-medium bg-[#FF9900] px-2 py-1 rounded-md">
                {item.date}
              </span>
            </h2>
            <ul className="mt-3 space-y-2">
              {item.details.map((detail, idx) => (
                <li key={idx} className="mb-2">
                  <p className="text-sm text-[#131A22] flex items-start">
                    {detail.time && (
                      <span className="font-semibold mr-2 text-[#FF7F00]">
                        {detail.time} -
                      </span>
                    )}
                    {detail.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingTimeline;