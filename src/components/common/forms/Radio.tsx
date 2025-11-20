// import uncheckedIcon from '../../../assets/images/ico_radio_unchecked.svg';
// import checkedIcon from '../../../assets/images/ico_radio_checked.svg';

interface RadioOptionProps {
  name: string;
  value: string;
  children: React.ReactNode;
}

const Radio = ({ name, value, children }: RadioOptionProps) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        className="peer hidden"
      />
      <span
        className={`
        relative pl-6 text-gray-700  dark:text-gray-400
          before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-no-repeat before:bg-contain
          peer-checked:before:bg-[url('/src/assets/images/ico_radio_checked.svg')]
          before:bg-[url('/src/assets/images/ico_radio_unchecked.svg')]
        `}
      >
        {children}
      </span>
    </label>
  );
}

export default Radio;
