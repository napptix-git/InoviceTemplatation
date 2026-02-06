import React, { useState } from 'react';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleApplyDate = () => {
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    onChange(formattedDate);
    setShowPicker(false);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 81 }, (_, i) => 2020 + i);

  return (
    <div className="field-group">
      <label className="font-semibold">{label}</label>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          readOnly
          placeholder={placeholder}
          className="flex-1 bg-gray-50 cursor-pointer"
        />
        
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          📅
        </button>
      </div>

      {showPicker && (
        <div className="info-message mt-3">
          <h3 className="font-semibold mb-3">Select Date</h3>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Day</label>
              <select
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
                className="w-full"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 block mb-1">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                className="w-full"
              >
                {months.map(m => (
                  <option key={m} value={m}>{monthNames[m - 1]}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 block mb-1">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleApplyDate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Apply Date
            </button>
            <button
              onClick={() => setShowPicker(false)}
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
