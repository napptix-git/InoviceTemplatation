import React from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email';
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  type = 'text',
}: TextInputProps) {
  return (
    <div className="field-group">
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
}
