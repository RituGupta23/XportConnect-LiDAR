import { FaTruck, FaSearchLocation, FaHandshake } from "react-icons/fa";

export default function ShipmentManagement() {
  return (
    <div className="p-8 h-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-6 font-bold text-darkGrey">
          Shipment Management
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage all your shipping needs efficiently and effortlessly.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* Create New Shipment */}
        <div className="relative bg-white shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <FaTruck className="text-blue-500 text-4xl" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Create New Shipment
              </h3>
            </div>
            <p className="text-gray-600">
              Quickly start a new shipment by filling out the necessary details.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-blue-500 text-white text-center py-3 rounded-b-lg cursor-pointer hover:bg-blue-600">
            Start Now
          </div>
        </div>

        {/* Track Shipments */}
        <div className="relative bg-white shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <FaSearchLocation className="text-green-500 text-4xl" />

              <h3 className="text-2xl font-semibold text-gray-800">
                Track Shipments
              </h3>
            </div>
            <p className="text-gray-600">
              Monitor the location and status of your shipments in real time.
            </p>
          </div>
          <a href="/tracking">
            <div className="absolute bottom-0 left-0 w-full bg-green-500 text-white text-center py-3 rounded-b-lg cursor-pointer hover:bg-green-600">
              Track Now
            </div>
          </a>
        </div>

        {/* Rate Negotiation */}
        {/* <div className="relative bg-white shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <FaHandshake className="text-purple-500 text-4xl" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Rate Negotiation
              </h3>
            </div>
            <p className="text-gray-600">
              Negotiate and secure the best rates for your shipping needs.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-purple-500 text-white text-center py-3 rounded-b-lg cursor-pointer hover:bg-purple-600">
            Negotiate Now
          </div>
        </div> */}
      </div>
    </div>
  );
}
