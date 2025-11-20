interface TextareaProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

const Textarea = ({
    id,
    label,
    value,
    placeholder,
    onChange,
    error,
    required = false,
    disabled = false,
    rows = 4,
    className = '',
  }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className="text-sm font-bold text-black mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`
          w-full
          px-3
          py-2
          rounded-md
          border
          border-gray-300
          focus:outline-none
          focus:ring-2
          focus:ring-[#33BB9A]
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      />

      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default Textarea;