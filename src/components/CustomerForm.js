import React from "react";

export const CustomerForm = ({ customerInfo, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Left Side: Customer Information */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={customerInfo.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={customerInfo.address}
              onChange={(e) => onChange("address", e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={customerInfo.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={customerInfo.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="Enter email"
            />
          </div>
        </div>
      </div>

      {/* Right Side: Additional Selections */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Additional Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Stone</label>
            <select
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onChange("stone", e.target.value)}
            >
              <option value="">Select stone</option>
              <option value="granite">Granite</option>
              <option value="marble">Marble</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Surface</label>
            <select
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onChange("surface", e.target.value)}
            >
              <option value="">Select surface</option>
              <option value="polished">Polished</option>
              <option value="honed">Honed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Edge Profile</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onChange("edgeProfile", e.target.value)}
              placeholder="Enter edge profile"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sink</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onChange("sink", e.target.value)}
              placeholder="Enter sink type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Corners</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onChange("corners", e.target.value)}
              placeholder="Enter corner type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salesperson</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onChange("salesperson", e.target.value)}
              placeholder="Enter salesperson"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
