import React, { useState } from 'react';

interface ClientDropdownProps {
  clients: { name: string; address?: string }[];
  value: string;
  onChange: (value: string) => void;
  onAddClient: (name: string, address: string) => void;
}

export default function ClientDropdown({
  clients,
  value,
  onChange,
  onAddClient,
}: ClientDropdownProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientAddress, setNewClientAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddClient = () => {
    if (!newClientName.trim()) {
      setError('Client name cannot be empty');
      return;
    }

    onAddClient(newClientName, newClientAddress);
    setNewClientName('');
    setNewClientAddress('');
    setShowAddDialog(false);
    setError(null);
  };

  return (
    <div className="field-group">
      <label htmlFor="client_name" className="font-semibold">Client Name</label>
      
      <div className="flex gap-2">
        <select
          id="client_name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        >
          <option value="">Select a client...</option>
          {clients.map((client) => (
            <option key={client.name} value={client.name}>
              {client.name}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-1"
          title="Add new client"
        >
          ➕ Add
        </button>
      </div>

      {showAddDialog && (
        <div className="info-message">
          <h3 className="font-semibold mb-3">Add New Client</h3>
          
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter client name"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter client address"
              value={newClientAddress}
              onChange={(e) => setNewClientAddress(e.target.value)}
              className="w-full"
            />
          </div>

          {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

          <div className="flex gap-2">
            <button
              onClick={handleAddClient}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Save Client
            </button>
            <button
              onClick={() => {
                setShowAddDialog(false);
                setNewClientName('');
                setNewClientAddress('');
                setError(null);
              }}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
