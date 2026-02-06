import React from 'react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

export default function TextArea({
  label,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  rows = 4,
}: TextAreaProps) {
  return (
    <div className="field-group">
      <label className="font-semibold">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="w-full"
      />
    </div>
  );
}
