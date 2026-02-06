import React from 'react';

interface SummarySectionProps {
  calculations: {
    quantity: number;
    rate: number;
    budget: number;
    vatType: string;
    vatAmount: number;
    totalAmount: number;
  };
}

export default function SummarySection({ calculations }: SummarySectionProps) {
  const MetricCard = ({ label, value, delta }: { label: string; value: string; delta?: string }) => (
    <div className="metric-card mb-4">
      <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {delta && <div className="text-xs text-green-600 mt-1">{delta}</div>}
    </div>
  );

  return (
    <div className="form-section sticky top-[20rem]">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Summary</h2>

      <MetricCard
        label="Budget"
        value={`$ ${calculations.budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      />

      <MetricCard
        label="VAT Type"
        value={calculations.vatType}
      />

      <MetricCard
        label="VAT Amount"
        value={`$ ${calculations.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      />

      <MetricCard
        label="Total Amount"
        value={`$ ${calculations.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        delta={calculations.vatAmount > 0 ? `+${calculations.vatAmount.toFixed(2)}` : undefined}
      />

      <div className="text-xs text-gray-500 text-center mt-6">
        Invoice Template Automation System
      </div>
    </div>
  );
}
