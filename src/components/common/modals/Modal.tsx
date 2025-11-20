/* 아이콘 */
import {HiX} from "react-icons/hi";
/* 컴포넌트 */
import Btn from '../buttons/Btn.tsx'

interface ModalProps {
  isOpen: Boolean,
  onClose: () => void,
  title? : string, // 모달 제목
  children: React.ReactNode,
  buttons?: React.ReactNode,
}

const Modal = ({ isOpen, onClose, title, children, buttons }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 (Backdrop) */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose} // 배경 클릭 시 닫힘
      />

      {/* 모달 컨테이너 */}
      <div className="relative bg-white dark:bg-[#252731] rounded-lg shadow-xl sm:max-w-2xl w-full p-4">
        {/* 모달 헤더 */}
        <div className={`flex items-center border-b-2 pb-2 border-gray-200 dark:border-gray-600 ${title ? 'justify-between' : 'justify-end'}`}>
          <h3 className="text-xl font-bold">{title}</h3>
          <Btn
            type="button"
            background="icon"
            onClick={onClose}
          >
            <HiX className="w-8 h-8 text-black"/>
          </Btn>
        </div>
        {/* 모달 컨텐츠 */}
        <div className="flex flex-col mt-2">
          {children}
        </div>
        {/* 버튼 영역 */}
        {buttons && (
          <div className="mt-4 flex justify-center space-x-2">
            {buttons}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;