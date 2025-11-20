interface Props {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';  // type을 구체적인 유니온 타입으로 정의
  background: 'regular' | 'color' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'red';
  pointColor?: 'white' | 'black' | 'red';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;  // onClick 추가
  disabled?: boolean;  // 선택적으로 disabled 속성도 추가
  customClassName?: string; // className 추가
}

const Btn = ({ children, type, background, color,size="md",pointColor, onClick, disabled = false, customClassName }: Props) => {
  const bgColor = background === 'regular'
    ? 'bg-gray-200'
    : background === 'icon'
      ? 'bg-transparent'  // icon일 경우 transparent 적용
      : color === 'green'
        ? 'bg-primary-main'
        : 'bg-rose-400';
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  } as const;
  const txtSize = sizeMap[size] ?? 'text-sm';
  const getTxtColor = () => {
    if (background === 'regular' && pointColor === 'red') {
      return 'text-rose-400';
    }
    if (background === 'regular') {
      return 'text-gray-700';
    }
    return 'text-white';
  };
  const txtColor = getTxtColor();
  const paddingY = size === 'sm'
    ? 'py-1'
    : background === 'icon'
      ? 'py-0'
      : 'py-2';

  const paddingX = size === 'sm'
    ? 'px-2'
    : background === 'icon'
      ? 'px-0'
      : 'px-4';

  return (
    <button
      type={type}
      className={`
      flex
      items-center
      rounded
      font-bold
      text-left
      overflow-hidden
      hover:relative
      hover:after:absolute
      hover:after:inset-0
      hover:after:bg-black/20
      ${txtSize}
      ${paddingX}
      ${paddingY}
      ${txtColor}
      ${bgColor}
      ${customClassName}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
};

export default Btn;