import { useRef, ReactNode } from "react";
import { toast, ToastContainer, ToastContentProps, Id, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoClose } from "react-icons/io5";

interface CustomToastTooltipProps {
  closeToast: () => void;
  children: ReactNode;  // JSX를 받을 children prop
}

const CustomToastTooltip = ({ closeToast, children }: CustomToastTooltipProps) => {
  return (
    <div className="flex flex-col items-center justify-between p-1">
      <div className="w-full flex justify-end items-end gap-2">
        <IoClose
          onClick={closeToast}
          size={25}
        />
      </div>
      <div className="w-full flex items-center">
        {children}
      </div>
    </div>
  );
};

const useCustomToastTooltip = () => {
  const toastIdRef = useRef<Id>();

  const showToast = (content: ReactNode) => {
    // 이미 토스트가 활성화되어 있는지 확인
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
      // 이미 토스트가 있다면 내용만 업데이트
      toast.update(toastIdRef.current, {
        render: (props: ToastContentProps<unknown>) => (
          <CustomToastTooltip closeToast={props.closeToast ?? (() => {})}>
            {content}
          </CustomToastTooltip>
        ),
      });
    } else {
      // 토스트가 없다면 새로 생성
      toastIdRef.current = toast(
        (props: ToastContentProps<unknown>) => (
          <CustomToastTooltip closeToast={props.closeToast ?? (() => {})}>
            {content}
          </CustomToastTooltip>
        ),
        {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false,
          transition: Slide
        }
      );
    }
  };

  return { showToast };
};
const CustomToastTooltipContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar
      newestOnTop
      closeOnClick={false}
      rtl={false}
      limit={3}
      theme="light"
    />
  );
};

export { useCustomToastTooltip, CustomToastTooltipContainer };