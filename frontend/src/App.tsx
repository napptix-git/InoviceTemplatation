import { useState, useEffect } from 'react';
import { apiClient } from './services/api';
import InvoiceForm from './components/InvoiceForm';
import SummarySection from './components/SummarySection';
import './App.css';

interface InvoiceData {
  [key: string]: any;
}

interface ClientData {
  name: string;
  address?: string;
}

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({});
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [calculations, setCalculations] = useState({
    quantity: 0,
    rate: 0,
    budget: 0,
    vatType: 'non-GCC',
    vatAmount: 0,
    totalAmount: 0,
  });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getInitialData();
        setInvoiceData(data);
        
        const clientList = await apiClient.getClients();
        setClients(clientList);
      } catch (err) {
        setError(`Failed to load data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFieldChange = (fieldName: string, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Update calculations if relevant fields changed
    if (fieldName === 'quantity' || fieldName === 'rate' || fieldName === 'vat_rate') {
      updateCalculations({ ...invoiceData, [fieldName]: value });
    }
  };

  const updateCalculations = (data: InvoiceData) => {
    const quantity = parseFloat(data.quantity || 0);
    const rate = parseFloat(data.rate || 0);
    const budget = (quantity * rate) / 1000;
    const vatType = data.vat_rate?.includes('GCC') ? 'GCC' : 'non-GCC';
    const vatPercent = vatType === 'GCC' ? 5 : 0;
    const vatAmount = (budget * vatPercent) / 100;
    const totalAmount = budget + vatAmount;

    setCalculations({
      quantity,
      rate,
      budget,
      vatType,
      vatAmount,
      totalAmount,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Validate required fields
      if (!invoiceData.client_name || !invoiceData.date) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Save invoice
      const result = await apiClient.saveInvoice(invoiceData);
      setSuccess(`✓ Invoice saved successfully!\n\nLocation: ${result.output_path}`);
      
      // Reset form
      setTimeout(() => {
        setInvoiceData({});
        setSuccess(null);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(`Error saving invoice: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all fields?')) {
      setInvoiceData({});
      setCalculations({
        quantity: 0,
        rate: 0,
        budget: 0,
        vatType: 'non-GCC',
        vatAmount: 0,
        totalAmount: 0,
      });
      setError(null);
      setSuccess(null);
    }
  };

  if (loading && Object.keys(invoiceData).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            📄 Invoice Template Editor
          </h1>
          <p className="text-gray-600 mt-1">Manage and create professional invoices</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {error && (
              <div className="error-message mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}
            {success && (
              <div className="success-message mb-4">
                {success}
              </div>
            )}
            
            <InvoiceForm
              invoiceData={invoiceData}
              clients={clients}
              calculations={calculations}
              onFieldChange={handleFieldChange}
              onAddClient={(name, address) => {
                setClients([...clients, { name, address }]);
              }}
            />
          </div>

          {/* Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="form-section sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
              
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mb-3 flex items-center justify-center gap-2"
              >
                💾 Save Invoice
              </button>

              <button
                onClick={handleClear}
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                🗑️ Clear Fields
              </button>
            </div>

            {/* Summary Section */}
            <SummarySection calculations={calculations} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
