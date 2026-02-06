import React from 'react';
import ClientDropdown from './ClientDropdown';
import DatePicker from './DatePicker';
import MonthPicker from './MonthPicker';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Select from './Select';

interface Calculations {
  quantity: number;
  rate: number;
  budget: number;
  vatType: string;
  vatAmount: number;
  totalAmount: number;
}

interface InvoiceFormProps {
  invoiceData: { [key: string]: any };
  clients: { name: string; address?: string }[];
  calculations: Calculations;
  onFieldChange: (fieldName: string, value: any) => void;
  onAddClient: (name: string, address: string) => void;
}

export default function InvoiceForm({
  invoiceData,
  clients,
  calculations,
  onFieldChange,
  onAddClient,
}: InvoiceFormProps) {
  const nextInvoiceNumber = invoiceData.invoice_no || 'AUTO-GENERATED';

  return (
    <div className="form-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Invoice Details</h2>

      {/* Invoice Number */}
      <div className="field-group">
        <label className="font-semibold">Invoice No.</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value="INV-FY2526-"
            readOnly
            disabled
            className="w-full"
            placeholder="Prefix"
          />
          <input
            type="text"
            value={nextInvoiceNumber}
            readOnly
            disabled
            className="w-full"
            placeholder="Number"
          />
        </div>
      </div>

      {/* Client Name with Dropdown */}
      <ClientDropdown
        clients={clients}
        value={invoiceData.client_name || ''}
        onChange={(value) => {
          onFieldChange('client_name', value);
          const client = clients.find(c => c.name === value);
          if (client?.address) {
            onFieldChange('client_address', client.address);
          }
        }}
        onAddClient={onAddClient}
      />

      {/* Client Address */}
      <TextArea
        label="Client Address (Auto-populated)"
        value={invoiceData.client_address || ''}
        onChange={(value) => onFieldChange('client_address', value)}
        placeholder="Address will auto-populate when you select a client"
        rows={3}
      />

      {/* Client TRN */}
      <TextInput
        label="Client TRN No."
        value={invoiceData.client_trn || ''}
        onChange={(value) => onFieldChange('client_trn', value)}
        placeholder="e.g., 123456789012345"
      />

      {/* Date */}
      <DatePicker
        label="Date"
        value={invoiceData.date || ''}
        onChange={(value) => onFieldChange('date', value)}
      />

      {/* BO Number */}
      <TextInput
        label="BO No."
        value={invoiceData.bo_no || ''}
        onChange={(value) => onFieldChange('bo_no', value)}
        placeholder="Business Order number"
      />

      {/* Delivery Month */}
      <MonthPicker
        label="Delivery Month"
        value={invoiceData.delivery_month || ''}
        onChange={(value) => onFieldChange('delivery_month', value)}
      />

      {/* Description */}
      <TextArea
        label="Description"
        value={invoiceData.description || ''}
        onChange={(value) => onFieldChange('description', value)}
        placeholder="Describe the invoice items"
        rows={4}
      />

      {/* Quantity */}
      <TextInput
        label="Quantity"
        type="number"
        value={invoiceData.quantity || ''}
        onChange={(value) => {
          onFieldChange('quantity', value);
        }}
        placeholder="Enter quantity"
      />

      {/* Rate */}
      <TextInput
        label="Rate"
        type="number"
        value={invoiceData.rate || ''}
        onChange={(value) => {
          onFieldChange('rate', value);
        }}
        placeholder="Enter rate"
      />

      {/* Budget (Read-only, calculated) */}
      <TextInput
        label="Budget"
        type="number"
        value={calculations.budget.toFixed(2)}
        onChange={() => {}}
        disabled
        placeholder="Calculated automatically"
      />

      {/* VAT Rate */}
      <Select
        label="VAT Rate (%)"
        value={invoiceData.vat_rate || ''}
        onChange={(value) => onFieldChange('vat_rate', value)}
        options={[
          { value: 'non-GCC (0%)', label: 'non-GCC (0%)' },
          { value: 'GCC (5%)', label: 'GCC (5%)' },
        ]}
      />

      {/* Total Amount (Read-only, calculated) */}
      <TextInput
        label="Total Amount"
        type="number"
        value={calculations.totalAmount.toFixed(2)}
        onChange={() => {}}
        disabled
        placeholder="Calculated automatically"
      />

      {/* Header Preview */}
      <TextArea
        label="Header Preview (top row)"
        value={invoiceData.header || ''}
        onChange={(value) => onFieldChange('header', value)}
        disabled
        rows={4}
      />
    </div>
  );
}
