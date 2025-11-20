interface InputProps {
  id: string;
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  column?: boolean;
}

const Input: React.FC<InputProps> = ({
   id,
   label,
   value,
   placeholder,
   onChange,
   error,
   required = false,
   disabled = false,
   className = '',
   column = false
 }) => {
  return (
    <div className={`flex items-center gap-1 w-full ${column === true ? 'flex-col justify-center items-start':'flex-row'}`}>
      {label && (
        <label
          htmlFor={id}
          className="flex text-sm font-bold text-black dark:text-gray-400 mb-1 min-w-[80px]"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}


      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full
          px-3 
          py-2 
          rounded
          bg-white
          dark:bg-zinc-700
          border 
          border-gray-300
          focus:outline-none 
          focus:border-[#33BB9A]
          disabled:bg-gray-100
          disabled:dark:bg-zinc-800
          disabled:cursor-not-allowed
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
export default Input;