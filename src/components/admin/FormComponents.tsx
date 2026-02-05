import React from 'react';

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  label, 
  name, 
  options, 
  value, 
  onChange,
  required 
}) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  label, 
  name, 
  options, 
  values = [], 
  onChange,
  required 
}) => {
  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...values, option]);
    } else {
      onChange(values.filter(v => v !== option));
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={`${name}_${option}`}
              checked={values.includes(option)}
              onChange={(e) => handleChange(option, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date' | 'tel';
  required?: boolean;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text',
  required,
  placeholder 
}) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({ 
  label, 
  name, 
  value, 
  onChange,
  required,
  placeholder,
  rows = 3
}) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
    />
  </div>
);

interface YesNoRadioProps {
  label: string;
  name: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  required?: boolean;
}

export const YesNoRadio: React.FC<YesNoRadioProps> = ({ 
  label, 
  name, 
  value, 
  onChange,
  required 
}) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={value === true}
          onChange={() => onChange(true)}
          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Yes</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={value === false}
          onChange={() => onChange(false)}
          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">No</span>
      </label>
    </div>
  </div>
);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
  <div className="mb-6 pb-4 border-b border-gray-200">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
  </div>
);
