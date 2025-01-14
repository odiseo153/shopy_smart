import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Etiqueta opcional para el input
  error?: string; // Mensaje de error opcional
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  label,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Etiqueta */}
      {label && <label className="text-base font-semibold text-gray-800 dark:text-gray-200">{label}</label>}
      
      {/* Input */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-5 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out ${
          error ? 'border-red-500' : 'border-gray-300'
        } dark:text-black dark:border-gray-600`}
        {...props}
      />

      {/* Mensaje de error */}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};
