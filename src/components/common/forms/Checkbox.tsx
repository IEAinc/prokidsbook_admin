import checkedIcon from '../../../assets/images/ico_checked.svg';
import unCheckedIcon from '../../../assets/images/ico_unchecked.svg';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
}
const Checkbox = ({id, checked, onChange, label, disabled, name} : CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked);
  return (
    <label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      {/* 이미지로 상태 표현 */}
      <img
        src={checked ? checkedIcon : unCheckedIcon}
        alt={checked ? '선택됨' : '선택되지 않음'}
        className="w-6 h-6"
      />
      {label}
    </label>
  )
}
export default Checkbox;