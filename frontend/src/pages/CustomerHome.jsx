import { TruckIcon, CurrencyDollarIcon, FaceSmileIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="min-h-screen px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-darkGrey">Welcome to XportConnect</h1>
        <p className="text-xl text-darkGrey mt-2">
          Your trusted platform for global shipping, orders, and customer satisfaction.
        </p>
      </div>

      {/* Something About Section */}
      <div className="bg-white shadow rounded-lg p-8 text-center space-y-6">
        <h2 className="text-3xl font-semibold text-darkGrey">Something About XportConnect</h2>
        <p className="text-lg text-gray-700">
          XportConnect is a global shipping solution designed to make your logistics
          easier. Whether you're tracking your shipments, reviewing orders, or managing
          customer support, we've got everything you need for a seamless experience.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-yellow text-white rounded-lg shadow-md hover:bg-yellowHover transition">
            Get Started
          </button>
          <button className="px-6 py-3 bg-darkGrey text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <h2 className="text-3xl font-semibold text-darkGrey">What Our Customers Say</h2>
        <p className="text-lg text-gray-700 mt-4">
          Our customers love our seamless service and the ease of tracking shipments.
          Here's what they have to say!
        </p>
        <div className="mt-6">
          {[ 
            { feedback: "Excellent service, fast and reliable!", rating: "5/5", color: "bg-green-100 text-green-800" },
            { feedback: "Good platform, but could improve shipping times.", rating: "4/5", color: "bg-yellow-100 text-yellow-800" },
          ].map((testimonial, index) => (
            <div key={index} className="py-3">
              <p className="text-lg text-darkGrey">{testimonial.feedback}</p>
              <span className={`px-3 py-1 text-sm rounded-full ${testimonial.color}`}>Rating: {testimonial.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
